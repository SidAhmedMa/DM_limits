/**
 * Indirect detection chart configuration.
 * Supports channel switching (bb̄ / τ⁺τ⁻) via store state.
 */

import { createChart } from './bindChart.js';
import { getExperimentsForCategory } from '../data/experiments.js';
import { getState, subscribe } from '../state/store.js';

let currentChart = null;

export function initIndirect(containerId) {
  function build() {
    if (currentChart) currentChart.destroy();

    const allDatasets = getExperimentsForCategory('indirect');
    const channel = getState().activeChannel;
    const datasets = allDatasets.filter(d => d.channel === channel);

    currentChart = createChart({
      containerId,
      datasets,
      axes: {
        x: {
          label: 'DM mass mχ (GeV)',
          type: 'log',
          domain: [1, 1e5],
        },
        y: {
          label: '⟨σv⟩ (cm³ s⁻¹)',
          type: 'log',
          domain: [1e-28, 1e-21],
        },
      },
      fogLayers: [],
      isContour: false,
      referenceLine: {
        value: 3e-26,
        label: 'Thermal relic ⟨σv⟩ ≈ 3 × 10⁻²⁶ cm³ s⁻¹',
      },
    });

    return currentChart;
  }

  const unsub = subscribe('activeChannel', () => build());

  const chart = build();

  return {
    destroy() {
      unsub();
      if (currentChart) currentChart.destroy();
      currentChart = null;
    },
    update() {
      if (currentChart) currentChart.update();
    }
  };
}
