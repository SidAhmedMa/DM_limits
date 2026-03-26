/**
 * Spin-dependent direct detection chart configuration.
 */

import { createChart } from './bindChart.js';
import { getExperimentsForCategory } from '../data/experiments.js';
import { getState, subscribe } from '../state/store.js';

let currentChart = null;

export function initDirectSD(containerId) {
  function build() {
    if (currentChart) currentChart.destroy();

    const allDatasets = getExperimentsForCategory('direct_sd');
    const channel = getState().activeChannel;
    // Fallback to 'neutron' if state.activeChannel is bb/tautau from previous tab but hasn't updated
    const targetChannel = (channel === 'bb' || channel === 'tautau') ? 'neutron' : channel;
    const datasets = allDatasets.filter(d => d.channel === targetChannel);

    currentChart = createChart({
      containerId,
      datasets,
      axes: {
        x: {
          label: 'WIMP mass mχ (GeV/c²)',
          type: 'log',
          domain: [1, 1e4],
        },
        y: {
          label: 'σSD (cm²)',
          type: 'log',
          domain: [1e-43, 1e-37],
        },
      },
      fogLayers: [],
      isContour: false,
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
