/**
 * Spin-independent direct detection chart configuration.
 */

import { createChart } from './bindChart.js';
import { getExperimentsForCategory } from '../data/experiments.js';
import { siFogLayers } from '../data/neutrinoFog.js';

export function initDirectSI(containerId) {
  const datasets = getExperimentsForCategory('direct_si');

  return createChart({
    containerId,
    datasets,
    axes: {
      x: {
        label: 'WIMP mass mχ (GeV/c²)',
        type: 'log',
        domain: [0.3, 1e4],
      },
      y: {
        label: 'σSI (cm²)',
        type: 'log',
        domain: [1e-50, 1e-33],
      },
    },
    fogLayers: siFogLayers,
    isContour: false,
  });
}
