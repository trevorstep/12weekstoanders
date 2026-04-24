// Real Exercise Data per spec
const programData = {
  days: {
    A: {
      title: "DAY A — The Throne Builder",
      exercises: [
        { name: "Barbell Hip Thrust", desc: "The cornerstone of the Anders Method. If you're not hip thrusting, are you even trying?", reps: ["4x10", "4x8", "5x6"] },
        { name: "Romanian Deadlift", desc: "Hinge at the hips. Stretch those hamstrings.", reps: ["3x12", "3x10", "4x8"] },
        { name: "Sumo Squat", desc: "Wide stance, deep stretch, big badonkadonk.", reps: ["3x12", "3x10", "4x8"] },
        { name: "Donkey Kick", desc: "Look silly, get serious results.", reps: ["3x15/side", "3x15/side", "4x12/side"] },
        { name: "Glute Bridge Pulse", desc: "Burn it out. No mercy.", reps: ["3x20", "3x20", "4x20"] }
      ]
    },
    B: {
      title: "DAY B — The Sculptor",
      exercises: [
        { name: "Bulgarian Split Squat", desc: "The exercise everyone loves to hate.", reps: ["3x10/side", "3x10/side", "4x8/side"] },
        { name: "Cable Kickback", desc: "Squeeze at the top.", reps: ["3x15/side", "3x12/side", "4x12/side"] },
        { name: "Lateral Band Walk", desc: "Walk like a crab, look like a god.", reps: ["3x20 steps", "3x20 steps", "4x20 steps"] },
        { name: "Goblet Squat", desc: "Keep that chest up.", reps: ["3x12", "3x10", "4x10"] },
        { name: "Single-Leg Hip Thrust", desc: "Isolate and dominate.", reps: ["3x10/side", "3x10/side", "4x10/side"] }
      ]
    },
    C: {
      title: "DAY C — The Finisher",
      exercises: [
        { name: "Leg Press (feet high)", desc: "High and wide for maximum glute engagement.", reps: ["4x12", "4x10", "5x8"] },
        { name: "Step-Ups (weighted)", desc: "Drive through the heel.", reps: ["3x10/side", "3x10/side", "4x10/side"] },
        { name: "Curtsy Lunge", desc: "Polite name, brutal burn.", reps: ["3x12/side", "3x12/side", "4x10/side"] },
        { name: "Seated Hip Abduction", desc: "Push against the machine.", reps: ["3x20", "3x20", "4x20"] },
        { name: "Glute Focused Back Ext.", desc: "Round the upper back, squeeze the glutes.", reps: ["3x15", "3x15", "4x12"] }
      ]
    }
  }
};

const container = document.getElementById('program-container');

for (let week = 1; week <= 12; week++) {
  let phaseIndex = week <= 4 ? 0 : week <= 8 ? 1 : 2;
  let phaseName = week <= 4 ? "Foundation Phase" : week <= 8 ? "Build Phase" : "Peak Phase";
  let tagline = week === 1 ? "The journey of a thousand squats begins with a single hip thrust." : `Keep pushing. Anders is watching (proudly).`;

  let html = `
    <div class="accordion-item reveal">
      <div class="accordion-header" onclick="toggleAccordion(this)">
        <span>WEEK ${week} — ${phaseName}</span>
        <i data-lucide="chevron-down"></i>
      </div>
      <div class="accordion-content">
        <div class="accordion-inner">
          <p class="text-muted mb-4"><em>"${tagline}"</em></p>
  `;

  ['A', 'B', 'C'].forEach(day => {
    html += `<div class="day-card"><h3 style="margin-bottom:15px; color:var(--color-primary);">${programData.days[day].title}</h3>`;
    programData.days[day].exercises.forEach(ex => {
      html += `
        <div class="exercise-item">
          <div>
            <strong>${ex.name}</strong>
            <p class="text-muted" style="font-size:0.9rem;">${ex.desc}</p>
          </div>
          <div style="text-align:right;">
            <span style="color:var(--color-fire); font-weight:bold;">${ex.reps[phaseIndex]}</span>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  });

  html += `</div></div></div>`;
  if(container) container.innerHTML += html;
}

if (window.lucide) window.lucide.createIcons();

// Scroll Reveal Observer (Makes .reveal elements fade in)
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

window.toggleAccordion = function(header) {
  const content = header.nextElementSibling;
  const allContents = document.querySelectorAll('.accordion-content');
  
  allContents.forEach(c => {
    if (c !== content) c.style.maxHeight = null;
  });

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}