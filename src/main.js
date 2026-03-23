/**
 * Dark Matter Limits Explorer — main entry point.
 * Initializes store, mounts all components, manages chart lifecycle.
 */

import './style.css';
import { dispatch, subscribe, getState } from './state/store.js';
import { getExperimentsForCategory, getAllExperiments } from './data/experiments.js';
import { initHero } from './components/hero.js';
import { initTabs } from './components/tabs.js';
import { initExperimentPanel } from './components/experimentPanel.js';
import { initThemeToggle } from './components/themeToggle.js';
import { initDirectSI } from './charts/directSI.js';
import { initDirectSD } from './charts/directSD.js';
import { initIndirect } from './charts/indirect.js';
import { initCollider } from './charts/collider.js';

// ─── Chart registry ───
const chartBuilders = {
  direct_si: initDirectSI,
  direct_sd: initDirectSD,
  indirect: initIndirect,
  collider: initCollider,
};

let activeChart = null;

function mountChart() {
  const tab = getState().activeTab;
  if (activeChart) {
    activeChart.destroy();
    activeChart = null;
  }

  // Init experiments for this tab
  const experiments = getExperimentsForCategory(tab);
  dispatch('INIT_EXPERIMENTS', experiments);

  // Build chart
  const builder = chartBuilders[tab];
  if (builder) {
    activeChart = builder('chart-area');
  }
}

// ─── Initialize ───
function init() {
  initThemeToggle();
  initHero('hero');
  initTabs('tabs');
  initExperimentPanel('experiment-panel');

  // Listen for tab changes
  subscribe('activeTab', () => {
    mountChart();
  });

  // Re-mount chart on theme change so D3 re-reads CSS variables
  window.addEventListener('themechange', () => {
    requestAnimationFrame(() => mountChart());
  });

  // Initial chart mount
  mountChart();
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
