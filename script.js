/* =========================================================
   FORGE — Workout Planner
   Pure vanilla JS · localStorage-backed
========================================================= */

(() => {
'use strict';

// ---------- Storage ----------
const KEY = 'forge_v1';
const defaultState = () => ({
  onboarded: false,
  theme: 'dark',
  profile: { name: '' },
  prefs: {
    goal: null, level: null, equipment: [],
    daysPerWeek: 4, duration: 45, intensity: 'moderate',
  },
  plan: null,           // { startDate, week:[ {dayIdx, type:'workout'|'rest', title, duration, exercises:[...]} ] }
  history: [],          // { date, dayIdx, exercises:[{name, sets, reps, weight}], feedback }
  feedbackLog: [],      // { date, fb }
  prs: {},              // { exerciseName: { weight, date } }
  customEdited: false,
});

function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  } catch { return defaultState(); }
}
function saveState() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

let state = loadState();

// ---------- Helpers ----------
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => Array.from(p.querySelectorAll(s));
const todayISO = () => new Date().toISOString().slice(0,10);
const startOfDay = (d=new Date()) => { const x = new Date(d); x.setHours(0,0,0,0); return x; };
const daysBetween = (a,b) => Math.floor((startOfDay(b) - startOfDay(a)) / 86400000);

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.add('hidden'), 2200);
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  $$('.theme-pill').forEach(b => b.classList.toggle('active', b.dataset.themeSet === state.theme));
}

// =========================================================
// ONBOARDING
// =========================================================
const STEPS = [
  {
    key: 'goal', title: "What's your goal?",
    sub: "We'll tailor your plan around this.",
    type: 'single',
    options: [
      { v:'muscle', label:'Build muscle', ico:'💪' },
      { v:'lose',   label:'Lose weight', ico:'🔥' },
      { v:'strong', label:'Get stronger', ico:'🏋️' },
      { v:'endurance', label:'Improve endurance', ico:'🏃' },
      { v:'healthy', label:'Stay healthy', ico:'🌿' },
    ]
  },
  {
    key: 'level', title: "Your fitness level?",
    sub: "Be honest — we'll progress you over time.",
    type: 'single',
    options: [
      { v:'beginner', label:'Beginner', ico:'🌱' },
      { v:'intermediate', label:'Intermediate', ico:'⚡' },
      { v:'advanced', label:'Advanced', ico:'🔥' },
    ]
  },
  {
    key: 'equipment', title: "What equipment do you have?",
    sub: "Pick anything available to you.",
    type: 'multi',
    options: [
      { v:'bodyweight', label:'Bodyweight only', ico:'🤸' },
      { v:'dumbbells', label:'Dumbbells', ico:'🏋️' },
      { v:'bands', label:'Resistance bands', ico:'🪢' },
      { v:'barbell', label:'Barbell', ico:'⚖️' },
      { v:'machines', label:'Gym machines', ico:'🏟️' },
    ]
  },
  {
    key: 'daysPerWeek', title: "How many days per week?",
    sub: "We'll plan rest days around you.",
    type: 'slider', min: 2, max: 6, step: 1, unit: 'days/week'
  },
  {
    key: 'duration', title: "Workout length?",
    sub: "Average time per session.",
    type: 'slider', min: 15, max: 90, step: 5, unit: 'minutes'
  },
  {
    key: 'intensity', title: "Preferred intensity?",
    sub: "You can change this any time.",
    type: 'single',
    options: [
      { v:'easy', label:'Easy', ico:'🌊' },
      { v:'moderate', label:'Moderate', ico:'⚡' },
      { v:'hard', label:'Hard', ico:'🔥' },
    ]
  },
];

let stepIdx = 0;

