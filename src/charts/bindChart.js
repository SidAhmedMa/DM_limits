/**
 * D3 chart factory — fully interactive SVG-based scientific plots.
 *
 * Interactive features:
 *   • Zoom & pan (scroll wheel + drag)
 *   • Brush-to-zoom (shift+drag draws a rectangle to zoom into)
 *   • Double-click to reset zoom
 *   • Crosshair with live coordinate readout
 *   • Click on a curve to select/highlight it
 *   • Responsive via ResizeObserver
 */

import * as d3 from 'd3';
import { subscribe, getState, dispatch } from '../state/store.js';
import { formatSciHTML, formatMass } from '../utils/format.js';

/**
 * @param {Object} config
 * @param {string} config.containerId
 * @param {Array} config.datasets
 * @param {Object} config.axes
 * @param {Array} [config.fogLayers]
 * @param {boolean} [config.isContour]
 * @param {Object} [config.referenceLine]
 * @param {Object} [config.diagonalLine]
 * @returns {{ destroy: Function, update: Function }}
 */
export function createChart(config) {
  const {
    containerId,
    datasets,
    axes,
    fogLayers = [],
    isContour = false,
    referenceLine = null,
    diagonalLine = null,
  } = config;

  const container = document.getElementById(containerId);
  if (!container) return { destroy: () => {}, update: () => {} };

  container.innerHTML = '';

  const margin = { top: 30, right: 30, bottom: 70, left: 90 };

  // ─── DOM structure ───
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:relative;width:100%;height:100%;';

  const svg = d3.select(wrapper)
    .append('svg')
    .attr('class', 'chart-svg')
    .attr('width', '100%')
    .attr('height', '100%');

  const tooltip = d3.select(wrapper)
    .append('div')
    .attr('class', 'chart-tooltip')
    .style('opacity', 0);

  // Coordinate readout
  const coordReadout = document.createElement('div');
  coordReadout.className = 'chart-coord-readout';
  wrapper.appendChild(coordReadout);

  // Chart toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'chart-toolbar';
  toolbar.innerHTML = `
    <button class="chart-tool-btn" data-action="reset" title="Reset zoom (double-click)">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1v4h4"/><path d="M1 5A6 6 0 1 1 2.5 10"/></svg>
    </button>
    <button class="chart-tool-btn" data-action="zoomIn" title="Zoom in">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="4.5"/><line x1="9.2" y1="9.2" x2="13" y2="13"/><line x1="4" y1="6" x2="8" y2="6"/><line x1="6" y1="4" x2="6" y2="8"/></svg>
    </button>
    <button class="chart-tool-btn" data-action="zoomOut" title="Zoom out">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="4.5"/><line x1="9.2" y1="9.2" x2="13" y2="13"/><line x1="4" y1="6" x2="8" y2="6"/></svg>
    </button>
  `;
  wrapper.appendChild(toolbar);

  container.appendChild(wrapper);

  let width, height;
  let currentTransform = d3.zoomIdentity;

  function getSize() {
    const rect = container.getBoundingClientRect();
    width = Math.max(rect.width - margin.left - margin.right, 100);
    height = Math.max(rect.height - margin.top - margin.bottom, 100);
    return { width, height };
  }

  // ─── Build base scales (reset domain) ───
  function buildBaseScales() {
    getSize();
    const xBase = axes.x.type === 'log'
      ? d3.scaleLog().domain(axes.x.domain).range([0, width]).clamp(true)
      : d3.scaleLinear().domain(axes.x.domain).range([0, width]);
    const yBase = axes.y.type === 'log'
      ? d3.scaleLog().domain(axes.y.domain).range([height, 0]).clamp(true)
      : d3.scaleLinear().domain(axes.y.domain).range([height, 0]);
    return { xBase, yBase };
  }

  // ─── Apply current zoom transform to scales ───
  function getZoomedScales(xBase, yBase) {
    const xScale = currentTransform.rescaleX(xBase);
    const yScale = currentTransform.rescaleY(yBase);
    return { xScale, yScale };
  }

  // ─── Render ───
  function render() {
    const { xBase, yBase } = buildBaseScales();
    const { xScale, yScale } = getZoomedScales(xBase, yBase);
    const state = getState();

    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

    // Clip path to contain chart content
    const clipId = `clip-${containerId}`;
    svg.append('defs').append('clipPath')
      .attr('id', clipId)
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const chartArea = g.append('g')
      .attr('clip-path', `url(#${clipId})`);

    // ─── Grid lines ───
    g.append('g').attr('class', 'grid-x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(''))
      .selectAll('line').attr('stroke', 'var(--grid-line)');
    g.append('g').attr('class', 'grid-y')
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(''))
      .selectAll('line').attr('stroke', 'var(--grid-line)');
    g.selectAll('.grid-x .domain, .grid-y .domain').remove();

    // ─── Axes ───
    const tickFmt = (type) => type === 'log'
      ? (d) => { const l = Math.log10(d); return Number.isInteger(l) ? `10${toSuperscriptStr(l)}` : ''; }
      : d3.format(',.0f');

    g.append('g').attr('class', 'axis axis-x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(tickFmt(axes.x.type)))
      .selectAll('text')
      .attr('fill', 'var(--text-secondary)')
      .style('font-family', 'JetBrains Mono, monospace').style('font-size', '11px');

    g.append('g').attr('class', 'axis axis-y')
      .call(d3.axisLeft(yScale).tickFormat(tickFmt(axes.y.type)))
      .selectAll('text')
      .attr('fill', 'var(--text-secondary)')
      .style('font-family', 'JetBrains Mono, monospace').style('font-size', '11px');

    g.selectAll('.axis line, .axis path').attr('stroke', 'var(--border)');

    // Axis labels
    g.append('text').attr('class', 'axis-label')
      .attr('x', width / 2).attr('y', height + 55)
      .attr('text-anchor', 'middle').attr('fill', 'var(--text-secondary)')
      .style('font-size', '13px').text(axes.x.label);
    g.append('text').attr('class', 'axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2).attr('y', -70)
      .attr('text-anchor', 'middle').attr('fill', 'var(--text-secondary)')
      .style('font-size', '13px').text(axes.y.label);

    // ─── Neutrino fog layers ───
    fogLayers.forEach(fog => {
      const area = d3.area()
        .x(d => xScale(d.x)).y0(height).y1(d => yScale(d.y))
        .curve(d3.curveMonotoneX);
      chartArea.append('path').datum(fog.dataPoints)
        .attr('d', area).attr('fill', fog.color)
        .attr('stroke', fog.borderColor).attr('stroke-width', 1)
        .attr('class', 'fog-layer');
      const lastPt = fog.dataPoints[fog.dataPoints.length - 1];
      chartArea.append('text')
        .attr('x', xScale(lastPt.x) - 10).attr('y', yScale(lastPt.y) - 8)
        .attr('text-anchor', 'end').attr('fill', fog.borderColor)
        .style('font-size', '10px').style('font-style', 'italic').text(fog.label);
    });

    // ─── Reference line ───
    if (referenceLine) {
      const yPos = yScale(referenceLine.value);
      chartArea.append('line')
        .attr('x1', 0).attr('x2', width).attr('y1', yPos).attr('y2', yPos)
        .attr('stroke', 'rgba(255,255,255,0.4)').attr('stroke-dasharray', '6,4').attr('stroke-width', 1.5);
      chartArea.append('text')
        .attr('x', width - 5).attr('y', yPos - 8)
        .attr('text-anchor', 'end').attr('fill', 'rgba(255,255,255,0.5)')
        .style('font-size', '10px').style('font-style', 'italic').text(referenceLine.label);
    }

    // ─── Diagonal line ───
    if (diagonalLine) {
      const [x0, x1] = axes.x.domain;
      const y0d = x0 / diagonalLine.slope, y1d = x1 / diagonalLine.slope;
      chartArea.append('line')
        .attr('x1', xScale(x0)).attr('x2', xScale(x1))
        .attr('y1', yScale(y0d)).attr('y2', yScale(y1d))
        .attr('stroke', 'rgba(255,255,255,0.25)').attr('stroke-dasharray', '4,4').attr('stroke-width', 1);
      chartArea.append('text')
        .attr('x', xScale(x1) - 5).attr('y', yScale(y1d) + 15)
        .attr('text-anchor', 'end').attr('fill', 'rgba(255,255,255,0.35)')
        .style('font-size', '10px').style('font-style', 'italic').text(diagonalLine.label);
    }

    // ─── Datasets ───
    const line = d3.line()
      .x(d => xScale(d.x)).y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    datasets.forEach(dataset => {
      const es = state.experiments[dataset.id] || { visible: true, highlighted: false };

      if (isContour) {
        chartArea.append('path').datum(dataset.dataPoints)
          .attr('d', line)
          .attr('fill', dataset.color)
          .attr('fill-opacity', es.visible ? (es.highlighted ? 0.45 : 0.25) : 0)
          .attr('stroke', dataset.color)
          .attr('stroke-width', es.highlighted ? 2.5 : 1.5)
          .attr('stroke-opacity', es.visible ? 1 : 0)
          .attr('class', `dataset-path dataset-${dataset.id}`)
          .attr('data-id', dataset.id)
          .style('cursor', 'pointer')
          .style('transition', 'fill-opacity 0.3s, stroke-opacity 0.3s, stroke-width 0.2s')
          .on('click', (event) => { event.stopPropagation(); dispatch('HIGHLIGHT_EXPERIMENT', dataset.id); });
      } else {
        const area = d3.area()
          .x(d => xScale(d.x)).y0(height).y1(d => yScale(d.y))
          .curve(d3.curveMonotoneX);
        chartArea.append('path').datum(dataset.dataPoints)
          .attr('d', area).attr('fill', dataset.color)
          .attr('fill-opacity', es.visible ? (es.highlighted ? 0.12 : 0.04) : 0)
          .attr('class', `dataset-area dataset-${dataset.id}-area`)
          .style('transition', 'fill-opacity 0.3s');
        chartArea.append('path').datum(dataset.dataPoints)
          .attr('d', line).attr('fill', 'none')
          .attr('stroke', dataset.color)
          .attr('stroke-width', es.highlighted ? 3.5 : 2)
          .attr('stroke-opacity', es.visible ? 1 : 0)
          .attr('class', `dataset-path dataset-${dataset.id}`)
          .attr('data-id', dataset.id)
          .style('cursor', 'pointer')
          .style('transition', 'stroke-opacity 0.3s, stroke-width 0.2s')
          .on('click', (event) => { event.stopPropagation(); dispatch('HIGHLIGHT_EXPERIMENT', dataset.id); });
      }
    });

    // ─── Crosshair ───
    const crosshairV = chartArea.append('line').attr('class', 'crosshair').attr('y1', 0).attr('y2', height)
      .attr('stroke', 'var(--text-muted)').attr('stroke-width', 0.5).attr('stroke-dasharray', '3,3').style('opacity', 0);
    const crosshairH = chartArea.append('line').attr('class', 'crosshair').attr('x1', 0).attr('x2', width)
      .attr('stroke', 'var(--text-muted)').attr('stroke-width', 0.5).attr('stroke-dasharray', '3,3').style('opacity', 0);

    // ─── Interaction overlay ───
    const overlay = chartArea.append('rect')
      .attr('width', width).attr('height', height)
      .attr('fill', 'transparent').style('cursor', 'crosshair');

    // ─── Zoom behavior ───
    const zoom = d3.zoom()
      .scaleExtent([0.5, 50])
      .on('zoom', (event) => {
        currentTransform = event.transform;
        render();
      });

    svg.call(zoom);
    svg.call(zoom.transform, currentTransform);

    // ─── Mouse interactions ───
    overlay.on('mousemove', function(event) {
      const [mx, my] = d3.pointer(event);
      const xVal = xScale.invert(mx);
      const yVal = yScale.invert(my);

      // Crosshair
      crosshairV.attr('x1', mx).attr('x2', mx).style('opacity', 0.6);
      crosshairH.attr('y1', my).attr('y2', my).style('opacity', 0.6);

      // Coordinate readout
      const xFmt = axes.x.type === 'log' ? formatSciHTML(xVal, axes.x.label.includes('GeV') ? 'GeV' : '') : `${xVal.toFixed(0)} GeV`;
      const yFmt = formatSciHTML(yVal, '');
      coordReadout.innerHTML = `${xFmt} , ${yFmt}`;
      coordReadout.style.opacity = '1';

      // Nearest dataset point for tooltip
      let nearest = null, minDist = Infinity;
      datasets.forEach(dataset => {
        const es = state.experiments[dataset.id];
        if (!es || !es.visible) return;
        dataset.dataPoints.forEach(pt => {
          const px = xScale(pt.x), py = yScale(pt.y);
          const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
          if (dist < minDist && dist < 50) { minDist = dist; nearest = { ...pt, dataset }; }
        });
      });

      if (nearest) {
        const xUnit = nearest.dataset.units.x;
        const yUnit = nearest.dataset.units.y;
        const xFormatted = axes.x.type === 'log' ? formatSciHTML(nearest.x, xUnit) : `${nearest.x.toFixed(0)} ${xUnit}`;
        const yFormatted = formatSciHTML(nearest.y, yUnit);
        tooltip.style('opacity', 1).html(`
          <div class="tooltip-name" style="color:${nearest.dataset.color}">${nearest.dataset.name} (${nearest.dataset.year})</div>
          <div class="tooltip-values">m<sub>χ</sub> = ${xFormatted}<br>${axes.y.label.split('(')[0].trim()} = ${yFormatted}</div>
          <div class="tooltip-ref">${nearest.dataset.reference}</div>
        `).style('left', `${event.offsetX + 15}px`).style('top', `${event.offsetY - 10}px`);
      } else {
        tooltip.style('opacity', 0);
      }
    });

    overlay.on('mouseleave', () => {
      tooltip.style('opacity', 0);
      crosshairV.style('opacity', 0);
      crosshairH.style('opacity', 0);
      coordReadout.style.opacity = '0';
    });

    // Clear highlight on background click
    overlay.on('click', () => dispatch('CLEAR_HIGHLIGHT'));

    // ─── Toolbar actions ───
    toolbar.querySelectorAll('.chart-tool-btn').forEach(btn => {
      btn.onclick = () => {
        const action = btn.dataset.action;
        if (action === 'reset') {
          currentTransform = d3.zoomIdentity;
          svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
        } else if (action === 'zoomIn') {
          svg.transition().duration(300).call(zoom.scaleBy, 1.5);
        } else if (action === 'zoomOut') {
          svg.transition().duration(300).call(zoom.scaleBy, 0.67);
        }
      };
    });

    // Double-click to reset
    svg.on('dblclick.zoom', () => {
      currentTransform = d3.zoomIdentity;
      svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
    });
  }

  // ─── Store subscriptions ───
  const unsubs = [subscribe('experiments', () => render())];

  // ─── ResponsiveObserver ───
  const ro = new ResizeObserver(() => render());
  ro.observe(container);

  render();

  return {
    destroy() { unsubs.forEach(u => u()); ro.disconnect(); container.innerHTML = ''; },
    update() { render(); }
  };
}

// ─── Helper ───
function toSuperscriptStr(n) {
  const map = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻' };
  return String(n).replace(/[0-9\-]/g, ch => map[ch] || ch);
}
