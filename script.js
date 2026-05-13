/* ===== CSS Variables ===== */
:root {
  /* Colors */
  --accent: #FF7518;
  --accent-light: #FF8F42;
  --accent-dark: #E56400;
  
  /* Dark Theme (Default) */
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --bg-card: rgba(255, 255, 255, 0.05);
  --bg-card-hover: rgba(255, 255, 255, 0.08);
  --bg-glass: rgba(255, 255, 255, 0.03);
  --border-color: rgba(255, 255, 255, 0.1);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.4);
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.5);
  
  /* Sizing */
  --nav-height: 80px;
  --header-height: 60px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease;
  --transition-slow: 0.4s ease;
}

/* Light Theme */
[data-theme="light"] {
  --bg-primary: #f5f5f7;
  --bg-secondary: #ffffff;
  --bg-card: rgba(255, 255, 255, 0.9);
  --bg-card-hover: rgba(255, 255, 255, 1);
  --bg-glass: rgba(255, 255, 255, 0.7);
  --border-color: rgba(0, 0, 0, 0.08);
  --text-primary: #1a1a1a;
  --text-secondary: rgba(0, 0, 0, 0.65);
  --text-muted: rgba(0, 0, 0, 0.4);
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.12);
}

/* ===== Reset & Base ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.5;
  min-height: 100vh;
  overflow-x: hidden;
  transition: background-color var(--transition-normal), color var(--transition-normal);
}

#app {
  min-height: 100vh;
}

/* ===== Utilities ===== */
.hidden {
  display: none !important;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* ===== Typography ===== */
h1 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
}

/* ===== Buttons ===== */
button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  color: white;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 1rem;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 16px rgba(255, 117, 24, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255, 117, 24, 0.4);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: all var(--transition-fast);
}

.btn-secondary:hover {
  background: var(--bg-card-hover);
  border-color: var(--accent);
}

.btn-ghost {
  color: var(--text-secondary);
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.btn-ghost:hover {
  color: var(--text-primary);
  background: var(--bg-card);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(239, 68, 68, 0.3);
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.btn-icon:hover {
  background: var(--bg-card);
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}

/* ===== Glass Card ===== */
.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: all var(--transition-normal);
}

.glass-card:hover {
  border-color: rgba(255, 117, 24, 0.2);
}

/* ===== Screens ===== */
.screen {
  min-height: 100vh;
}

/* ===== Onboarding ===== */
#onboarding {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--bg-primary);
}

.onboarding-container {
  width: 100%;
  max-width: 480px;
}

.onboarding-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  color: var(--text-secondary);
  font-size: 1rem;
}

.onboarding-progress {
  margin-bottom: 32px;
}

.progress-bar {
  height: 4px;
  background: var(--bg-card);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-light));
  border-radius: var(--radius-full);
  width: 16.66%;
  transition: width var(--transition-slow);
}

.progress-text {
  display: block;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.onboarding-steps {
  min-height: 320px;
}

.step {
  display: none;
  animation: fadeIn var(--transition-normal);
}

.step.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.step h2 {
  text-align: center;
  margin-bottom: 8px;
  font-size: 1.5rem;
}

.step-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 24px;
}

.option-grid.single-column {
  grid-template-columns: 1fr;
}

.option-grid.equipment-grid {
  grid-template-columns: repeat(2, 1fr);
}

.option-card {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all var(--transition-fast);
  text-align: center;
}

.option-card:hover {
  border-color: var(--accent);
  background: var(--bg-card-hover);
}

.option-card.selected {
  border-color: var(--accent);
  background: rgba(255, 117, 24, 0.1);
}

.option-card.horizontal {
  flex-direction: row;
  text-align: left;
  padding: 16px 20px;
}

.option-card.horizontal .option-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-icon {
  font-size: 1.75rem;
}

.option-label {
  font-weight: 600;
  color: var(--text-primary);
}

.option-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Slider */
.slider-container {
  margin-top: 40px;
  padding: 0 10px;
}

.premium-slider {
  width: 100%;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--bg-card);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.premium-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 117, 24, 0.4);
  transition: transform var(--transition-fast);
}

.premium-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.premium-slider::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(255, 117, 24, 0.4);
}

.slider-value {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
  margin: 24px 0;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  color: var(--text-muted);
  font-size: 0.875rem;
  padding: 0 6px;
}

.onboarding-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 16px;
}

.onboarding-nav .btn-primary {
  flex: 1;
}

/* ===== Main App ===== */
#main-app {
  padding-bottom: var(--nav-height);
}

/* ===== Pages ===== */
.page {
  display: none;
  min-height: 100vh;
}

.page.active {
  display: block;
  animation: fadeIn var(--transition-normal);
}