function renderOnboarding() {
  const dots = $('#stepDots');
  dots.innerHTML = STEPS.map((_,i)=>`<span class="${i<=stepIdx?'active':''}"></span>`).join('');
  const step = STEPS[stepIdx];
  const body = $('#onboardBody');

  let html = `<h2 class="q-title">${step.title}</h2><p class="q-sub">${step.sub}</p>`;

  if (step.type === 'single') {
    html += `<div class="option-grid">`;
    step.options.forEach(o => {
      const sel = state.prefs[step.key] === o.v ? 'selected' : '';
      html += `<div class="option ${sel}" data-val="${o.v}"><span class="ico">${o.ico}</span><span>${o.label}</span></div>`;
    });
    html += `</div>`;
  } else if (step.type === 'multi') {
    html += `<div class="option-grid">`;
    const cur = state.prefs[step.key] || [];
    step.options.forEach(o => {
      const sel = cur.includes(o.v) ? 'selected' : '';
      html += `<div class="option ${sel}" data-val="${o.v}"><span class="ico">${o.ico}</span><span>${o.label}</span></div>`;
    });
    html += `</div>`;
  } else if (step.type === 'slider') {
    const val = state.prefs[step.key] ?? step.min;
    html += `<div class="slider-wrap">
      <div class="slider-val"><span id="slVal">${val}</span><small>${step.unit}</small></div>
      <input type="range" min="${step.min}" max="${step.max}" step="${step.step}" value="${val}" id="slInput"/>
    </div>`;
  }
  body.innerHTML = html;

  // wire
  if (step.type === 'single') {
    body.querySelectorAll('.option').forEach(el => {
      el.onclick = () => {
        state.prefs[step.key] = el.dataset.val;
        saveState();
        renderOnboarding();
      };
    });
  } else if (step.type === 'multi') {
    body.querySelectorAll('.option').forEach(el => {
      el.onclick = () => {
        const arr = state.prefs[step.key] || [];
        const v = el.dataset.val;
        const i = arr.indexOf(v);
        if (i >= 0) arr.splice(i,1); else arr.push(v);
        state.prefs[step.key] = arr;
        saveState();
        renderOnboarding();
      };
    });
  } else if (step.type === 'slider') {
    const sl = $('#slInput'), vv = $('#slVal');
    sl.oninput = () => { vv.textContent = sl.value; state.prefs[step.key] = +sl.value; saveState(); };
  }

  $('#onboardBack').style.visibility = stepIdx === 0 ? 'hidden' : 'visible';
  $('#onboardNext').textContent = stepIdx === STEPS.length - 1 ? 'Build my plan' : 'Continue';
}

function canAdvance() {
  const step = STEPS[stepIdx];
  const v = state.prefs[step.key];
  if (step.type === 'single') return !!v;
  if (step.type === 'multi') return Array.isArray(v) && v.length > 0;
  if (step.type === 'slider') return v != null;
  return true;
}

function startOnboarding() {
  $('#onboarding').classList.remove('hidden');
  $('#mainApp').classList.add('hidden');
  $('#bottomNav').classList.add('hidden');
  stepIdx = 0;
  renderOnboarding();
}

$('#onboardBack').onclick = () => { if (stepIdx>0) { stepIdx--; renderOnboarding(); } };
$('#onboardNext').onclick = () => {
  if (!canAdvance()) { toast('Pick an option to continue'); return; }
  if (stepIdx < STEPS.length - 1) { stepIdx++; renderOnboarding(); }
  else { generatePlan(); finishOnboarding(); }
};

function finishOnboarding() {
  state.onboarded = true;
  state.plan.startDate = todayISO();
  saveState();
  $('#onboarding').classList.add('hidden');
  $('#mainApp').classList.remove('hidden');
  $('#bottomNav').classList.remove('hidden');
  switchPage('today');
  toast('Your plan is ready 💪');
}

// =========================================================
// PLAN GENERATION
// =========================================================
const EX_LIB = {
  bodyweight: {
    push: ['Push-ups','Pike Push-ups','Diamond Push-ups','Decline Push-ups'],
    pull: ['Inverted Rows','Pull-ups','Towel Rows','Superman Holds'],
    legs: ['Bodyweight Squats','Lunges','Glute Bridges','Step-ups','Wall Sit'],
    core: ['Plank','Mountain Climbers','Hollow Hold','Bicycle Crunches'],
    cardio: ['Jumping Jacks','High Knees','Burpees','Jump Squats'],
  },
  dumbbells: {
    push: ['DB Bench Press','DB Shoulder Press','DB Floor Press','DB Lateral Raise'],
    pull: ['DB Row','DB Pullover','DB Reverse Fly','DB Curl'],
    legs: ['DB Goblet Squat','DB Romanian Deadlift','DB Lunge','DB Step-up'],
    core: ['DB Russian Twist','DB Side Bend','Plank','Weighted Sit-up'],
  },
  bands: {
    push: ['Band Chest Press','Band Overhead Press','Band Push-up'],
    pull: ['Band Row','Band Pull-apart','Band Face Pull','Band Curl'],
    legs: ['Band Squat','Band Glute Bridge','Band Lateral Walk'],
    core: ['Band Woodchopper','Plank','Band Pallof Press'],
  },
  barbell: {
    push: ['Barbell Bench Press','Overhead Press','Incline Bench Press'],
    pull: ['Barbell Row','Deadlift','Pendlay Row'],
    legs: ['Back Squat','Front Squat','Romanian Deadlift','Hip Thrust'],
    core: ['Barbell Rollout','Hanging Leg Raise','Plank'],
  },
  machines: {
    push: ['Chest Press Machine','Shoulder Press Machine','Pec Deck'],
    pull: ['Lat Pulldown','Seated Cable Row','Cable Curl'],
    legs: ['Leg Press','Leg Extension','Leg Curl','Hip Abductor'],
    core: ['Cable Crunch','Hanging Leg Raise','Ab Machine'],
  },
};

