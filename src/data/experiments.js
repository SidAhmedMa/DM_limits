/**
 * Dark matter experiment exclusion limit datasets.
 * All data points are representative of published upper limits.
 *
 * Units explicitly declared per dataset:
 *   - Direct detection: m_χ in GeV/c², σ in cm²
 *   - Indirect detection: m_χ in GeV, ⟨σv⟩ in cm³ s⁻¹
 *   - Collider: m_med in GeV, m_χ in GeV (contour vertices)
 */

import { simplifyPath } from '../utils/simplify.js';

// ─── DIRECT DETECTION: SPIN-INDEPENDENT ────────────────────────────────

const directSI = [
  {
    id: 'lz_2024_si',
    name: 'LZ',
    year: 2024,
    category: 'direct_si',
    channel: null,
    color: '#00e5ff',
    reference: 'arXiv:2410.17036',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 9, y: 1.5e-44 },
      { x: 12, y: 2.0e-45 },
      { x: 15, y: 5.0e-46 },
      { x: 20, y: 1.2e-46 },
      { x: 25, y: 5.0e-47 },
      { x: 30, y: 3.0e-47 },
      { x: 40, y: 2.2e-48 },
      { x: 50, y: 3.0e-48 },
      { x: 70, y: 4.5e-48 },
      { x: 100, y: 6.0e-48 },
      { x: 150, y: 9.0e-48 },
      { x: 200, y: 1.2e-47 },
      { x: 300, y: 2.0e-47 },
      { x: 500, y: 3.5e-47 },
      { x: 700, y: 5.0e-47 },
      { x: 1000, y: 8.0e-47 },
      { x: 2000, y: 1.8e-46 },
      { x: 5000, y: 5.0e-46 },
      { x: 10000, y: 1.2e-45 },
    ]
  },
  {
    id: 'xenonnt_2025_si',
    name: 'XENONnT',
    year: 2025,
    category: 'direct_si',
    channel: null,
    color: '#7c4dff',
    reference: 'arXiv:2502.10264',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 9, y: 3.0e-44 },
      { x: 12, y: 5.0e-45 },
      { x: 15, y: 1.5e-45 },
      { x: 20, y: 4.0e-46 },
      { x: 25, y: 1.5e-46 },
      { x: 30, y: 1.7e-47 },
      { x: 40, y: 2.0e-47 },
      { x: 50, y: 2.5e-47 },
      { x: 70, y: 4.0e-47 },
      { x: 100, y: 6.5e-47 },
      { x: 150, y: 1.0e-46 },
      { x: 200, y: 1.5e-46 },
      { x: 300, y: 2.5e-46 },
      { x: 500, y: 4.5e-46 },
      { x: 1000, y: 1.0e-45 },
      { x: 2000, y: 2.5e-45 },
      { x: 5000, y: 7.0e-45 },
      { x: 10000, y: 1.5e-44 },
    ]
  },
  {
    id: 'pandax4t_2024_si',
    name: 'PandaX-4T',
    year: 2024,
    category: 'direct_si',
    channel: null,
    color: '#ff6d00',
    reference: 'arXiv:2408.02792',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 10, y: 8.0e-44 },
      { x: 15, y: 3.5e-45 },
      { x: 20, y: 1.0e-45 },
      { x: 30, y: 2.0e-46 },
      { x: 40, y: 3.8e-47 },
      { x: 50, y: 5.0e-47 },
      { x: 70, y: 8.0e-47 },
      { x: 100, y: 1.2e-46 },
      { x: 200, y: 2.5e-46 },
      { x: 500, y: 6.0e-46 },
      { x: 1000, y: 1.5e-45 },
      { x: 5000, y: 9.0e-45 },
      { x: 10000, y: 2.0e-44 },
    ]
  },
  {
    id: 'deap3600_si',
    name: 'DEAP-3600',
    year: 2022,
    category: 'direct_si',
    channel: null,
    color: '#76ff03',
    reference: 'arXiv:2109.13986',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 20, y: 5.0e-44 },
      { x: 30, y: 1.5e-44 },
      { x: 50, y: 5.0e-45 },
      { x: 100, y: 3.9e-45 },
      { x: 200, y: 5.5e-45 },
      { x: 500, y: 1.0e-44 },
      { x: 1000, y: 2.5e-44 },
      { x: 5000, y: 1.5e-43 },
      { x: 10000, y: 4.0e-43 },
    ]
  },
  {
    id: 'darkside50_si',
    name: 'DarkSide-50',
    year: 2023,
    category: 'direct_si',
    channel: null,
    color: '#ff1744',
    reference: 'arXiv:2207.11966',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 20, y: 8.0e-44 },
      { x: 30, y: 2.5e-44 },
      { x: 50, y: 8.5e-45 },
      { x: 100, y: 6.0e-45 },
      { x: 200, y: 9.0e-45 },
      { x: 500, y: 2.0e-44 },
      { x: 1000, y: 5.0e-44 },
      { x: 10000, y: 6.0e-43 },
    ]
  },
  {
    id: 'cresst3_si',
    name: 'CRESST-III',
    year: 2024,
    category: 'direct_si',
    channel: null,
    color: '#ffea00',
    reference: 'arXiv:2305.10940',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 0.35, y: 5.0e-33 },
      { x: 0.5, y: 1.0e-34 },
      { x: 0.7, y: 5.0e-36 },
      { x: 1, y: 3.0e-37 },
      { x: 1.5, y: 5.0e-38 },
      { x: 2, y: 2.0e-38 },
      { x: 3, y: 1.5e-38 },
      { x: 5, y: 2.5e-38 },
      { x: 8, y: 8.0e-39 },
      { x: 10, y: 1.5e-39 },
    ]
  },
  {
    id: 'supercdms_si',
    name: 'SuperCDMS',
    year: 2023,
    category: 'direct_si',
    channel: null,
    color: '#e040fb',
    reference: 'arXiv:2308.12173',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 1, y: 1.0e-38 },
      { x: 1.5, y: 1.5e-39 },
      { x: 2, y: 4.0e-40 },
      { x: 3, y: 1.0e-40 },
      { x: 5, y: 3.0e-41 },
      { x: 7, y: 1.5e-41 },
      { x: 10, y: 8.0e-42 },
      { x: 15, y: 5.0e-42 },
      { x: 20, y: 4.0e-42 },
      { x: 30, y: 8.0e-42 },
    ]
  },
];

