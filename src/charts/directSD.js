/**
 * Spin-dependent direct detection chart configuration.
 */

import { createChart } from './bindChart.js';
import { getExperimentsForCategory } from '../data/experiments.js';
import { sdFogLayers } from '../data/neutrinoFog.js';

export function initDirectSD(containerId) {
  const datasets = getExperimentsForCategory('direct_sd');

  return createChart({
    containerId,
    datasets,
    axes: {
      x: {
        label: 'WIMP mass mχ (GeV/c²)',
        type: 'log',
        domain: [3, 1e4],
      },
      y: {
        label: 'σSD (cm²)',
        type: 'log',
        domain: [1e-45, 1e-36],
      },
    },
    fogLayers: sdFogLayers,
    isContour: false,
  });
}