const SPLITS = {
  2: ['full','rest','rest','full','rest','rest','rest'],
  3: ['full','rest','full','rest','full','rest','rest'],
  4: ['upper','lower','rest','upper','lower','rest','rest'],
  5: ['push','pull','legs','rest','upper','lower','rest'],
  6: ['push','pull','legs','push','pull','legs','rest'],
};

const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function pickEquipmentBuckets() {
  const eq = state.prefs.equipment || ['bodyweight'];
  // build a merged library from selected sources
  const merged = { push:[], pull:[], legs:[], core:[], cardio:[] };
  eq.forEach(k => {
    const lib = EX_LIB[k];
    if (!lib) return;
    Object.keys(merged).forEach(g => {
      if (lib[g]) merged[g].push(...lib[g]);
    });
  });
  // fallback to bodyweight if empty
  Object.keys(merged).forEach(g => {
    if (merged[g].length === 0) merged[g].push(...(EX_LIB.bodyweight[g] || []));
  });
  return merged;
}

function isWeighted(name) {
  return /(DB|Barbell|Cable|Machine|Press|Squat|Deadlift|Row|Curl|Pulldown|Hip Thrust|Goblet|Romanian|Lunge.*DB|Weighted)/i.test(name)
    && !/Bodyweight|Push-ups|Pull-ups|Plank|Hold|Walk|Jacks/i.test(name);
}

function baseSetsReps(level, intensity) {
  const sets = level === 'beginner' ? 3 : level === 'intermediate' ? 4 : 4;
  let reps;
  if (state.prefs.goal === 'strong') reps = level === 'beginner' ? 6 : 5;
  else if (state.prefs.goal === 'endurance') reps = 15;
  else if (state.prefs.goal === 'lose') reps = 12;
  else reps = level === 'advanced' ? 8 : 10;
  // intensity tweak
  if (intensity === 'hard') reps += 2;
  if (intensity === 'easy') reps = Math.max(6, reps - 2);
  return { sets, reps };
}

function suggestedWeight(name, level) {
  if (!isWeighted(name)) return 0;
  const baseMap = { beginner: 8, intermediate: 15, advanced: 25 };
  let w = baseMap[level] || 10;
  if (/Squat|Deadlift|Hip Thrust|Leg Press/i.test(name)) w *= 2;
  if (/Press|Row/i.test(name)) w *= 1.2;
  if (/Curl|Lateral|Fly|Extension/i.test(name)) w *= 0.6;
  return Math.round(w / 2.5) * 2.5;
}

function buildExercisesFor(type, lib, level, intensity, durationMin) {
  // exercise count based on duration
  const targetCount = Math.max(3, Math.min(8, Math.round(durationMin / 8)));
  let groups = [];
  if (type === 'full') groups = ['legs','push','pull','core','cardio'];
  else if (type === 'upper') groups = ['push','pull','push','pull','core'];
  else if (type === 'lower') groups = ['legs','legs','core','cardio'];
  else if (type === 'push')  groups = ['push','push','push','core'];
  else if (type === 'pull')  groups = ['pull','pull','pull','core'];
  else if (type === 'legs')  groups = ['legs','legs','legs','core'];

  const used = new Set();
  const out = [];
  let i = 0;
  while (out.length < targetCount && i < 40) {
    const g = groups[i % groups.length];
    const pool = lib[g] || [];
    const choice = pool[(i + out.length) % pool.length];
    if (choice && !used.has(choice)) {
      used.add(choice);
      const { sets, reps } = baseSetsReps(level, intensity);
      out.push({
        name: choice,
        sets, reps,
        rest: intensity === 'hard' ? 90 : intensity === 'easy' ? 45 : 60,
        weight: suggestedWeight(choice, level),
        bodyweight: !isWeighted(choice),
      });
    }
    i++;
  }
  return out;
}