// ─── DIRECT DETECTION: SPIN-DEPENDENT ───────────────────────────────────

const directSD = [
  {
    id: 'lz_2024_sd_n',
    name: 'LZ (neutron)',
    year: 2024,
    category: 'direct_sd',
    channel: null,
    color: '#00e5ff',
    reference: 'arXiv:2410.17036',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 10, y: 2.0e-39 },
      { x: 20, y: 3.0e-40 },
      { x: 30, y: 8.0e-41 },
      { x: 40, y: 4.0e-41 },
      { x: 50, y: 3.5e-41 },
      { x: 70, y: 4.5e-41 },
      { x: 100, y: 6.0e-41 },
      { x: 200, y: 1.2e-40 },
      { x: 500, y: 4.0e-40 },
      { x: 1000, y: 1.0e-39 },
      { x: 5000, y: 8.0e-39 },
    ]
  },
  {
    id: 'pico60_sd_p',
    name: 'PICO-60 (proton)',
    year: 2023,
    category: 'direct_sd',
    channel: null,
    color: '#ff9100',
    reference: 'arXiv:1902.04031',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 5, y: 5.0e-38 },
      { x: 10, y: 5.0e-39 },
      { x: 20, y: 1.2e-39 },
      { x: 25, y: 2.5e-40 },
      { x: 30, y: 2.0e-40 },
      { x: 50, y: 2.5e-40 },
      { x: 100, y: 5.0e-40 },
      { x: 200, y: 1.0e-39 },
      { x: 500, y: 3.0e-39 },
      { x: 1000, y: 8.0e-39 },
      { x: 5000, y: 5.0e-38 },
    ]
  },
  {
    id: 'pandax4t_sd_n',
    name: 'PandaX-4T (neutron)',
    year: 2024,
    category: 'direct_sd',
    channel: null,
    color: '#ff6d00',
    reference: 'arXiv:2408.02792',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 10, y: 3.0e-39 },
      { x: 20, y: 5.0e-40 },
      { x: 30, y: 1.5e-40 },
      { x: 40, y: 5.8e-42 },
      { x: 50, y: 7.0e-41 },
      { x: 100, y: 1.0e-40 },
      { x: 200, y: 2.0e-40 },
      { x: 500, y: 6.0e-40 },
      { x: 1000, y: 1.5e-39 },
    ]
  },
  {
    id: 'pandax4t_sd_p',
    name: 'PandaX-4T (proton)',
    year: 2024,
    category: 'direct_sd',
    channel: null,
    color: '#ff3d00',
    reference: 'arXiv:2408.02792',
    units: { x: 'GeV/c²', y: 'cm²' },
    dataPoints: [
      { x: 10, y: 8.0e-38 },
      { x: 20, y: 1.0e-38 },
      { x: 30, y: 4.0e-39 },
      { x: 40, y: 1.7e-40 },
      { x: 50, y: 2.5e-39 },
      { x: 100, y: 5.0e-39 },
      { x: 200, y: 1.0e-38 },
      { x: 500, y: 3.0e-38 },
      { x: 1000, y: 8.0e-38 },
    ]
  },
];

