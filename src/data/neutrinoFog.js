/**
 * Neutrino fog (coherent elastic neutrino-nucleus scattering background)
 * for spin-independent WIMP-nucleon cross-section plots.
 *
 * The neutrino "fog" is not a single floor line but a gradient of discovery
 * limits from multiple distinct neutrino sources. Each source defines a
 * polygon boundary in (m_χ [GeV/c²], σ_SI [cm²]) space.
 *
 * Data representative of O'Hare 2021 (arXiv:2109.04684) neutrino fog contours.
 */

/**
 * Solar neutrinos (pp, ⁷Be, ⁸B, hep) — dominates at low WIMP masses.
 * Boundary below which solar neutrinos mimic a WIMP signal.
 */
export const solarNeutrinoFog = {
  id: 'neutrino_fog_solar',
  label: 'Solar ν fog',
  color: 'rgba(255, 193, 7, 0.12)',
  borderColor: 'rgba(255, 193, 7, 0.3)',
  dataPoints: [
    { x: 0.3, y: 1e-39 },
    { x: 0.5, y: 2e-41 },
    { x: 1, y: 5e-43 },
    { x: 2, y: 1e-44 },
    { x: 5, y: 2e-45 },
    { x: 8, y: 5e-45 },
    { x: 6, y: 8e-45 },
    { x: 7, y: 1.5e-44 },
    { x: 8, y: 3e-44 },
    { x: 10, y: 4e-45 },
    { x: 15, y: 1e-45 },
    { x: 20, y: 5e-46 },
    { x: 30, y: 8e-46 },
    { x: 50, y: 5e-46 },
    { x: 100, y: 2e-46 },
    { x: 200, y: 1e-46 },
    { x: 500, y: 8e-47 },
    { x: 1000, y: 2e-46 },
    { x: 5000, y: 2e-45 },
    { x: 10000, y: 1e-44 },
  ]
};

/**
 * Atmospheric neutrinos — dominates at intermediate WIMP masses.
 */
export const atmosphericNeutrinoFog = {
  id: 'neutrino_fog_atm',
  label: 'Atmospheric ν fog',
  color: 'rgba(33, 150, 243, 0.10)',
  borderColor: 'rgba(33, 150, 243, 0.25)',
  dataPoints: [
    { x: 5, y: 1e-48 },
    { x: 10, y: 3e-49 },
    { x: 20, y: 1e-49 },
    { x: 50, y: 5e-50 },
    { x: 100, y: 3e-50 },
    { x: 200, y: 2e-50 },
    { x: 500, y: 2e-50 },
    { x: 1000, y: 3e-50 },
    { x: 5000, y: 2e-49 },
    { x: 10000, y: 1e-48 },
  ]
};

/**
 * Diffuse supernova neutrino background (DSNB) — contributes at high masses.
 */
export const dsnbNeutrinoFog = {
  id: 'neutrino_fog_dsnb',
  label: 'DSNB ν fog',
  color: 'rgba(156, 39, 176, 0.08)',
  borderColor: 'rgba(156, 39, 176, 0.20)',
  dataPoints: [
    { x: 5, y: 5e-47 },
    { x: 10, y: 1e-47 },
    { x: 20, y: 3e-48 },
    { x: 50, y: 1e-48 },
    { x: 100, y: 5e-49 },
    { x: 200, y: 3e-49 },
    { x: 500, y: 2e-49 },
    { x: 1000, y: 3e-49 },
    { x: 5000, y: 2e-48 },
    { x: 10000, y: 1e-47 },
  ]
};

/**
 * SD neutrino fog (simplified single band for SD plots).
 */
export const sdNeutrinoFog = {
  id: 'neutrino_fog_sd',
  label: 'ν fog (SD)',
  color: 'rgba(255, 193, 7, 0.10)',
  borderColor: 'rgba(255, 193, 7, 0.25)',
  dataPoints: [
    { x: 5, y: 5e-43 },
    { x: 10, y: 1e-43 },
    { x: 20, y: 3e-44 },
    { x: 50, y: 8e-45 },
    { x: 100, y: 3e-45 },
    { x: 200, y: 1.5e-45 },
    { x: 500, y: 1e-45 },
    { x: 1000, y: 1.5e-45 },
    { x: 5000, y: 1e-44 },
    { x: 10000, y: 5e-44 },
  ]
};

export const siFogLayers = [solarNeutrinoFog, dsnbNeutrinoFog, atmosphericNeutrinoFog];
export const sdFogLayers = [sdNeutrinoFog];