function workoutTitle(type) {
  const m = { full:'Full Body', upper:'Upper Body', lower:'Lower Body', push:'Push Day', pull:'Pull Day', legs:'Leg Day' };
  return m[type] || 'Workout';
}

function generatePlan() {
  const days = state.prefs.daysPerWeek || 4;
  const split = SPLITS[days] || SPLITS[4];
  const lib = pickEquipmentBuckets();
  const week = split.map((type, idx) => {
    if (type === 'rest') {
      return { dayIdx: idx, type: 'rest', title: 'Rest & Recover', duration: 0, exercises: [] };
    }
    return {
      dayIdx: idx,
      type: 'workout',
      subtype: type,
      title: workoutTitle(type),
      duration: state.prefs.duration,
      exercises: buildExercisesFor(type, lib, state.prefs.level, state.prefs.intensity, state.prefs.duration),
    };
  });
  state.plan = {
    startDate: state.plan?.startDate || todayISO(),
    week,
  };
  state.customEdited = false;
  saveState();
}

// =========================================================
// PROGRESSIVE OVERLOAD
// =========================================================
function getWeekNumber() {
  if (!state.plan?.startDate) return 1;
  const days = daysBetween(new Date(state.plan.startDate), new Date());
  return Math.max(1, Math.floor(days / 7) + 1);
}

function getPhase(week) {
  if (week <= 2) return { name: 'Base', key: 'base' };
  if (week <= 4) return { name: 'Rep Progression', key: 'reps' };
  if (week <= 6) return { name: 'Weight Progression', key: 'weight' };
  if (week <= 8) return { name: 'Volume', key: 'volume' };
  return { name: 'Advanced', key: 'advanced' };
}

function nextOverloadDate() {
  if (!state.plan?.startDate) return '—';
  const start = new Date(state.plan.startDate);
  const week = getWeekNumber();
  // overloads every 2 weeks → end of weeks 2,4,6,8
  const nextBlock = Math.ceil(week / 2) * 2;
  const target = new Date(start);
  target.setDate(target.getDate() + nextBlock * 7);
  return target.toLocaleDateString(undefined, { month:'short', day:'numeric' });
}

function feedbackMultiplier() {
  // analyze recent feedback
  const recent = state.feedbackLog.slice(-5);
  if (!recent.length) return 1;
  const easy = recent.filter(f => f.fb === 'easy').length;
  const hard = recent.filter(f => f.fb === 'hard').length;
  if (easy >= 3) return 1.1;
  if (hard >= 3) return 0.9;
  return 1;
}

function applyOverload(exercise) {
  // returns { sets, reps, rest, weight, note } adjusted for current phase
  const week = getWeekNumber();
  const phase = getPhase(week);
  const fbMul = feedbackMultiplier();
  const ex = { ...exercise };
  let note = '';

  if (phase.key === 'reps') {
    ex.reps = Math.round(ex.reps + 2);
    note = '+2 reps';
  } else if (phase.key === 'weight') {
    if (ex.bodyweight) {
      ex.reps = Math.round(ex.reps + 3);
      note = 'BW: +3 reps, slow tempo';
    } else {
      ex.weight = Math.round((ex.weight * 1.075) / 2.5) * 2.5;
      note = `+${Math.round((ex.weight - exercise.weight) || 2.5)} lb/kg`;
    }
  } else if (phase.key === 'volume') {
    ex.sets = ex.sets + 1;
    note = '+1 set';
  } else if (phase.key === 'advanced') {
    if (ex.bodyweight) {
      ex.reps = Math.round(ex.reps * 1.3);
      ex.rest = Math.max(30, ex.rest - 15);
      note = 'BW: +reps, shorter rest';
    } else {
      ex.weight = Math.round((ex.weight * 1.12) / 2.5) * 2.5;
      ex.sets += 1;
      note = '+weight, +set';
    }
  }

  if (fbMul !== 1) {
    if (ex.bodyweight) ex.reps = Math.max(4, Math.round(ex.reps * fbMul));
    else ex.weight = Math.max(0, Math.round((ex.weight * fbMul) / 2.5) * 2.5);
    note += (note ? ' · ' : '') + (fbMul > 1 ? 'tuned up' : 'tuned down');
  }

  ex.note = note;
  return ex;
}

