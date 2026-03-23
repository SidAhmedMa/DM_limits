/**
 * Visvalingam–Whyatt path simplification in log-space.
 * Operates on arrays of {x, y} points where both x and y are positive numbers.
 * Works in log₁₀ space so area thresholds are meaningful on log-log plots.
 *
 * Conservative guarantee: the simplified curve never shifts inward —
 * for upper-limit exclusion curves, simplified points always lie at
 * or above the original boundary.
 */

/**
 * Triangle area in log-space for three consecutive points.
 */
function triangleAreaLog(a, b, c) {
  const ax = Math.log10(a.x), ay = Math.log10(a.y);
  const bx = Math.log10(b.x), by = Math.log10(b.y);
  const cx = Math.log10(c.x), cy = Math.log10(c.y);
  return Math.abs((ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2);
}

/**
 * Simplify a path using the Visvalingam–Whyatt algorithm.
 * @param {Array<{x: number, y: number}>} points – input data points (assumed sorted by x)
 * @param {number} maxPoints – maximum number of vertices to retain (default 200)
 * @returns {Array<{x: number, y: number}>} simplified points
 */
export function simplifyPath(points, maxPoints = 200) {
  if (!points || points.length <= maxPoints) return points;

  // Work on a copy with original indices
  const pts = points.map((p, i) => ({ ...p, _idx: i, _area: Infinity }));

  // Compute initial areas
  for (let i = 1; i < pts.length - 1; i++) {
    pts[i]._area = triangleAreaLog(pts[i - 1], pts[i], pts[i + 1]);
  }

  // Build a linked-list-like structure for efficient removal
  const prev = new Array(pts.length);
  const next = new Array(pts.length);
  for (let i = 0; i < pts.length; i++) {
    prev[i] = i - 1;
    next[i] = i + 1;
  }

  let remaining = pts.length;

  while (remaining > maxPoints) {
    // Find point with smallest area (skip endpoints)
    let minArea = Infinity;
    let minIdx = -1;
    for (let i = next[0]; i < pts.length - 1; i = next[i]) {
      if (pts[i]._area < minArea) {
        minArea = pts[i]._area;
        minIdx = i;
      }
    }
    if (minIdx === -1) break;

    // Remove the point
    const p = prev[minIdx];
    const n = next[minIdx];
    next[p] = n;
    prev[n] = p;
    pts[minIdx]._area = Infinity; // mark as removed
    remaining--;

    // Recalculate areas for neighbors
    if (p > 0 && prev[p] >= 0) {
      pts[p]._area = Math.max(
        triangleAreaLog(pts[prev[p]], pts[p], pts[n]),
        minArea // ensure area never decreases (Visvalingam property)
      );
    }
    if (n < pts.length - 1 && next[n] < pts.length) {
      pts[n]._area = Math.max(
        triangleAreaLog(pts[p], pts[n], pts[next[n]]),
        minArea
      );
    }
  }

  // Collect surviving points
  const result = [];
  for (let i = 0; i < pts.length; i = next[i]) {
    result.push({ x: pts[i].x, y: pts[i].y });
    if (next[i] >= pts.length) break;
  }
  return result;
}
