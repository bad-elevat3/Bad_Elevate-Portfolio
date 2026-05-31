// ── PARTICLE SYSTEM ──
(function() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const COLORS = ['rgba(124,109,250,', 'rgba(192,132,252,', 'rgba(232,201,122,'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1,
      dir: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.005,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 140 }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.dir += p.drift;
      p.x += Math.cos(p.dir) * p.speed;
      p.y += Math.sin(p.dir) * p.speed;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

// ── TYPEWRITER ──
(function() {
  const roles = [
    'Business Systems Analyst',
    'Bridging Business & Technology',
    'Junior Developer',
    'Data Analyst',
    'Problem Solver',
  ];
  let ri = 0, ci = 0, deleting = false;
  const el = document.getElementById('typewriter');

  function type() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 75);
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    }
  }
  setTimeout(type, 1200);
})();

// ── NAVBAR SCROLL ──
(function() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - window.innerHeight / 2) {
        current = s.id;
      }
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });

  links.forEach(l => {
    l.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(l.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

// ── SCROLL REVEAL ──
(function() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ── SMOOTH ANCHOR ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── CV SLIDE-IN PANEL ──
(function() {
  const viewBtn = document.getElementById('cv-view-btn');
  const closeBtn = document.getElementById('cv-close-btn');
  const overlay = document.getElementById('cv-overlay');
  const panel = document.getElementById('cv-panel');
  const iframe = document.getElementById('cv-iframe');
  let loaded = false;

  // Build the viewer URL — uses Google Docs Viewer for .docx rendering
  // When hosted (e.g. GitHub Pages), replace with your actual hosted URL
  function getCvViewerUrl() {
    const cvFileName = 'Junior_Ncube_Remote_CV-2.docx';
    // If hosted online, use Google Docs Viewer
    if (window.location.protocol === 'https:' || window.location.protocol === 'http:') {
      const baseUrl = window.location.href.replace(/\/[^\/]*$/, '/');
      return 'https://docs.google.com/gview?url=' + encodeURIComponent(baseUrl + cvFileName) + '&embedded=true';
    }
    // Fallback for local file:// protocol — just point to the file directly
    return cvFileName;
  }

  function openPanel() {
    if (!loaded) {
      iframe.src = getCvViewerUrl();
      loaded = true;
    }
    panel.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('cv-open');
  }

  function closePanel() {
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('cv-open');
  }

  if (viewBtn) {
    viewBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openPanel();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closePanel);
  }

  if (overlay) {
    overlay.addEventListener('click', closePanel);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panel.classList.contains('active')) {
      closePanel();
    }
  });
})();