function coachNote() {
  const week = getWeekNumber();
  const phase = getPhase(week);
  const msgs = {
    base: "Master the basics. Form first, then progress.",
    reps: "Add a couple reps each set — own the tempo.",
    weight: "Time to add load. Stay strict on technique.",
    volume: "Extra set today — pace your rest periods.",
    advanced: "You're earning gains. Push hard, recover harder.",
  };
  return msgs[phase.key] || "Stay consistent.";
}

// =========================================================
// PAGES
// =========================================================
function switchPage(name) {
  $$('main .page').forEach(p => p.classList.add('hidden'));
  const page = $('#page-' + name);
  if (page) page.classList.remove('hidden');
  $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.page === name));
  if (name === 'today') renderToday();
  if (name === 'plan') renderPlan();
  if (name === 'progress') renderProgress();
  if (name === 'profile') renderProfile();
}

// ---------- TODAY ----------
function todayDayIdx() {
  // 0 = Mon ... 6 = Sun
  const d = new Date().getDay(); // 0=Sun
  return (d + 6) % 7;
}

let todayProgress = {}; // { exIdx: { checked, weight } }

function renderToday() {
  $('#todayDate').textContent = new Date().toLocaleDateString(undefined,{weekday:'long', month:'short', day:'numeric'});
  if (!state.plan) return;
  const idx = todayDayIdx();
  const day = state.plan.week[idx];

  const week = getWeekNumber();
  const phase = getPhase(week);
  $('#statWeek').textContent = 'W' + week;
  $('#statPhase').textContent = phase.name;
  $('#statOverload').textContent = nextOverloadDate();
  $('#coachNotes').textContent = coachNote();

  if (!day || day.type === 'rest') {
    $('#todayWorkoutCard').classList.add('hidden');
    $('#restCard').classList.remove('hidden');
    return;
  }
  $('#restCard').classList.add('hidden');
  $('#todayWorkoutCard').classList.remove('hidden');

  $('#todayWorkoutType').textContent = (day.subtype || 'workout').toUpperCase();
  $('#todayWorkoutTitle').textContent = day.title;
  $('#todayDuration').textContent = day.duration;
  $('#todayExCount').textContent = day.exercises.length;

  // already done today?
  const alreadyDone = state.history.some(h => h.date === todayISO());
  todayProgress = {};
  const list = $('#exerciseList');
  list.innerHTML = '';
  day.exercises.forEach((rawEx, i) => {
    const ex = applyOverload(rawEx);
    todayProgress[i] = { checked: alreadyDone, weight: ex.weight, name: ex.name, sets: ex.sets, reps: ex.reps, bodyweight: ex.bodyweight };
    const row = document.createElement('div');
    row.className = 'ex-row' + (alreadyDone ? ' done' : '');
    const wInput = ex.bodyweight ? '' :
      `<input class="ex-weight" type="number" step="2.5" value="${ex.weight}" data-i="${i}" />`;
    row.innerHTML = `
      <button class="ex-check ${alreadyDone?'checked':''}" data-i="${i}"></button>
      <div class="ex-info">
        <div class="ex-name">${ex.name}</div>
        <div class="ex-meta">${ex.sets} × ${ex.reps} · ${ex.rest}s rest${ex.note?` · <span style="color:var(--accent);font-weight:600">${ex.note}</span>`:''}</div>
      </div>
      ${wInput}
    `;
    list.appendChild(row);
  });

  list.querySelectorAll('.ex-check').forEach(b => {
    b.onclick = () => {
      const i = +b.dataset.i;
      todayProgress[i].checked = !todayProgress[i].checked;
      b.classList.toggle('checked');
      b.parentElement.classList.toggle('done');
      updateRing();
    };
  });
  list.querySelectorAll('.ex-weight').forEach(inp => {
    inp.oninput = () => {
      const i = +inp.dataset.i;
      todayProgress[i].weight = +inp.value || 0;
    };
  });

  updateRing();
}

