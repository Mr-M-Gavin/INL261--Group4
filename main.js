/*
  ====================================================
  main.js — The Gardener Portfolio · Hero Behaviour

  Sections:
    1. Custom cursor
    2. Particle / firefly canvas
    3. SVG botanical draw-on animation
    4. Floating leaf panel
    5. Typewriter subtitle
    6. Counter animation (stats strip)
  ==================================================== */

  'use strict';

  /* ——————————————————————————————————————————————————
     1. CUSTOM CURSOR
     —————————————————————————————————————————————————— */
  (function initCursor() {
    const ring = document.getElementById('cursor');
    const dot  = document.getElementById('cursor-dot');
  
    let mx = -100, my = -100; // mouse position
    let cx = -100, cy = -100; // lagged ring position
  
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });
  
    /* Lag the ring slightly behind the dot for a fluid feel */
    (function animateCursor() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
  
      ring.style.left = cx + 'px';
      ring.style.top  = cy + 'px';
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
  
      requestAnimationFrame(animateCursor);
    })();
  
    /* Grow ring on interactive elements */
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width  = '60px';
        ring.style.height = '60px';
        ring.style.borderColor = 'var(--petal)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'var(--sage)';
      });
    });
  })();
  
  /* ——————————————————————————————————————————————————
     2. PARTICLE / FIREFLY CANVAS
     —————————————————————————————————————————————————— */
  (function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    const ctx    = canvas.getContext('2d');
    let W, H, particles;
  
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
  
    function Particle() {
      this.reset();
    }
  
    Particle.prototype.reset = function () {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.r     = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.speed = Math.random() * 0.4 + 0.1;
      this.angle = Math.random() * Math.PI * 2;
      this.drift = (Math.random() - 0.5) * 0.01;
      /* colour: mostly sage/fern, occasional petal gold */
      const roll = Math.random();
      if (roll < 0.6)       this.colour = '88, 129, 87';   // --sage
      else if (roll < 0.9)  this.colour = '163, 177, 138'; // --fern
      else                  this.colour = '212, 169, 106';  // --petal
    };
  
    Particle.prototype.update = function () {
      this.angle += this.drift;
      this.x     += Math.cos(this.angle) * this.speed;
      this.y     -= this.speed * 0.6; // gentle upward drift
      if (this.y < -10) this.reset(), this.y = H + 10;
    };
  
    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.colour}, ${this.alpha})`;
      ctx.fill();
    };
  
    function init() {
      resize();
      particles = Array.from({ length: 120 }, () => new Particle());
    }
  
    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(loop);
    }
  
    window.addEventListener('resize', resize);
    init();
    loop();
  })();
  
  /* ——————————————————————————————————————————————————
     3. SVG BOTANICAL DRAW-ON ANIMATION
        (CSS handles the stroke-dashoffset animation;
         this section adds a subtle parallax on scroll)
     —————————————————————————————————————————————————— */
  (function initBotanicalParallax() {
    const panel = document.getElementById('leaf-panel');
    if (!panel) return;
  
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || window.pageYOffset;
      panel.style.transform = `translateY(calc(-50% + ${scrollY * 0.25}px))`;
    }, { passive: true });
  })();
  
  /* ——————————————————————————————————————————————————
     4. FLOATING LEAF PANEL
        Adds a gentle continuous float after the
        draw-on animation completes (~2.5 s)
     —————————————————————————————————————————————————— */
  (function initFloatingLeaf() {
    const panel = document.getElementById('leaf-panel');
    if (!panel) return;
  
    let startTime = null;
    const AMPLITUDE = 10; // px
    const PERIOD    = 4000; // ms
  
    function float(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const offset  = Math.sin((elapsed / PERIOD) * Math.PI * 2) * AMPLITUDE;
      // keep the translateY(-50%) base so vertical centering holds
      panel.style.transform = `translateY(calc(-50% + ${offset}px))`;
      requestAnimationFrame(float);
    }
  
    // Wait for draw-on to finish before starting float
    setTimeout(() => requestAnimationFrame(float), 2600);
  })();
  
  /* ——————————————————————————————————————————————————
     5. TYPEWRITER SUBTITLE
     —————————————————————————————————————————————————— */
  (function initTypewriter() {
    const el = document.getElementById('typewriter-target');
    if (!el) return;
  
    const phrases = [
      'Crafting living spaces that breathe.',
      'Where nature meets intentional design.',
      'Every garden tells a story.',
      'Rooted in craft, grown with care.',
    ];
  
    let phraseIndex = 0;
    let charIndex   = 0;
    let deleting    = false;
    const TYPE_SPEED   = 55;
    const DELETE_SPEED = 30;
    const PAUSE_END    = 2200;
    const PAUSE_START  = 500;
  
    function tick() {
      const current = phrases[phraseIndex];
  
      if (!deleting) {
        el.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, PAUSE_END);
          return;
        }
      } else {
        el.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, PAUSE_START);
          return;
        }
      }
  
      setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
    }
  
    // Start after initial animations settle
    setTimeout(tick, 1600);
  })();
  
  /* ——————————————————————————————————————————————————
     6. COUNTER ANIMATION (stats strip)
     —————————————————————————————————————————————————— */
  (function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;
  
    const DURATION = 1800; // ms
  
    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
  
    function animateCounter(el) {
      const target    = parseInt(el.dataset.target, 10);
      const startTime = performance.now();
  
      function update(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const value    = Math.round(easeOutExpo(progress) * target);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(update);
      }
  
      requestAnimationFrame(update);
    }
  
    /* Trigger when stats section enters the viewport */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(animateCounter);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
  
    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
  })();
  
  /* ——————————————————————————————————————————————————
     7. FUN FACTS — flip reveal
     —————————————————————————————————————————————————— */
  (function initFunFacts() {
    const cards = document.querySelectorAll('.fact-card');
    if (!cards.length) return;
  
    cards.forEach(card => {
      const back = card.querySelector('.fact-back');
      back.textContent = card.dataset.fact;
  
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
  
      /* Grow the cursor ring on hover */
      const ring = document.getElementById('cursor');
      card.addEventListener('mouseenter', () => {
        if (ring) {
          ring.style.width  = '60px';
          ring.style.height = '60px';
          ring.style.borderColor = 'var(--petal)';
        }
      });
      card.addEventListener('mouseleave', () => {
        if (ring) {
          ring.style.width  = '36px';
          ring.style.height = '36px';
          ring.style.borderColor = 'var(--sage)';
        }
      });
    });
  })();
  
  /* ——————————————————————————————————————————————————
     8. CAREER CHART — scroll-triggered milestone reveal
     —————————————————————————————————————————————————— */
  (function initCareerChart() {
    const milestones = document.querySelectorAll('.milestone');
    if (!milestones.length) return;
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
  
    milestones.forEach(m => observer.observe(m));
  })();
  
  /* ——————————————————————————————————————————————————
     9. QUOTE WALL — carousel logic
     —————————————————————————————————————————————————— */
  (function initQuoteCarousel() {
    const slides    = document.querySelectorAll('.quote-slide');
    const dotsWrap  = document.getElementById('q-dots');
    const btnPrev   = document.getElementById('q-prev');
    const btnNext   = document.getElementById('q-next');
    if (!slides.length || !dotsWrap) return;
  
    let current   = 0;
    let autoTimer = null;
    const DELAY   = 5000; // ms between auto-advances
  
    /* Build dot indicators */
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'q-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to quote ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  
    function getDots() {
      return dotsWrap.querySelectorAll('.q-dot');
    }
  
    function goTo(index, direction) {
      const dots   = getDots();
      const prev   = current;
      current      = (index + slides.length) % slides.length;
      const isNext = direction !== 'prev';
  
      /* Animate out current */
      slides[prev].classList.remove('active');
      slides[prev].classList.add(isNext ? 'exit-left' : 'exit-right');
      dots[prev].classList.remove('active');
  
      setTimeout(() => {
        slides[prev].classList.remove('exit-left', 'exit-right');
      }, 600);
  
      /* Animate in next */
      slides[current].style.transform = isNext ? 'translateX(40px)' : 'translateX(-40px)';
      slides[current].classList.add('active');
      dots[current].classList.add('active');
  
      resetAuto();
    }
  
    function next() { goTo(current + 1, 'next'); }
    function prev() { goTo(current - 1, 'prev'); }
  
    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, DELAY);
    }
  
    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);
  
    /* Keyboard navigation when carousel is in view */
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    });
  
    /* Touch / swipe support */
    let touchStartX = 0;
    const carousel = document.getElementById('quote-carousel');
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    }, { passive: true });
  
    /* Cursor ring growth on buttons */
    const ring = document.getElementById('cursor');
    [btnPrev, btnNext].forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (ring) { ring.style.width='60px'; ring.style.height='60px'; ring.style.borderColor='var(--petal)'; }
      });
      btn.addEventListener('mouseleave', () => {
        if (ring) { ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='var(--sage)'; }
      });
    });
  
    resetAuto();
  })();
  
  /* ——————————————————————————————————————————————————
     10. EXPANDING SIDEBAR NAVIGATION
     —————————————————————————————————————————————————— */
  (function initSidebar() {
    const sidebar   = document.getElementById('sidebar');
    const toggle    = document.getElementById('sidebar-toggle');
    const overlay   = document.getElementById('sidebar-overlay');
    const links     = document.querySelectorAll('.sidebar-link');
    const sections  = document.querySelectorAll('section[id]');
    const ring      = document.getElementById('cursor');
    if (!sidebar || !toggle) return;
  
    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('visible');
      toggle.setAttribute('aria-expanded', 'true');
      /* Morph hamburger lines to X */
      toggle.classList.add('is-open');
    }
  
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('is-open');
    }
  
    /* ── Toggle open / close ── */
    toggle.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  
    /* Close on overlay click */
    overlay.addEventListener('click', closeSidebar);
  
    /* Close sidebar when clicking a nav link */
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target   = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        closeSidebar();
      });
    });
  
    /* Close on Escape key */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSidebar();
    });
  
    /* ── Active link tracking via IntersectionObserver ── */
    const activateLink = id => {
      links.forEach(l => {
        l.classList.toggle('active', l.dataset.section === id);
      });
    };
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activateLink(entry.target.id);
      });
    }, { threshold: 0.35 });
  
    sections.forEach(s => observer.observe(s));
  
    /* ── Cursor ring grows on toggle and sidebar links ── */
    [toggle, ...sidebar.querySelectorAll('a')].forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (ring) {
          ring.style.width = '52px';
          ring.style.height = '52px';
          ring.style.borderColor = 'var(--petal)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (ring) {
          ring.style.width = '36px';
          ring.style.height = '36px';
          ring.style.borderColor = 'var(--sage)';
        }
      });
    });
  })();
  
  /* ——————————————————————————————————————————————————
     11. FLOATING SECTION HEADINGS
     —————————————————————————————————————————————————— */
  (function initFloatingHeadings() {
    const headers = document.querySelectorAll('.section-header');
    if (!headers.length) return;
  
    /* Re-trigger float-in animation each time a header
       becomes sticky (i.e. its section enters the viewport) */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const header = entry.target.querySelector('.section-header');
        if (!header) return;
        if (entry.isIntersecting) {
          /* Remove and re-add class to replay animation */
          header.classList.remove('float-in');
          void header.offsetWidth; // force reflow
          header.classList.add('float-in');
        }
      });
    }, { threshold: 0.05 });
  
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
  })();
  
  /* ——————————————————————————————————————————————————
     12. ANIMATE ON SCROLL (services & contact pages)
     —————————————————————————————————————————————————— */
  (function initAnimateOnScroll() {
    const els = document.querySelectorAll('.animate-on-scroll');
    if (!els.length) return;
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  
    els.forEach(el => observer.observe(el));
  })();
  
  /* ——————————————————————————————————————————————————
     13. SERVICES — flip cards (mobile tap toggle)
     —————————————————————————————————————————————————— */
  (function initFlipCards() {
    const cards = document.querySelectorAll('.flip-card');
    if (!cards.length) return;
  
    cards.forEach(card => {
      /* Tap / click toggles on mobile (hover handles desktop via CSS) */
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
  
      /* Keyboard support */
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('flipped');
        }
      });
  
      /* Cursor ring */
      const ring = document.getElementById('cursor');
      card.addEventListener('mouseenter', () => {
        if (ring) {
          ring.style.width = '60px';
          ring.style.height = '60px';
          ring.style.borderColor = 'var(--petal)';
        }
      });
      card.addEventListener('mouseleave', () => {
        if (ring) {
          ring.style.width = '36px';
          ring.style.height = '36px';
          ring.style.borderColor = 'var(--sage)';
        }
      });
    });
  })();
  
  /* ——————————————————————————————————————————————————
     14. CONTACT_1 — copy email button
     —————————————————————————————————————————————————— */
  (function initCopyEmail() {
    const btn = document.getElementById('copyEmailBtn');
    if (!btn) return;
  
    btn.addEventListener('click', () => {
      const email = 'grounds@belgiumcampus.ac.za';
      navigator.clipboard.writeText(email).then(() => {
        btn.textContent = '✅ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '📋 Copy Email';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        /* Fallback for older browsers */
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '✅ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '📋 Copy Email';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  })();
  
  /* ——————————————————————————————————————————————————
     15. CONTACT_1 — ripple CTA + form validation
     —————————————————————————————————————————————————— */
  (function initContactForm() {
    const sendBtn    = document.getElementById('sendBtn');
    const successBanner = document.getElementById('successBanner');
    if (!sendBtn) return;
  
    /* Ripple effect */
    sendBtn.addEventListener('click', function(e) {
      const rect   = sendBtn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      sendBtn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
  
      /* Validation */
      let valid = true;
  
      const name    = document.getElementById('visitorName');
      const email   = document.getElementById('visitorEmail');
      const type    = document.getElementById('messageType');
      const message = document.getElementById('visitorMessage');
  
      function markField(field, errorId, invalid) {
        const err = document.getElementById(errorId);
        field.classList.toggle('invalid', invalid);
        if (err) err.classList.toggle('visible', invalid);
        if (invalid) valid = false;
      }
  
      markField(name,    'nameError',    !name.value.trim());
      markField(email,   'emailError',   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
      markField(type,    'typeError',    !type.value);
      markField(message, 'messageError', !message.value.trim());
  
      if (valid && successBanner) {
        successBanner.classList.add('visible');
        sendBtn.disabled = true;
        sendBtn.textContent = '✅ Sent!';
      }
    });
  
    /* Clear validation on input */
    ['visitorName','visitorEmail','messageType','visitorMessage'].forEach(id => {
      const el  = document.getElementById(id);
      const err = document.getElementById(id.replace('visitor','').replace('message','message').toLowerCase() + 'Error');
      if (el) el.addEventListener('input', () => {
        el.classList.remove('invalid');
      });
    });
  })();
  
  /* ——————————————————————————————————————————————————
     16. CONTACT_1 — appreciate counter
     —————————————————————————————————————————————————— */
  (function initAppreciateCounter() {
    const btn   = document.getElementById('appreciateBtn');
    const count = document.getElementById('appreciateCount');
    if (!btn || !count) return;
  
    /* Persist count in sessionStorage so it survives page refreshes
       within the same session */
    let total = parseInt(sessionStorage.getItem('appreciateCount') || '0', 10);
    count.textContent = total;
  
    btn.addEventListener('click', () => {
      total++;
      count.textContent = total;
      sessionStorage.setItem('appreciateCount', total);
  
      /* Bump animation */
      count.classList.remove('bump');
      void count.offsetWidth;
      count.classList.add('bump');
      setTimeout(() => count.classList.remove('bump'), 350);
  
      /* Colour shift after 5 appreciations */
      if (total >= 5) {
        btn.style.borderColor = 'var(--petal)';
        btn.style.color = 'var(--petal)';
      }
    });
  })();