.page-header {
  position: sticky;
  top: 0;
  background: var(--bg-primary);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  border-bottom: 1px solid var(--border-color);
}

.header-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.page-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ===== Coach Card ===== */
.coach-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.coach-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.coach-content {
  flex: 1;
}

.coach-label {
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.coach-content p {
  margin-top: 4px;
  color: var(--text-secondary);
}

/* ===== Stats Card ===== */
.stats-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color);
}

/* ===== Workout Card ===== */
.workout-card {
  padding: 0;
  overflow: hidden;
}

.workout-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.workout-info h2 {
  margin-bottom: 8px;
}

.workout-meta {
  display: flex;
  gap: 16px;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.workout-progress-ring {
  width: 56px;
  height: 56px;
  position: relative;
}

.workout-progress-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: var(--bg-card);
  stroke-width: 3;
}

.ring-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray var(--transition-normal);
}

.ring-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
}

/* ===== Exercise List ===== */
.exercise-list {
  max-height: 400px;
  overflow-y: auto;
}

.exercise-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  transition: background var(--transition-fast);
}

.exercise-item:last-child {
  border-bottom: none;
}

.exercise-item:hover {
  background: var(--bg-glass);
}

.exercise-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.exercise-checkbox:hover {
  border-color: var(--accent);
}

.exercise-checkbox.checked {
  background: var(--accent);
  border-color: var(--accent);
}