function updateRing() {
  const total = Object.keys(todayProgress).length;
  const done = Object.values(todayProgress).filter(x => x.checked).length;
  const pct = total ? Math.round(done/total * 100) : 0;
  const C = 175.93;
  $('#ringFg').style.strokeDashoffset = C - (C * pct / 100);
  $('#ringPct').textContent = pct + '%';
}

$('#completeWorkoutBtn').onclick = () => {
  if (!state.plan) return;
  const idx = todayDayIdx();
  const day = state.plan.week[idx];
  if (!day || day.type === 'rest') return;

  // record
  const exercises = Object.values(todayProgress).map(p => ({
    name: p.name, sets: p.sets, reps: p.reps, weight: p.weight
  }));
  state.history = state.history.filter(h => h.date !== todayISO());
  state.history.push({
    date: todayISO(), dayIdx: idx, exercises, status: 'done'
  });
  // PRs
  exercises.forEach(e => {
    if (e.weight > 0 && (!state.prs[e.name] || e.weight > state.prs[e.name].weight)) {
      state.prs[e.name] = { weight: e.weight, date: todayISO() };
    }
  });
  saveState();
  $('#feedbackModal').classList.remove('hidden');
};

$('#skipWorkoutBtn').onclick = () => {
  if (!state.plan) return;
  const idx = todayDayIdx();
  state.history = state.history.filter(h => h.date !== todayISO());
  state.history.push({ date: todayISO(), dayIdx: idx, exercises: [], status: 'skip' });
  saveState();
  toast('Workout skipped');
  renderToday();
  renderPlan();
};

// Feedback modal
$$('#feedbackModal .fb-btn').forEach(b => {
  b.onclick = () => {
    state.feedbackLog.push({ date: todayISO(), fb: b.dataset.fb });
    saveState();
    $('#feedbackModal').classList.add('hidden');
    toast('Workout logged 🔥');
    renderToday();
    renderPlan();
  };
});

// ---------- PLAN ----------
function renderPlan() {
  const list = $('#weekList');
  if (!state.plan) { list.innerHTML = ''; return; }
  const today = todayDayIdx();
  list.innerHTML = '';
  state.plan.week.forEach((day, i) => {
    // status from history this week
    const histToday = state.history.find(h => h.dayIdx === i && isThisWeek(h.date));
    let statusIco = '', statusClass = '';
    if (day.type === 'rest') { statusIco = '🌿'; statusClass = 'rest'; }
    else if (histToday?.status === 'done') { statusIco = '✓'; statusClass = 'done'; }
    else if (histToday?.status === 'skip') { statusIco = '✕'; statusClass = 'skip'; }
    else { statusIco = '·'; statusClass = ''; }

    const card = document.createElement('div');
    card.className = 'card glass day-card' + (i === today ? ' today' : '');
    card.innerHTML = `
      <div class="day-tag"><div class="d">${DAY_NAMES[i]}</div><div class="n">${i+1}</div></div>
      <div class="day-info">
        <div class="t">${day.title}</div>
        <div class="m">${day.type==='rest' ? 'Recovery day' : `${day.duration} min · ${day.exercises.length} exercises`}</div>
      </div>
      <div class="day-status ${statusClass}">${statusIco}</div>
      ${day.type==='workout' ? `<button class="day-edit" data-edit="${i}">✎</button>` : ''}
    `;
    list.appendChild(card);
  });
  list.querySelectorAll('.day-edit').forEach(b => {
    b.onclick = () => openEditor(+b.dataset.edit);
  });
}

function isThisWeek(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const day = (now.getDay() + 6) % 7;
  const monday = startOfDay(now);
  monday.setDate(monday.getDate() - day);
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 7);
  return d >= monday && d < sunday;
}

$('#regenerateBtn').onclick = () => {
  if (state.customEdited) {
    confirmModal('Regenerate plan?', 'This will replace your custom edits with a fresh plan.', () => {
      generatePlan();
      state.plan.startDate = todayISO();
      saveState();
      renderPlan(); renderToday();
      toast('New plan generated');
    });
  } else {
    generatePlan();
    state.plan.startDate = todayISO();
    saveState();
    renderPlan(); renderToday();
    toast('New plan generated');
  }
};

