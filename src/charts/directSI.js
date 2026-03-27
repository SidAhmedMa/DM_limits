/**
 * Spin-independent direct detection chart configuration.
 */

import { createChart } from './bindChart.js';
import { getExperimentsForCategory } from '../data/experiments.js';

export function initDirectSI(containerId) {
  const datasets = getExperimentsForCategory('direct_si');

  return createChart({
    containerId,
    datasets,
    axes: {
      x: {
        label: 'WIMP mass mχ (GeV/c²)',
        type: 'log',
        domain: [1, 1e4],
      },
      y: {
        label: 'σSI (cm²)',
        type: 'log',
        domain: [1e-48, 1e-36],
      },
    },
    fogLayers: [],
    isContour: false,
  });
}
