import { auth } from './firebase-config.js';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Global Navigation Auth State Logic
const updateNav = (user) => {
  const loginLink = document.querySelector('[data-auth="login"]');
  const dashLink = document.querySelector('[data-auth="dashboard"]');
  const logoutBtn = document.querySelector('[data-auth="logout"]');

  if (user) {
    if(loginLink) loginLink.style.display = 'none';
    if(dashLink) dashLink.style.display = 'block';
    if(logoutBtn) logoutBtn.style.display = 'block';
  } else {
    if(loginLink) loginLink.style.display = 'block';
    if(dashLink) dashLink.style.display = 'none';
    if(logoutBtn) logoutBtn.style.display = 'none';
  }
};

// Route Guards & State Observer
onAuthStateChanged(auth, (user) => {
  updateNav(user);
  
  const path = window.location.pathname;
  
  // Protect Dashboard
  if (path.includes('dashboard.html') && !user) {
    window.location.href = 'login.html';
  }
  
  // Redirect logged in users away from login
  if (path.includes('login.html') && user) {
    window.location.href = 'dashboard.html';
  }
});

// Expose Auth Methods to Window for inline onclick usage
window.loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    // Navigation to dashboard handled by onAuthStateChanged
  } catch (error) {
    console.error("Login failed", error);
  }
};

window.logoutUser = async () => {
  try {
    await signOut(auth);
    window.location.href = 'index.html';
  } catch (error) {
    console.error("Logout failed", error);
  }
};

// Global Page Transitions & Hamburger Nav
document.querySelector('.hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// Add smooth transitions for generic links omitted for brevity but standard implementations apply.