// ---------- EDITOR ----------
let editorIdx = -1;
let editorDraft = null;

function openEditor(idx) {
  editorIdx = idx;
  editorDraft = JSON.parse(JSON.stringify(state.plan.week[idx]));
  $('#editorTitle').textContent = `Edit ${DAY_NAMES[idx]}`;
  $('#editTitle').value = editorDraft.title;
  $('#editDuration').value = editorDraft.duration;
  renderExEdit();
  $('#editorModal').classList.remove('hidden');
}

function renderExEdit() {
  const list = $('#exEditList');
  list.innerHTML = '';
  editorDraft.exercises.forEach((ex, i) => {
    const row = document.createElement('div');
    row.className = 'ex-edit-row';
    row.innerHTML = `
      <input class="ex-name-input" value="${ex.name}" data-i="${i}" data-f="name" />
      <button class="del-ex" data-del="${i}">✕</button>
      <div class="triple">
        <input type="number" min="1" value="${ex.sets}" data-i="${i}" data-f="sets" placeholder="sets"/>
        <input type="number" min="1" value="${ex.reps}" data-i="${i}" data-f="reps" placeholder="reps"/>
        <input type="number" min="0" value="${ex.rest}" data-i="${i}" data-f="rest" placeholder="rest s"/>
      </div>
    `;
    list.appendChild(row);
  });
  list.querySelectorAll('input').forEach(inp => {
    inp.oninput = () => {
      const i = +inp.dataset.i, f = inp.dataset.f;
      editorDraft.exercises[i][f] = f === 'name' ? inp.value : (+inp.value || 0);
    };
  });
  list.querySelectorAll('.del-ex').forEach(b => {
    b.onclick = () => { editorDraft.exercises.splice(+b.dataset.del,1); renderExEdit(); };
  });
}

$('#addExerciseBtn').onclick = () => {
  editorDraft.exercises.push({ name:'New Exercise', sets:3, reps:10, rest:60, weight:0, bodyweight:true });
  renderExEdit();
};
$('#closeEditor').onclick = $('#cancelEditor').onclick = () => $('#editorModal').classList.add('hidden');
$('#saveEditor').onclick = () => {
  editorDraft.title = $('#editTitle').value || editorDraft.title;
  editorDraft.duration = +$('#editDuration').value || editorDraft.duration;
  state.plan.week[editorIdx] = editorDraft;
  state.customEdited = true;
  saveState();
  $('#editorModal').classList.add('hidden');
  renderPlan(); renderToday();
  toast('Saved');
};

// ---------- PROGRESS ----------
function renderProgress() {
  const week = getWeekNumber();
  const phase = getPhase(week);
  $('#progWeek').textContent = week;
  $('#progPhase').textContent = phase.name;
  $('#streakCount').textContent = computeStreak();
  $('#totalCount').textContent = state.history.filter(h => h.status === 'done').length;

  // weekly ring
  const workoutDays = state.plan ? state.plan.week.filter(d => d.type === 'workout').length : 0;
  const doneThisWeek = state.history.filter(h => h.status === 'done' && isThisWeek(h.date)).length;
  $('#weeklyDone').textContent = doneThisWeek;
  $('#weeklyTotal').textContent = workoutDays;
  const pct = workoutDays ? Math.round(doneThisWeek / workoutDays * 100) : 0;
  $('#weeklyPct').textContent = pct + '%';
  const C = 326.7;
  $('#weeklyRingFg').style.strokeDashoffset = C - (C * Math.min(100,pct) / 100);

  // PRs
  const prList = $('#prList');
  const prs = Object.entries(state.prs).sort((a,b)=>b[1].weight-a[1].weight);
  if (!prs.length) prList.innerHTML = '<p class="muted sm">No records yet — log a weight to get started.</p>';
  else prList.innerHTML = prs.slice(0,8).map(([n,r]) =>
    `<div class="pr-row"><span class="name">${n}</span><span class="val">${r.weight}</span></div>`
  ).join('');

  // History
  const histList = $('#historyList');
  const recent = [...state.history].reverse().slice(0,15);
  if (!recent.length) histList.innerHTML = '<p class="muted sm">No completed workouts yet.</p>';
  else histList.innerHTML = recent.map(h => {
    const day = state.plan?.week[h.dayIdx];
    const t = day ? day.title : 'Workout';
    const ico = h.status === 'done' ? '✓' : '✕';
    const col = h.status === 'done' ? 'var(--success)' : 'var(--danger)';
    return `<div class="hist-row"><span class="name"><span style="color:${col};margin-right:8px">${ico}</span>${t}</span><span class="date">${new Date(h.date).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</span></div>`;
  }).join('');
}

