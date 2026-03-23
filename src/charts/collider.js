/**
 * Collider exclusion contour chart configuration.
 * Renders closed filled SVG polygons (not lines).
 */

import { createChart } from './bindChart.js';
import { getExperimentsForCategory } from '../data/experiments.js';

export function initCollider(containerId) {
  const datasets = getExperimentsForCategory('collider');

  return createChart({
    containerId,
    datasets,
    axes: {
      x: {
        label: 'Mediator mass mmed (GeV)',
        type: 'linear',
        domain: [0, 2500],
      },
      y: {
        label: 'DM mass mχ (GeV)',
        type: 'linear',
        domain: [0, 700],
      },
    },
    fogLayers: [],
    isContour: true,
    diagonalLine: {
      slope: 2,  // m_med = 2·m_χ
      label: 'mmed = 2 · mχ',
    },
  });
}