.exercise-checkbox.checked::after {
  content: '✓';
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.exercise-info {
  flex: 1;
  min-width: 0;
}

.exercise-name {
  font-weight: 600;
  margin-bottom: 4px;
  transition: color var(--transition-fast);
}

.exercise-item.completed .exercise-name {
  color: var(--text-muted);
  text-decoration: line-through;
}

.exercise-details {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.exercise-weight-input {
  width: 70px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.875rem;
  text-align: center;
}

.exercise-weight-input:focus {
  outline: none;
  border-color: var(--accent);
}

.exercise-weight-input::placeholder {
  color: var(--text-muted);
}

.workout-actions {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-complete {
  width: 100%;
}

/* ===== Rest Day Card ===== */
.rest-day-card {
  text-align: center;
  padding: 48px 24px;
}

.rest-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.rest-day-card h2 {
  margin-bottom: 8px;
}

.rest-day-card p {
  color: var(--text-secondary);
}

/* ===== Week Grid (Plan Page) ===== */
.week-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.day-card {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}

.day-indicator {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  flex-shrink: 0;
}

.day-name {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.day-number {
  font-size: 1.125rem;
  font-weight: 700;
}

.day-indicator.today {
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  color: white;
}

.day-indicator.today .day-name {
  color: rgba(255, 255, 255, 0.8);
}

.day-content {
  flex: 1;
  min-width: 0;
}

.day-title {
  font-weight: 600;
  margin-bottom: 2px;
}

.day-meta {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.day-status {
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.day-status.rest {
  background: rgba(100, 116, 139, 0.2);
  color: #94a3b8;
}

.day-status.completed {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.day-status.skipped {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.day-edit-btn {
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.day-card:hover .day-edit-btn {
  opacity: 1;
}

/* ===== Stats Grid (Progress Page) ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-card {
  text-align: center;
  padding: 24px 16px;
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.stat-card .stat-value {
  font-size: 2rem;
}

/* ===== Completion Ring ===== */
.completion-card {
  text-align: center;
}

.completion-card h3 {
  margin-bottom: 20px;
}

.completion-ring-container {
  display: flex;
  justify-content: center;
}

.completion-ring {
  width: 160px;
  height: 160px;
  position: relative;
}

.completion-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.completion-ring .ring-bg {
  fill: none;
  stroke: var(--bg-secondary);
  stroke-width: 8;
}

.completion-ring .ring-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dasharray var(--transition-slow);
}

.completion-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.completion-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
}

.completion-total {
  color: var(--text-muted);
  font-size: 1rem;
}

/* ===== Records & History ===== */
.records-card h3,
.history-card h3 {
  margin-bottom: 16px;
}

.records-list,
.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.record-item,
.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--bg-glass);
  border-radius: var(--radius-md);
}

.record-exercise {
  font-weight: 500;
}

.record-weight {
  color: var(--accent);
  font-weight: 600;
}

.history-date {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.history-workout {
  font-weight: 500;
}

.history-status {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.history-status.completed {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.history-status.skipped {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.empty-state {
  text-align: center;
  padding: 24px;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 8px;
}

/* ===== Profile Page ===== */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;
  gap: 16px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.profile-name-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-name-input {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  width: auto;
  max-width: 200px;
}

.profile-name-input:focus {
  outline: none;
  border-bottom: 2px solid var(--accent);
}

.edit-icon {
  opacity: 0.5;
}

.edit-icon:hover {
  opacity: 1;
}

/* Settings Card */
.settings-card {
  padding: 0;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.setting-icon {
  font-size: 1.25rem;
}

.theme-toggle {
  display: flex;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  padding: 4px;
}

.theme-btn {
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.theme-btn.active {
  background: var(--accent);
  color: white;
}

/* Summary Card */
.summary-card h3 {
  margin-bottom: 20px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-icon {
  font-size: 1.5rem;
}

.summary-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.summary-value {
  font-weight: 600;
  color: var(--text-primary);
  text-transform: capitalize;
}

/* Danger Card */
.danger-card {
  border-color: rgba(239, 68, 68, 0.3);
}

.danger-card h3 {
  color: #ef4444;
  margin-bottom: 8px;
}

.danger-card p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 16px;
}

/* ===== Bottom Navigation ===== */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  color: var(--text-muted);
  transition: all var(--transition-fast);
  flex: 1;
}

.nav-item svg {
  width: 24px;
  height: 24px;
}

.nav-item span {
  font-size: 0.7rem;
  font-weight: 500;
}

.nav-item:hover {
  color: var(--text-secondary);
}

.nav-item.active {
  color: var(--accent);
}

.nav-spacer {
  width: 72px;
  flex-shrink: 0;
}

.fab {
  position: absolute;
  bottom: calc(50% - 28px + env(safe-area-inset-bottom) / 2);
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--accent), var(--accent-dark));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(255, 117, 24, 0.4);
  transition: all var(--transition-fast);
  z-index: 10;
}

.fab svg {
  width: 24px;
  height: 24px;
  color: white;
}

.fab:hover {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 6px 28px rgba(255, 117, 24, 0.5);
}

.fab:active {
  transform: translateX(-50%) scale(0.95);
}

/* ===== Modals ===== */
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn var(--transition-fast);
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp var(--transition-normal);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-content h2 {
  margin-bottom: 8px;
}

.modal-content > p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin-bottom: 0;
}

.modal-footer {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.modal-footer button {
  flex: 1;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions button {
  flex: 1;
}

/* Feedback Modal */
.feedback-options {
  display: flex;
  gap: 12px;
}

.feedback-btn {
  flex: 1;
  padding: 20px 12px;
  background: var(--bg-glass);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all var(--transition-fast);
}

.feedback-btn:hover {
  border-color: var(--accent);
  background: var(--bg-card-hover);
}

.feedback-icon {
  font-size: 2rem;
}

.feedback-btn span:last-child {
  font-size: 0.8rem;
  font-weight: 500;
}

/* Edit Modal */
.edit-modal {
  max-width: 500px;
}

.modal-body {
  max-height: 60vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
}

.exercise-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.edit-exercise-item {
  background: var(--bg-glass);
  border-radius: var(--radius-md);
  padding: 16px;
}

.edit-exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.edit-exercise-header input {
  background: transparent;
  border: none;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
  flex: 1;
}

.edit-exercise-header input:focus {
  outline: none;
  border-bottom: 1px solid var(--accent);
}

.btn-delete-exercise {
  color: #ef4444;
  padding: 4px;
}

.edit-exercise-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.edit-detail-input {
  padding: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.875rem;
  text-align: center;
}

.edit-detail-input:focus {
  outline: none;
  border-color: var(--accent);
}

.btn-add-exercise {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
}

.btn-add-exercise svg {
  width: 16px;
  height: 16px;
}

/* Builder Modal */
.builder-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.builder-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bg-glass);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  text-align: left;
  transition: all var(--transition-fast);
}

.builder-option:hover {
  border-color: var(--accent);
  background: var(--bg-card-hover);
}

.builder-icon {
  font-size: 1.5rem;
}

.builder-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.builder-label {
  font-weight: 600;
}

.builder-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* ===== Toast ===== */
.toast {
  position: fixed;
  bottom: calc(var(--nav-height) + 20px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 12px 24px;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-lg);
  z-index: 1001;
  animation: toastIn var(--transition-normal);
}

@keyframes toastIn {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

.toast-message {
  font-weight: 500;
}

/* ===== Responsive ===== */
@media (min-width: 640px) {
  .page-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .onboarding-container {
    padding: 40px;
    background: var(--bg-card);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-color);
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .feedback-options {
    gap: 16px;
  }
}

@media (min-width: 1024px) {
  .page-content {
    max-width: 800px;
  }
  
  .bottom-nav {
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }
  
  .fab {
    bottom: calc(50% - 28px);
  }
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