function computeStreak() {
  let streak = 0;
  const done = new Set(state.history.filter(h => h.status === 'done').map(h => h.date));
  if (!done.size) return 0;
  // walk back from today: count consecutive days where it was either done OR was a rest day
  for (let i=0; i<60; i++) {
    const d = new Date(); d.setDate(d.getDate()-i);
    const iso = d.toISOString().slice(0,10);
    const idx = (d.getDay()+6)%7;
    const day = state.plan?.week[idx];
    if (!day) break;
    if (day.type === 'rest') continue;
    if (done.has(iso)) streak++;
    else if (i === 0) continue; // today not done yet, don't break
    else break;
  }
  return streak;
}

// ---------- PROFILE ----------
function renderProfile() {
  const name = state.profile.name || '';
  $('#profileName').value = name;
  const display = name || 'Anonymous';
  $('#profileAvatar').textContent = (display[0] || 'A').toUpperCase();
  $('#profileSub').textContent = name ? 'Athlete' : 'Tap to set your name';

  const goalNames = { muscle:'Build muscle', lose:'Lose weight', strong:'Get stronger', endurance:'Improve endurance', healthy:'Stay healthy' };
  const eqNames = { bodyweight:'Bodyweight', dumbbells:'Dumbbells', bands:'Bands', barbell:'Barbell', machines:'Machines' };
  $('#sumGoal').textContent = goalNames[state.prefs.goal] || '—';
  $('#sumLevel').textContent = state.prefs.level ? state.prefs.level[0].toUpperCase()+state.prefs.level.slice(1) : '—';
  $('#sumEquip').textContent = (state.prefs.equipment||[]).map(e => eqNames[e]).join(', ') || '—';
  $('#sumDays').textContent = state.prefs.daysPerWeek + ' days';
  $('#sumDuration').textContent = state.prefs.duration + ' min';
  $('#sumIntensity').textContent = state.prefs.intensity ? state.prefs.intensity[0].toUpperCase()+state.prefs.intensity.slice(1) : '—';
}

$('#profileName').oninput = (e) => {
  state.profile.name = e.target.value;
  const display = state.profile.name || 'Anonymous';
  $('#profileAvatar').textContent = (display[0] || 'A').toUpperCase();
  saveState();
};

$$('.theme-pill').forEach(b => {
  b.onclick = () => { state.theme = b.dataset.themeSet; saveState(); applyTheme(); };
});
$('#themeToggleTop').onclick = () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark'; saveState(); applyTheme();
};

$('#rebuildBtn').onclick = () => {
  confirmModal('Rebuild plan?', 'Walk through onboarding again to create a new plan.', () => {
    state.onboarded = false; saveState(); startOnboarding();
  });
};
$('#resetAllBtn').onclick = () => {
  confirmModal('Reset everything?', 'This permanently deletes all your data.', () => {
    localStorage.removeItem(KEY);
    state = defaultState();
    startOnboarding();
  });
};

// ---------- Confirm modal ----------
function confirmModal(title, msg, onYes) {
  $('#confirmTitle').textContent = title;
  $('#confirmMsg').textContent = msg;
  $('#confirmModal').classList.remove('hidden');
  $('#confirmYes').onclick = () => { $('#confirmModal').classList.add('hidden'); onYes(); };
  $('#confirmNo').onclick = () => $('#confirmModal').classList.add('hidden');
}

// ---------- Nav ----------
$$('.nav-item').forEach(b => b.onclick = () => switchPage(b.dataset.page));
$('#fabBtn').onclick = () => {
  confirmModal('Open Plan Builder?', 'Rebuild your weekly plan from scratch with new preferences.', () => {
    state.onboarded = false; saveState(); startOnboarding();
  });
};

// =========================================================
// BOOT
// =========================================================
applyTheme();
if (!state.onboarded || !state.plan) {
  startOnboarding();
} else {
  $('#mainApp').classList.remove('hidden');
  $('#bottomNav').classList.remove('hidden');
  switchPage('today');
}

})();