// ─── INDIRECT DETECTION ─────────────────────────────────────────────────

const indirect = [
  {
    id: 'fermi_dsphs_bb',
    name: 'Fermi-LAT dSphs',
    year: 2024,
    category: 'indirect',
    channel: 'bb',
    color: '#ffd600',
    reference: 'arXiv:1503.02641',
    units: { x: 'GeV', y: 'cm³ s⁻¹' },
    dataPoints: [
      { x: 6, y: 2.0e-26 },
      { x: 10, y: 1.5e-26 },
      { x: 20, y: 2.0e-26 },
      { x: 50, y: 3.5e-26 },
      { x: 100, y: 8.0e-26 },
      { x: 200, y: 2.0e-25 },
      { x: 500, y: 8.0e-25 },
      { x: 1000, y: 3.0e-24 },
      { x: 5000, y: 5.0e-23 },
      { x: 10000, y: 2.0e-22 },
    ]
  },
  {
    id: 'fermi_dsphs_tautau',
    name: 'Fermi-LAT dSphs',
    year: 2024,
    category: 'indirect',
    channel: 'tautau',
    color: '#ffd600',
    reference: 'arXiv:1503.02641',
    units: { x: 'GeV', y: 'cm³ s⁻¹' },
    dataPoints: [
      { x: 4, y: 8.0e-27 },
      { x: 10, y: 5.5e-27 },
      { x: 20, y: 8.0e-27 },
      { x: 50, y: 2.0e-26 },
      { x: 100, y: 5.0e-26 },
      { x: 200, y: 1.5e-25 },
      { x: 500, y: 5.0e-25 },
      { x: 1000, y: 2.0e-24 },
      { x: 5000, y: 3.0e-23 },
    ]
  },
  {
    id: 'magic_fermi_bb',
    name: 'MAGIC + Fermi',
    year: 2023,
    category: 'indirect',
    channel: 'bb',
    color: '#00bfa5',
    reference: 'arXiv:1601.06590',
    units: { x: 'GeV', y: 'cm³ s⁻¹' },
    dataPoints: [
      { x: 10, y: 3.0e-26 },
      { x: 50, y: 2.0e-25 },
      { x: 100, y: 1.5e-25 },
      { x: 200, y: 2.0e-25 },
      { x: 500, y: 3.0e-25 },
      { x: 1000, y: 5.0e-25 },
      { x: 5000, y: 2.0e-24 },
      { x: 10000, y: 5.0e-24 },
      { x: 50000, y: 5.0e-23 },
      { x: 100000, y: 2.0e-22 },
    ]
  },
  {
    id: 'hess_gc_bb',
    name: 'H.E.S.S. GC',
    year: 2022,
    category: 'indirect',
    channel: 'bb',
    color: '#ff5252',
    reference: 'arXiv:2106.02056',
    units: { x: 'GeV', y: 'cm³ s⁻¹' },
    dataPoints: [
      { x: 200, y: 1.0e-25 },
      { x: 500, y: 4.0e-26 },
      { x: 1000, y: 3.0e-26 },
      { x: 2000, y: 5.0e-26 },
      { x: 5000, y: 1.5e-25 },
      { x: 10000, y: 5.0e-25 },
      { x: 50000, y: 5.0e-24 },
      { x: 100000, y: 3.0e-23 },
    ]
  },
  {
    id: 'cta_projected_bb',
    name: 'CTA (projected)',
    year: 2025,
    category: 'indirect',
    channel: 'bb',
    color: '#448aff',
    reference: 'arXiv:2007.16129',
    units: { x: 'GeV', y: 'cm³ s⁻¹' },
    dataPoints: [
      { x: 50, y: 5.0e-26 },
      { x: 100, y: 2.0e-26 },
      { x: 200, y: 1.0e-26 },
      { x: 500, y: 5.0e-27 },
      { x: 1000, y: 3.0e-27 },
      { x: 2000, y: 5.0e-27 },
      { x: 5000, y: 1.5e-26 },
      { x: 10000, y: 5.0e-26 },
      { x: 50000, y: 5.0e-25 },
      { x: 100000, y: 3.0e-24 },
    ]
  },
];

