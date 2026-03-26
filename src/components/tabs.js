/**
 * Tab bar component — switches between chart views.
 */

import { dispatch, subscribe, getState } from '../state/store.js';

const TABS = [
  { id: 'direct_si', label: 'Direct SI', icon: '🛡️' },
  { id: 'direct_sd', label: 'Direct SD', icon: '🔄' },
  { id: 'indirect', label: 'Indirect', icon: '🔭' },
  { id: 'collider', label: 'Collider', icon: '⚛️' },
];

export function initTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  container.className = 'tabs-container';

  const tabsWrapper = document.createElement('div');
  tabsWrapper.className = 'tabs-wrapper';

  const indicator = document.createElement('div');
  indicator.className = 'tab-indicator';

  TABS.forEach((tab, idx) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.dataset.tab = tab.id;
    btn.innerHTML = `<span class="tab-icon">${tab.icon}</span><span class="tab-label">${tab.label}</span>`;

    btn.addEventListener('click', () => {
      dispatch('SET_TAB', tab.id);
      const ch = getState().activeChannel;
      if (tab.id === 'indirect' && ch !== 'bb' && ch !== 'tautau') dispatch('SET_CHANNEL', 'bb');
      if (tab.id === 'direct_sd' && ch !== 'neutron' && ch !== 'proton') dispatch('SET_CHANNEL', 'neutron');
    });

    tabsWrapper.appendChild(btn);
  });

  tabsWrapper.appendChild(indicator);
  container.appendChild(tabsWrapper);

  function updateActive() {
    const activeTab = getState().activeTab;
    const btns = tabsWrapper.querySelectorAll('.tab-btn');
    btns.forEach((btn, i) => {
      const isActive = btn.dataset.tab === activeTab;
      btn.classList.toggle('active', isActive);
      if (isActive) {
        const rect = btn.getBoundingClientRect();
        const parentRect = tabsWrapper.getBoundingClientRect();
        indicator.style.left = `${rect.left - parentRect.left}px`;
        indicator.style.width = `${rect.width}px`;
      }
    });
  }

  subscribe('activeTab', updateActive);
  // Initial positioning after DOM paint
  requestAnimationFrame(updateActive);
}
