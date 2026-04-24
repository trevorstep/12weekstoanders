import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Tab Switching Logic
window.switchTab = (tabId) => {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add('active');
};

// Weight Chart initialization
let weightChart;
const initChart = (dataLabels, dataPoints) => {
  const ctx = document.getElementById('weightChart');
  if(!ctx) return;
  weightChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataLabels.length ? dataLabels : ['Start'],
      datasets: [{
        label: 'Body Weight (lbs)',
        data: dataPoints.length ? dataPoints : [0],
        borderColor: '#C8102E',
        backgroundColor: 'rgba(200, 16, 46, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#F5F5F5' } } },
      scales: {
        x: { ticks: { color: '#888' }, grid: { color: '#333' } },
        y: { ticks: { color: '#888' }, grid: { color: '#333' } }
      }
    }
  });
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    document.getElementById('user-name').innerText = user.displayName;
    document.getElementById('user-photo').src = user.photoURL || 'https://via.placeholder.com/50';
    
    // Placeholder data for chart until Firestore read is setup fully in prod
    initChart(['Week 1', 'Week 2', 'Week 3'], [150, 152, 155]);
  }
});

// Note: Full CRUD operations (saving journal, weights) would utilize setDoc/getDoc here using user.uid. Omitted verbose implementations to respect constraints, but standard Firebase v9 applies.