// ─── COLLIDER SEARCHES ──────────────────────────────────────────────────
// Contour boundaries: arrays of {x, y} forming closed polygons.
// x = m_med (GeV), y = m_χ (GeV)

const collider = [
  {
    id: 'atlas_monojet_vector',
    name: 'ATLAS (vector)',
    year: 2024,
    category: 'collider',
    channel: null,
    color: '#00e5ff',
    reference: 'arXiv:2102.10874',
    units: { x: 'GeV', y: 'GeV' },
    dataPoints: [
      { x: 50, y: 1 },
      { x: 200, y: 1 },
      { x: 500, y: 1 },
      { x: 800, y: 1 },
      { x: 1000, y: 50 },
      { x: 1200, y: 150 },
      { x: 1400, y: 300 },
      { x: 1470, y: 500 },
      { x: 1400, y: 550 },
      { x: 1200, y: 580 },
      { x: 1000, y: 490 },
      { x: 800, y: 395 },
      { x: 500, y: 245 },
      { x: 200, y: 95 },
      { x: 50, y: 20 },
      { x: 50, y: 1 },
    ]
  },
  {
    id: 'atlas_monojet_axial',
    name: 'ATLAS (axial-vector)',
    year: 2024,
    category: 'collider',
    channel: null,
    color: '#7c4dff',
    reference: 'arXiv:2102.10874',
    units: { x: 'GeV', y: 'GeV' },
    dataPoints: [
      { x: 50, y: 1 },
      { x: 200, y: 1 },
      { x: 500, y: 1 },
      { x: 800, y: 1 },
      { x: 1100, y: 50 },
      { x: 1300, y: 150 },
      { x: 1460, y: 300 },
      { x: 1460, y: 415 },
      { x: 1300, y: 430 },
      { x: 1100, y: 420 },
      { x: 800, y: 380 },
      { x: 500, y: 240 },
      { x: 200, y: 90 },
      { x: 50, y: 20 },
      { x: 50, y: 1 },
    ]
  },
  {
    id: 'cms_monojet_vector',
    name: 'CMS (vector)',
    year: 2024,
    category: 'collider',
    channel: null,
    color: '#ff6d00',
    reference: 'arXiv:2107.13021',
    units: { x: 'GeV', y: 'GeV' },
    dataPoints: [
      { x: 50, y: 1 },
      { x: 200, y: 1 },
      { x: 500, y: 1 },
      { x: 900, y: 1 },
      { x: 1100, y: 80 },
      { x: 1300, y: 200 },
      { x: 1500, y: 400 },
      { x: 1470, y: 560 },
      { x: 1300, y: 580 },
      { x: 1100, y: 520 },
      { x: 900, y: 440 },
      { x: 500, y: 240 },
      { x: 200, y: 90 },
      { x: 50, y: 20 },
      { x: 50, y: 1 },
    ]
  },
  {
    id: 'cms_monojet_axial',
    name: 'CMS (axial-vector)',
    year: 2024,
    category: 'collider',
    channel: null,
    color: '#ff1744',
    reference: 'arXiv:2107.13021',
    units: { x: 'GeV', y: 'GeV' },
    dataPoints: [
      { x: 50, y: 1 },
      { x: 200, y: 1 },
      { x: 500, y: 1 },
      { x: 900, y: 1 },
      { x: 1200, y: 100 },
      { x: 1500, y: 250 },
      { x: 1700, y: 400 },
      { x: 1800, y: 500 },
      { x: 2000, y: 550 },
      { x: 2200, y: 500 },
      { x: 2000, y: 420 },
      { x: 1700, y: 350 },
      { x: 1500, y: 280 },
      { x: 1200, y: 200 },
      { x: 900, y: 100 },
      { x: 500, y: 30 },
      { x: 200, y: 10 },
      { x: 50, y: 1 },
    ]
  },
];

// ─── APPLY SIMPLIFICATION & EXPORT ──────────────────────────────────────

function simplifyAll(datasets) {
  return datasets.map(d => ({
    ...d,
    dataPoints: simplifyPath(d.dataPoints, 200),
  }));
}

export const experiments = {
  direct_si: simplifyAll(directSI),
  direct_sd: simplifyAll(directSD),
  indirect: simplifyAll(indirect),
  collider: simplifyAll(collider),
};

export function getExperimentsForCategory(category) {
  return experiments[category] || [];
}

export function getAllExperiments() {
  return Object.values(experiments).flat();
}
