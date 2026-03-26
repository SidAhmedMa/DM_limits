/**
 * Experiment sidebar panel — lists experiments for active chart tab.
 * Toggle visibility, highlight on hover, expand for details.
 */

import { dispatch, subscribe, getState } from '../state/store.js';
import { getExperimentsForCategory } from '../data/experiments.js';
import { formatSci } from '../utils/format.js';

export function initExperimentPanel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function updateState() {
    const state = getState();
    const cards = container.querySelectorAll('.experiment-card');
    cards.forEach(card => {
      const id = card.dataset.id;
      const es = state.experiments[id] || { visible: true, highlighted: false };
      
      if (es.highlighted) {
        card.classList.add('highlighted');
      } else {
        card.classList.remove('highlighted');
      }

      if (!es.visible) {
        card.classList.add('dimmed');
      } else {
        card.classList.remove('dimmed');
      }

      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = es.visible;
      }
    });
  }

  function render() {
    const state = getState();
    const category = state.activeTab;
    const experiments = getExperimentsForCategory(category);

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'panel-header';
    header.innerHTML = `
      <h3>Experiments</h3>
      <span class="experiment-count">${experiments.length} datasets</span>
    `;
    container.appendChild(header);

    // Channel selector for indirect tab
    if (category === 'indirect') {
      const channelSel = document.createElement('div');
      channelSel.className = 'channel-selector';

      const channels = [
        { id: 'bb', label: 'bb̄ channel' },
        { id: 'tautau', label: 'τ⁺τ⁻ channel' },
      ];

      channels.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = `channel-btn ${state.activeChannel === ch.id ? 'active' : ''}`;
        btn.textContent = ch.label;
        btn.addEventListener('click', () => dispatch('SET_CHANNEL', ch.id));
        channelSel.appendChild(btn);
      });

      container.appendChild(channelSel);
    }

    // Experiment list
    const list = document.createElement('div');
    list.className = 'experiment-list';

    experiments.forEach(exp => {
      // For indirect, only show experiments matching current channel
      if (category === 'indirect' && exp.channel !== state.activeChannel) return;

      const es = state.experiments[exp.id] || { visible: true, highlighted: false };

      const card = document.createElement('div');
      card.dataset.id = exp.id; // Added for easy lookup in updateState map
      card.className = `experiment-card ${es.highlighted ? 'highlighted' : ''} ${!es.visible ? 'dimmed' : ''}`;

      // Find best limit
      const bestLimit = category === 'collider'
        ? null
        : exp.dataPoints.reduce((min, pt) => pt.y < min.y ? pt : min, exp.dataPoints[0]);

      card.innerHTML = `
        <div class="exp-header">
          <label class="exp-toggle">
            <input type="checkbox" ${es.visible ? 'checked' : ''} data-id="${exp.id}" />
            <span class="exp-swatch" style="background:${exp.color}"></span>
            <span class="exp-name">${exp.name}</span>
            <span class="exp-year">${exp.year}</span>
          </label>
        </div>
        <div class="exp-details">
          ${bestLimit ? `<div class="exp-best">Best: ${formatSci(bestLimit.y)} at ${bestLimit.x.toFixed(0)} ${exp.units.x}</div>` : ''}
          <a class="exp-ref" href="https://arxiv.org/abs/${exp.reference.replace('arXiv:', '')}" target="_blank" rel="noopener">${exp.reference}</a>
        </div>
      `;

      // Toggle
      const checkbox = card.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => {
        dispatch('TOGGLE_EXPERIMENT', exp.id);
      });

      // Highlight on hover
      card.addEventListener('mouseenter', () => {
        dispatch('HIGHLIGHT_EXPERIMENT', exp.id);
      });
      card.addEventListener('mouseleave', () => {
        dispatch('CLEAR_HIGHLIGHT');
      });

      list.appendChild(card);
    });

    container.appendChild(list);
  }

  subscribe('activeTab', render);
  subscribe('activeChannel', render);
  // Instead of re-rendering everything when experiments change (like when one is hovered or toggled),
  // we just update the DOM state to prevent resetting scroll position and breaking click/hover interactions.
  subscribe('experiments', updateState);

  render();
}
