// Smooth Navigation with Single-Page Anchor Scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link on load
    updateActiveNavLink();
    
    // Add smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update active nav link after scroll
                setTimeout(updateActiveNavLink, 300);
            }
        });
    });

// ============================================================
// ANIMATION 2 — Mouse-Following Skeletal Creature
// Usage: attach a <canvas id="canvas2"> to the page,
//        then call initCreature('canvas2')
// ============================================================

function initCreature(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  let W, H;

  // ── Config ─────────────────────────────────────────────────
  const SEGS     = 22;   // number of body segments
  const SEG_LEN  = 18;   // distance between joints (px)
  const MAX_RIB  = 28;   // longest rib length (near head)
  const MIN_RIB  = 4;    // shortest rib length (near tail)

  let mouse = { x: -999, y: -999 };

  // Build the chain of segments
  let segments = Array.from({ length: SEGS }, (_, i) => ({
    x: canvas.offsetWidth  / 2,
    y: canvas.offsetHeight / 2 + i * SEG_LEN,
  }));

  // ── Helpers ─────────────────────────────────────────────────
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  // Move the head toward mouse, then drag each segment behind it
  function updateChain() {
    // Head follows mouse
    const head = segments[0];
    const dx = mouse.x - head.x;
    const dy = mouse.y - head.y;
    head.x += dx * 0.12;
    head.y += dy * 0.12;

    // Each segment is pulled by the one ahead of it
    for (let i = 1; i < SEGS; i++) {
      const prev = segments[i - 1];
      const curr = segments[i];
      const angle = Math.atan2(curr.y - prev.y, curr.x - prev.x);
      curr.x = prev.x + Math.cos(angle) * SEG_LEN;
      curr.y = prev.y + Math.sin(angle) * SEG_LEN;
    }
  }

  function drawCreature() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 0.9;
    ctx.lineCap = 'round';

    // ── Spine ───────────────────────────────────────────────
    ctx.beginPath();
    ctx.moveTo(segments[0].x, segments[0].y);
    for (let i = 1; i < SEGS; i++) {
      ctx.lineTo(segments[i].x, segments[i].y);
    }
    ctx.stroke();

    // ── Ribs ────────────────────────────────────────────────
    for (let i = 1; i < SEGS - 1; i++) {
      const curr = segments[i];
      const next = segments[i + 1];

      // Angle perpendicular to the spine direction
      const spineAngle = Math.atan2(next.y - curr.y, next.x - curr.x);
      const perpAngle  = spineAngle + Math.PI / 2;

      // Rib length tapers from head to tail
      const t      = i / SEGS;                           // 0 = head, 1 = tail
      const ribLen = MAX_RIB + (MIN_RIB - MAX_RIB) * t;

      // Draw rib on each side
      for (const side of [-1, 1]) {
        const rx = curr.x + Math.cos(perpAngle) * ribLen * side;
        const ry = curr.y + Math.sin(perpAngle) * ribLen * side;
        ctx.beginPath();
        ctx.moveTo(curr.x, curr.y);
        ctx.lineTo(rx, ry);
        ctx.stroke();

        // Small "foot" at the rib tip (every other segment)
        if (i % 2 === 0) {
          const footLen = ribLen * 0.35;
          const footAngle = spineAngle - side * 0.6; // angled slightly forward
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(
            rx + Math.cos(footAngle) * footLen * side,
            ry + Math.sin(footAngle) * footLen * side
          );
          ctx.stroke();
        }
      }
    }

    // ── Head circle ─────────────────────────────────────────
    ctx.beginPath();
    ctx.arc(segments[0].x, segments[0].y, 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  function frame() {
    updateChain();
    drawCreature();
    requestAnimationFrame(frame);
  }

  // ── Events ──────────────────────────────────────────────────
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  }, { passive: false });

  window.addEventListener('resize', resize);
  resize();
  frame();
}

    // Add page fade-in animation
    addPageAnimation();
    
    // Set up scroll listener to update active nav link
    window.addEventListener('scroll', updateActiveNavLink);
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');
    
    let currentSection = 'hero';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 2;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Add fade-in animation to page content on load
function addPageAnimation() {
    const body = document.body;
    body.style.animation = 'fadeIn 0.8s ease-in';
}

// Handle logo click to go to home section
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            const heroSection = document.querySelector('#hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// Add hover effects to buttons and links
const buttons = document.querySelectorAll('.btn, .btn-link, .nav-menu a');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Smooth section reveal on scroll with staggered animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all flow sections
document.querySelectorAll('.flow-section, .competency-grid, .stack-grid, .contact-form').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});
