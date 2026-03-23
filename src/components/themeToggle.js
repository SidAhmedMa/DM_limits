/**
 * Theme toggle — professional minimal design.
 * Single icon button that cycles system → light → dark.
 * Tooltip shows current mode. Persists to localStorage.
 */

const STORAGE_KEY = 'dm-limits-theme';

const MODES = ['system', 'light', 'dark'];

const ICONS = {
  system: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="8" rx="1"/><line x1="5" y1="14" x2="11" y2="14"/><line x1="8" y1="11" x2="8" y2="14"/></svg>`,
  light: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"/><line x1="8" y1="1.5" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="14.5"/><line x1="1.5" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="14.5" y2="8"/><line x1="3.4" y1="3.4" x2="4.5" y2="4.5"/><line x1="11.5" y1="11.5" x2="12.6" y2="12.6"/><line x1="3.4" y1="12.6" x2="4.5" y2="11.5"/><line x1="11.5" y1="4.5" x2="12.6" y2="3.4"/></svg>`,
  dark: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6z"/></svg>`,
};

const LABELS = { system: 'System', light: 'Light', dark: 'Dark' };

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', mode);
  }
  window.dispatchEvent(new CustomEvent('themechange', {
    detail: { mode, resolved: mode === 'system' ? getSystemPreference() : mode }
  }));
}

export function getResolvedTheme() {
  const stored = localStorage.getItem(STORAGE_KEY) || 'system';
  return stored === 'system' ? getSystemPreference() : stored;
}

export function initThemeToggle() {
  const stored = localStorage.getItem(STORAGE_KEY) || 'system';
  applyTheme(stored);

  let currentIdx = MODES.indexOf(stored);

  // Create toggle
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', `Theme: ${LABELS[stored]}`);
  btn.setAttribute('title', `Theme: ${LABELS[stored]}`);

  const iconSpan = document.createElement('span');
  iconSpan.className = 'theme-toggle-icon';
  iconSpan.innerHTML = ICONS[stored];

  const labelSpan = document.createElement('span');
  labelSpan.className = 'theme-toggle-label';
  labelSpan.textContent = LABELS[stored];

  btn.appendChild(iconSpan);
  btn.appendChild(labelSpan);

  btn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % MODES.length;
    const mode = MODES[currentIdx];
    localStorage.setItem(STORAGE_KEY, mode);
    applyTheme(mode);
    iconSpan.innerHTML = ICONS[mode];
    labelSpan.textContent = LABELS[mode];
    btn.setAttribute('aria-label', `Theme: ${LABELS[mode]}`);
    btn.setAttribute('title', `Theme: ${LABELS[mode]}`);
  });

  document.body.appendChild(btn);

  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const current = localStorage.getItem(STORAGE_KEY) || 'system';
    if (current === 'system') applyTheme('system');
  });
}
