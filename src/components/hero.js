/**
 * Hero section with animated particle background.
 */

export function initHero(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <canvas id="hero-canvas"></canvas>
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="hero-accent">Dark Matter</span>
        <br>Limits Explorer
      </h1>
      <p class="hero-subtitle">
        Aggregating exclusion limits from the world's leading experiments.
        <br>Compare results across direct, indirect, and collider searches.
      </p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-value">14</span>
          <span class="stat-label">Experiments</span>
        </div>
        <div class="stat">
          <span class="stat-value">4</span>
          <span class="stat-label">Plot Types</span>
        </div>
        <div class="stat">
          <span class="stat-value">2026</span>
          <span class="stat-label">Updated</span>
        </div>
      </div>
      <button id="hero-cta" class="hero-cta">Explore Limits ↓</button>
    </div>
  `;

  initParticleAnimation();

  document.getElementById('hero-cta')?.addEventListener('click', () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  });
}

function initParticleAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animId;
  const particles = [];
  const PARTICLE_COUNT = 80;

  // Read theme-aware colors from CSS custom properties
  function getThemeColors() {
    const style = getComputedStyle(document.documentElement);
    return {
      hueA: parseInt(style.getPropertyValue('--particle-hue-a')) || 210,
      hueB: parseInt(style.getPropertyValue('--particle-hue-b')) || 260,
      lineColor: style.getPropertyValue('--particle-line').trim() || 'rgba(100, 180, 255, 0.08)',
    };
  }

  let themeColors = getThemeColors();

  function resize() {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? themeColors.hueA : themeColors.hueB,
    };
  }

  function init() {
    resize();
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = 0.08 * (1 - dist / 120);
          ctx.beginPath();
          ctx.strokeStyle = themeColors.lineColor.replace(/[\d.]+\)$/, `${alpha})`);
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha})`;
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  init();
  draw();

  window.addEventListener('resize', () => {
    resize();
  });

  // Re-read colors when theme changes
  window.addEventListener('themechange', () => {
    themeColors = getThemeColors();
    particles.forEach(p => {
      p.hue = Math.random() > 0.5 ? themeColors.hueA : themeColors.hueB;
    });
  });
}
