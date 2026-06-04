'use strict';

/* ─── 1. CUSTOM CURSOR ─────────────────────────────────────────────────────── */
(function () {
  const ring = document.getElementById('cursor');
  const dot  = document.getElementById('cursor-dot');
  if (!ring || !dot) return;

  let mx = -100, my = -100, cx = -100, cy = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function loop() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    ring.style.left = cx + 'px';
    ring.style.top  = cy + 'px';
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width       = '60px';
      ring.style.height      = '60px';
      ring.style.borderColor = 'var(--petal)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width       = '36px';
      ring.style.height      = '36px';
      ring.style.borderColor = 'var(--sage)';
    });
  });
})();

/* ─── 2. BACKGROUND PARTICLES ──────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function P() { this.reset(); }
  P.prototype.reset = function () {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.r     = Math.random() * 1.8 + 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.speed = Math.random() * 0.4 + 0.1;
    this.angle = Math.random() * Math.PI * 2;
    this.drift = (Math.random() - 0.5) * 0.01;
    const r = Math.random();
    this.colour = r < 0.6 ? '88,129,87' : r < 0.9 ? '163,177,138' : '212,169,106';
  };
  P.prototype.update = function () {
    this.angle += this.drift;
    this.x += Math.cos(this.angle) * this.speed;
    this.y -= this.speed * 0.6;
    if (this.y < -10) { this.reset(); this.y = H + 10; }
  };
  P.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.colour},${this.alpha})`;
    ctx.fill();
  };

  function init() { resize(); particles = Array.from({ length: 120 }, () => new P()); }
  function loop() { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(loop); }

  window.addEventListener('resize', resize);
  init();
  loop();
})();

/* ─── 3. LEAF PARALLAX ─────────────────────────────────────────────────────── */
(function () {
  const p = document.getElementById('leaf-panel');
  if (!p) return;
  window.addEventListener('scroll', () => {
    p.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.25}px))`;
  }, { passive: true });
})();

/* ─── 4. TYPEWRITER ────────────────────────────────────────────────────────── */
(function () {
  const el = document.getElementById('typewriter-target');
  if (!el) return;
  const phrases = [
    'Keeping Belgium Campus beautiful, every day.',
    'Where dedication meets the outdoors.',
    'A clean space makes people feel welcome.',
    'Rooted in care, grown with consistency.'
  ];
  let pI = 0, cI = 0, del = false;
  function tick() {
    const cur = phrases[pI];
    if (!del) {
      el.textContent = cur.slice(0, ++cI);
      if (cI === cur.length) { del = true; setTimeout(tick, 2200); return; }
    } else {
      el.textContent = cur.slice(0, --cI);
      if (cI === 0) { del = false; pI = (pI + 1) % phrases.length; setTimeout(tick, 500); return; }
    }
    setTimeout(tick, del ? 30 : 55);
  }
  setTimeout(tick, 1600);
})();

/* ─── 5. STAT COUNTERS ─────────────────────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;
  function eOut(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function animate(el) {
    const target = parseInt(el.dataset.target, 10), st = performance.now();
    (function u(now) {
      const p = Math.min((now - st) / 1800, 1);
      el.textContent = Math.round(eOut(p) * target);
      if (p < 1) requestAnimationFrame(u);
    })(performance.now());
  }
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { counters.forEach(animate); obs.disconnect(); }
  }), { threshold: 0.3 });
  const s = document.getElementById('stats');
  if (s) obs.observe(s);
})();

/* ─── 6. FUN FACTS (flip cards) ────────────────────────────────────────────── */
(function () {
  const ring = document.getElementById('cursor');
  document.querySelectorAll('.fact-card').forEach(card => {
    card.querySelector('.fact-back').textContent = card.dataset.fact;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    card.addEventListener('mouseenter', () => { if (ring) { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'var(--petal)'; } });
    card.addEventListener('mouseleave', () => { if (ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--sage)'; } });
  });
})();

/* ─── 7. CAREER MILESTONES (scroll reveal) ─────────────────────────────────── */
(function () {
  const ms = document.querySelectorAll('.milestone');
  if (!ms.length) return;
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  }), { threshold: 0.25 });
  ms.forEach(m => obs.observe(m));
})();

/* ─── 8. QUOTE CAROUSEL ────────────────────────────────────────────────────── */
(function () {
  const slides   = document.querySelectorAll('.quote-slide');
  const dotsWrap = document.getElementById('q-dots');
  const btnP     = document.getElementById('q-prev');
  const btnN     = document.getElementById('q-next');
  if (!slides.length || !dotsWrap) return;

  let cur = 0, timer = null;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'q-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Quote ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function dots() { return dotsWrap.querySelectorAll('.q-dot'); }

  function goTo(idx, dir) {
    const ds = dots(), prev = cur;
    cur = (idx + slides.length) % slides.length;
    const isN = dir !== 'prev';
    slides[prev].classList.remove('active');
    slides[prev].classList.add(isN ? 'exit-left' : 'exit-right');
    ds[prev].classList.remove('active');
    setTimeout(() => slides[prev].classList.remove('exit-left', 'exit-right'), 600);
    slides[cur].style.transform = isN ? 'translateX(40px)' : 'translateX(-40px)';
    slides[cur].classList.add('active');
    ds[cur].classList.add('active');
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  function next() { goTo(cur + 1, 'next'); }
  function prev() { goTo(cur - 1, 'prev'); }

  if (btnN) btnN.addEventListener('click', next);
  if (btnP) btnP.addEventListener('click', prev);
  document.addEventListener('keydown', e => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); });

  timer = setInterval(next, 5000);
})();

/* ─── 9. SIDEBAR ───────────────────────────────────────────────────────────── */
(function () {
  const sb  = document.getElementById('sidebar');
  const tg  = document.getElementById('sidebar-toggle');
  const ov  = document.getElementById('sidebar-overlay');
  const links    = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('section[id]');
  const ring = document.getElementById('cursor');
  if (!sb || !tg) return;

  function open()  { sb.classList.add('open'); ov.classList.add('visible'); tg.setAttribute('aria-expanded', 'true');  tg.classList.add('is-open'); }
  function close() { sb.classList.remove('open'); ov.classList.remove('visible'); tg.setAttribute('aria-expanded', 'false'); tg.classList.remove('is-open'); }

  tg.addEventListener('click', () => sb.classList.contains('open') ? close() : open());
  if (ov) ov.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  links.forEach(l => {
    l.addEventListener('click', e => {
      const h = l.getAttribute('href');
      if (h.startsWith('#')) {
        e.preventDefault();
        const t = document.getElementById(h.slice(1));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      close();
    });
  });

  const actLink = id => links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) actLink(e.target.id); }), { threshold: 0.35 });
  sections.forEach(s => obs.observe(s));

  if (ring) {
    [tg, ...sb.querySelectorAll('a')].forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = 'var(--petal)'; });
      el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--sage)'; });
    });
  }
})();

/* ─── 10. ANIMATE ON SCROLL (generic) ─────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
  }), { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
})();

/* ─── 11. FLIP CARDS (generic) ─────────────────────────────────────────────── */
(function () {
  const ring = document.getElementById('cursor');
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click',   () => card.classList.toggle('flipped'));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); } });
    if (ring) {
      card.addEventListener('mouseenter', () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'var(--petal)'; });
      card.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--sage)'; });
    }
  });
})();
