// Parallax Hero
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scroll = window.scrollY;
  // Moves at 0.4x speed (40%)
  heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
});

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

// Number Counters
const counters = document.querySelectorAll('.counter-val');
let counted = false;
const counterObserver = new IntersectionObserver((entries) => {
  if(entries[0].isIntersecting && !counted) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      const update = () => {
        current += increment;
        if(current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target + (counter.hasAttribute('data-plus') ? '+' : '');
        }
      };
      update();
    });
    counted = true;
  }
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) counterObserver.observe(statsSection);

// Fire Particle Effect (Canvas)
const canvas = document.getElementById('fire-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = canvas.parentElement.clientHeight * 0.6;
  
  let particles = [];
  for(let i=0; i<50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: Math.random() - 0.5,
      dy: Math.random() * -2 - 1
    });
  }
  
  function animateFire() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 69, 0, 0.6)';
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if(p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(animateFire);
  }
  animateFire();
}