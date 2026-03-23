/**
 * Scientific notation formatting for physics-scale numbers.
 * Handles values down to 10⁻⁴⁸ without precision loss.
 */

const SUPERSCRIPT_MAP = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '-': '⁻', '+': '⁺'
};

function toSuperscript(str) {
  return str.replace(/[0-9\-+]/g, ch => SUPERSCRIPT_MAP[ch] || ch);
}

/**
 * Format a number in scientific notation using Unicode superscripts.
 * @param {number} value
 * @param {number} [precision=2] - significant digits after decimal
 * @returns {string} e.g. "2.30 × 10⁻⁴⁶"
 */
export function formatSci(value, precision = 2) {
  if (value === 0) return '0';
  if (!Number.isFinite(value)) return '—';

  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exp);

  if (exp === 0) return mantissa.toFixed(precision);

  const expStr = toSuperscript(exp.toString());
  return `${mantissa.toFixed(precision)} × 10${expStr}`;
}

/**
 * Format a number in scientific notation with HTML <sup> tags for tooltips.
 * @param {number} value
 * @param {string} [unit=''] - optional unit string appended
 * @param {number} [precision=2]
 * @returns {string} HTML string e.g. "2.30 × 10<sup>−46</sup> cm²"
 */
export function formatSciHTML(value, unit = '', precision = 2) {
  if (value === 0) return '0';
  if (!Number.isFinite(value)) return '—';

  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exp);

  const unitSuffix = unit ? ` ${unit}` : '';

  if (exp === 0) return `${mantissa.toFixed(precision)}${unitSuffix}`;

  const expStr = exp < 0 ? `−${Math.abs(exp)}` : `${exp}`;
  return `${mantissa.toFixed(precision)} × 10<sup>${expStr}</sup>${unitSuffix}`;
}

/**
 * Format mass values (GeV/c²) — no scientific notation needed above 1.
 */
export function formatMass(value) {
  if (!Number.isFinite(value)) return '—';
  if (value >= 1000) return `${(value / 1000).toFixed(1)} TeV/c²`;
  if (value >= 1) return `${value.toFixed(1)} GeV/c²`;
  return `${(value * 1000).toFixed(1)} MeV/c²`;
}
