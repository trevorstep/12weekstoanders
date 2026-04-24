# 12 Weeks to Anders — AI Coding Prompt
### For use with GitHub Copilot (Codex) or Gemini in VS Code
---

## PROJECT OVERVIEW

Build a **mobile-first, multi-page fitness web application** called **"12 Weeks to Anders"** — a real glute-training program with parody-style humor. The tone is: *legitimately useful workout content, wrapped in funny, self-aware copy*. Think ESPN Body Issue meets a meme page. The subject of the program (Anders) is a real person and a friend; the humor is affectionate and over-the-top, not mean.

This is a **full frontend application** with Firebase Authentication (Google Sign-In), a tracker dashboard, and a rich, animated marketing landing page.

---

## TECH STACK

- **Framework**: Vanilla HTML + CSS + JavaScript (no frameworks unless you use a lightweight bundler like Vite). Keep it simple and deployable as static files.
- **Authentication**: Firebase v9+ (modular SDK) — Google Sign-In only
- **Database**: Firebase Firestore — for storing user weight logs, workout completions, and journal entries
- **Hosting target**: Firebase Hosting (structure accordingly)
- **Fonts**: Load from Google Fonts. Do NOT use Inter, Roboto, Arial, or system fonts. Use bold, characterful display fonts. Suggested pairing: `Bebas Neue` or `Black Han Sans` for headlines + `DM Sans` or `Epilogue` for body. Feel free to choose something even bolder.
- **Icons**: Use Lucide Icons (CDN) or inline SVGs
- **No jQuery. No Bootstrap.**

---

## COLOR PALETTE

Extracted from the provided advertisement image. Apply these strictly:

```
--color-primary:     #C8102E;   /* Bold red — main accent */
--color-dark:        #0A0A0A;   /* Near-black background */
--color-mid:         #1A1A1A;   /* Card/section backgrounds */
--color-white:       #F5F5F5;   /* Off-white text */
--color-red-dark:    #8B0000;   /* Deep red for gradients/overlays */
--color-fire:        #FF4500;   /* Fire orange — use sparingly for highlights */
--color-muted:       #888888;   /* Secondary text */
```

The site should feel **dark, bold, and dramatic** — like the ad. Heavy use of black/dark backgrounds. Red as the dominant accent. White for high-contrast text. Fire orange only as a rare pop.

---

## FILE STRUCTURE

```
/12-weeks-to-anders/
│
├── index.html              ← Landing page (public)
├── program.html            ← 12-Week Program detail page (public)
├── dashboard.html          ← Tracker/Journal (auth-required)
├── login.html              ← Login page
│
├── css/
│   ├── global.css          ← CSS variables, resets, typography, utility classes
│   ├── landing.css         ← Landing page specific styles
│   ├── program.css         ← Program page styles
│   └── dashboard.css       ← Dashboard styles
│
├── js/
│   ├── firebase-config.js  ← Firebase init (use placeholder config, document where to add keys)
│   ├── auth.js             ← Google Sign-In logic, session persistence, redirect guards
│   ├── landing.js          ← Animations, parallax, scroll effects for index.html
│   ├── program.js          ← Week accordion logic, exercise modal
│   └── dashboard.js        ← Weight logger, workout tracker, journal — Firestore CRUD
│
├── assets/
│   ├── logo.svg            ← Simple text-based logo (generate inline SVG)
│   └── icons/              ← Any custom SVG icons
│
└── firebase.json           ← Firebase Hosting config
```

---

## PAGE 1: `index.html` — Landing Page

This is the hero marketing page. It must be visually extraordinary. Every section should have motion.

### SECTION 1 — Hero

- **Full-viewport hero** with a dark red gradient overlay (no actual photo needed — use CSS gradient that evokes fire/smoke; dark black → deep red from bottom-left)
- Large distressed/textured headline: `"12 WEEKS TO"` in white, then `"ANDERS"` in massive bold red (use CSS `text-shadow` and a noise/distress filter via SVG filter or pseudo-elements to replicate the ad's grungy texture effect on the red text)
- Subheadline: `"Build Your Badonkadonk."` — bold, white, slightly smaller
- Body copy: `"You simply cannot shake what your mama gave you if you don't have anything to shake. This 12-week program is here to fix that. Science-backed. Anders-approved. Absolutely ridiculous."` 
- CTA button: `"START TODAY →"` — bold, white text on solid red background, no border-radius (sharp corners), hover effect: slides slightly right, drops shadow, scales up 1.03
- Animated **fire particle effect** at the bottom of the hero using CSS/canvas — subtle, looping upward sparks in orange/red. If canvas is too complex, use CSS keyframe animations on absolutely-positioned pseudo-elements.
- **Parallax**: hero background layer moves at 0.4x scroll speed vs content

### SECTION 2 — "What Is This?"

- Dark card on black background
- Left: bold stat counters that animate up on scroll (use IntersectionObserver):
  - `12` Weeks
  - `3` Days/Week
  - `36` Total Workouts
  - `∞` Badonkadonk Potential
- Right: paragraph text explaining the program in a fun tone. Example: *"Three days a week. Twelve weeks. Real exercises, real gains, and an embarrassing amount of motivation from a guy named Anders. Whether you're starting from flat or just want to upgrade what you've got — this program delivers."*
- On mobile: stack vertically, full width

### SECTION 3 — "Why Anders?" (About Section)

- Full-width dark red diagonal slash background separating this section
- Centered text layout
- Headline: `"Why is it called 12 Weeks to Anders?"`
- Body: *"Because Anders has, and we say this with love, an absolutely legendary posterior. Whether genetics, hard work, or divine intervention — we'll never know. What we DO know is that this program is dedicated to helping you achieve similar greatness. This is not a drill. This is glute science."*
- Include a placeholder image card (dark rectangle with a fire emoji 🔥 centered) where a photo could go — label it `<!-- Replace with Anders photo -->`
- Fade-in on scroll with a subtle upward translate animation

### SECTION 4 — Program Highlights

- 3-column grid (1-column on mobile) of bold feature cards
- Each card: dark background `#1A1A1A`, red top border (4px), icon (SVG or emoji), bold title, description
- Cards:
  1. 🍑 **Real Exercises** — "Squats, hip thrusts, Romanian deadlifts — the full arsenal. No nonsense."
  2. 📈 **Progressive Overload** — "Each week builds on the last. Your glutes will have no choice but to grow."
  3. 📓 **Built-In Tracker** — "Log your workouts, track your weight, and journal your feelings. We don't judge."
  4. 🔥 **Anders-Certified™** — "Verified by someone with a great butt. Qualifications don't get more legitimate."
  5. 📱 **Mobile First** — "Built for your phone. Do it in the gym, on the couch, or hiding in the bathroom."
  6. 💪 **3 Days/Week** — "Sustainable. Effective. Leaves 4 days for rest, recovery, and telling people you work out."
- Hover effect on cards: lift (translateY -6px), red border glow, slight background lighten

### SECTION 5 — Testimonials (Parody)

- Dark section, centered
- Headline: `"Hear From Our Students"`
- 3 testimonial cards, horizontally scrollable on mobile (CSS scroll snap):
  1. *"I've never felt so seen. My glutes have never been so activated. Anders changed my life."* — **Bryson T., Rexburg ID**
  2. *"I didn't believe in the program at first. Then I looked in the mirror. Now I believe."* — **Madison K., Somewhere USA**
  3. *"It's called 12 Weeks to Anders but honestly? I think I surpassed him."* — **Anonymous (coward)**
- Cards: dark bg, red quotation mark accent, italic body, bold attribution
- Cards animate in staggered (100ms delay each) on scroll

### SECTION 6 — CTA Banner

- Full-width red background section
- Large bold white text: `"YOU CAN DO THIS."`
- Subtext: `"Start the program. Track your progress. Build your legacy."`
- Button: `"GET STARTED →"` — white background, red text, hover: invert
- This section should have a subtle CSS animated background (e.g., slow diagonal gradient sweep)

### SECTION 7 — Footer

- Black background
- Logo left, nav links center (Home, Program, Login), legal right
- Text: `"© 2025 12 Weeks to Anders. No glutes were harmed in the making of this program."`
- Small: `"www.reallygreatsite.com"` (placeholder)

---

## PAGE 2: `program.html` — The 12-Week Program

This page shows the full structured workout program.

### Layout

- Sticky top navigation bar (same as landing, collapses to hamburger on mobile)
- Page hero: smaller version of landing hero, headline `"THE PROGRAM"`, sub: `"12 Weeks. 3 Days/Week. One Legendary Outcome."`

### Program Structure

Display 12 weeks as **accordion sections**. Each week is collapsed by default. Clicking a week expands it to show 3 workout days.

**Week structure:**
- **Weeks 1–4**: Foundation Phase — lighter weights, focus on mind-muscle connection
- **Weeks 5–8**: Build Phase — increase load, add volume
- **Weeks 9–12**: Peak Phase — max intensity, progressive overload push

**Each day contains 4–6 exercises. Use this real exercise data:**

#### DAY A (Monday — "The Throne Builder")
1. Barbell Hip Thrust — 4x10 (week 1-4), 4x8 (5-8), 5x6 (9-12)
2. Romanian Deadlift — 3x12 / 3x10 / 4x8
3. Sumo Squat — 3x12 / 3x10 / 4x8
4. Donkey Kick (cable or bodyweight) — 3x15 each side / same / 4x12
5. Glute Bridge Pulse — 3x20 / 3x20 / 4x20

#### DAY B (Wednesday — "The Sculptor")
1. Bulgarian Split Squat — 3x10 each / 3x10 / 4x8
2. Cable Kickback — 3x15 each / 3x12 / 4x12
3. Lateral Band Walk — 3x20 steps / same / 4x20
4. Goblet Squat — 3x12 / 3x10 / 4x10
5. Single-Leg Hip Thrust — 3x10 each / same / 4x10

#### DAY C (Friday — "The Finisher")
1. Leg Press (feet high) — 4x12 / 4x10 / 5x8
2. Step-Ups (weighted) — 3x10 each / same / 4x10
3. Curtsy Lunge — 3x12 each / same / 4x10
4. Seated Hip Abduction — 3x20 / same / 4x20
5. Glute Focused Back Extension — 3x15 / same / 4x12

**For each exercise card, show:**
- Exercise name (bold)
- Sets x Reps
- A short funny-but-informative description (e.g., Hip Thrust: *"The cornerstone of the Anders Method. If you're not hip thrusting, are you even trying?"*)
- A `"How to do it"` link/button that opens a modal with bullet-point form cues

**Each week accordion header shows:**
- Week number
- Phase name
- A short motivational/funny tagline (e.g., Week 1: *"The journey of a thousand squats begins with a single hip thrust."*)

**Progress bar** at top of page showing which week the logged-in user is on (pulls from Firestore if logged in, otherwise shows week 1)

---

## PAGE 3: `login.html` — Login Page

- Centered card layout on a dark background with the same red gradient as the hero
- Logo / site name at top
- Headline: `"Join the Movement."`
- Subtext: `"Sign in to track your progress, log workouts, and claim your rightful place among the glute elite."`
- Large Google Sign-In button (styled to match the site — dark bg, red border, white text with Google icon)
- On successful auth: redirect to `dashboard.html`
- If already logged in: auto-redirect to dashboard immediately (check in `auth.js`)
- Below button: small text: `"Your data is stored securely. Anders is watching. Proudly."` 

---

## PAGE 4: `dashboard.html` — Tracker & Journal (Auth-Required)

**Auth guard**: If user is not signed in, immediately redirect to `login.html`.

This page has **3 tabs** (or sections with smooth scroll/tab navigation):

### Tab 1 — Workout Tracker

- Displays current week and day based on when the user started (stored in Firestore as `startDate`)
- "Log Today's Workout" button — opens a checklist of today's exercises
- User checks off each exercise as complete
- On submit: saves to Firestore under `users/{uid}/workouts/{date}` with the list of completed exercises
- Below: **Workout history** — last 10 logged days shown as cards with date, day type (A/B/C), and completion checkmarks

### Tab 2 — Weight Tracker

- Input field: `"Log Today's Weight"` (number, lbs or kg toggle)
- Submit button saves to Firestore: `users/{uid}/weight/{date}`
- **Line chart** using Chart.js (CDN) showing weight over time — styled to match the site (dark bg, red line, white labels)
- Display: current weight, starting weight, total change (with a fun label like `"Glute Mass Acquired"` if positive)

### Tab 3 — Journal

- Textarea: `"How are you feeling today? What went well? What's your butt up to?"`
- Submit saves to Firestore: `users/{uid}/journal/{date}`
- Below: list of past journal entries — date header, entry text, subtle separator
- Entries are editable (click to edit, save on blur or button)

### Dashboard Header
- Shows user's display name and Google profile photo (from Firebase Auth)
- Shows which week they're on and a progress bar (e.g., Week 3 of 12)
- Sign out button (top right)

---

## GLOBAL NAVIGATION

Every page shares the same nav:

```
[LOGO: "12 Weeks to Anders"]   [Home] [Program] [Dashboard] [Login/Logout]
```

- On mobile: hamburger menu, slides in from right as a full-height dark overlay
- Active page highlighted in red
- If user is logged in: show "Dashboard" and "Sign Out"; hide "Login"
- If user is not logged in: show "Login"; hide "Dashboard"
- Nav is sticky/fixed on scroll with a blur backdrop (`backdrop-filter: blur(10px)`) and slight dark background
- Smooth scroll-to-top behavior when clicking logo

---

## ANIMATIONS & INTERACTIONS (REQUIRED — DO NOT SKIP)

Implement ALL of the following:

1. **Page load animation**: Staggered fade-in + translateY on hero text elements (0ms, 100ms, 200ms, 300ms delays)
2. **Parallax hero**: On scroll, hero background moves at 40% the speed of content (use `transform: translateY()` on the bg layer via scroll listener)
3. **IntersectionObserver scroll reveals**: All sections fade in + slide up when they enter the viewport. Use a reusable `reveal` class + observer in JS.
4. **Counter animation**: Stats in Section 2 count up from 0 to their target value when they enter the viewport
5. **Hover effects on all cards**: lift + glow (see Section 4 spec above)
6. **Fire particle effect** on hero (CSS or canvas — see Section 1)
7. **CTA button hover**: translateX(4px) + scale(1.03) + box-shadow red glow
8. **Smooth page transitions**: On internal link clicks, fade out the page (opacity 0, 200ms), then navigate
9. **Mobile hamburger**: Animate menu open/close with a slide + fade
10. **Accordion animation**: Week panels expand/collapse with a CSS max-height transition (not display:none toggle)
11. **Tab switching on dashboard**: Smooth crossfade between tab content panels
12. **Chart.js animations**: Enable built-in Chart.js animations for the weight graph

---

## FIREBASE SETUP INSTRUCTIONS (include as comments in `firebase-config.js`)

```javascript
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project called "12-weeks-to-anders"
// 3. Enable Authentication > Google Sign-In
// 4. Create a Firestore database in production mode
// 5. Go to Project Settings > Your Apps > Add Web App
// 6. Copy your config object and replace the placeholder below
// 7. Set Firestore rules to require auth (rules provided below)

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// FIRESTORE SECURITY RULES (paste into Firebase Console > Firestore > Rules):
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
*/
```

---

## MOBILE-FIRST REQUIREMENTS

- All layouts must be designed for 375px width first, then scaled up
- Use CSS Grid and Flexbox — no fixed pixel widths for containers
- Touch targets minimum 48x48px
- Font sizes: minimum 16px for body, 14px for captions
- No horizontal scroll at any viewport width
- Hamburger nav on screens < 768px
- Testimonial cards use CSS scroll-snap on mobile (horizontal scroll)
- Dashboard tabs should be full-width tap targets on mobile
- Inputs and buttons must be finger-friendly (padding: at minimum 12px 20px)
- Test layout at 375px, 414px, 768px, 1280px

---

## COPY / TONE GUIDELINES

- Funny but not mean. This is a parody of fitness culture, not of Anders personally.
- Use `"Anders-approved"`, `"Anders-certified"`, `"The Anders Method"` as recurring joke branding
- Capitalize `BADONKADONK` when used for emphasis
- Real exercise names, real sets/reps — no fake made-up exercises
- Motivational copy should be over-the-top but not cringe: think Ron Burgundy announcing a workout program
- Avoid profanity (keep it shareable/clean)
- Error states and empty states should also be funny (e.g., empty journal: *"Nothing here yet. Your glutes are waiting for your thoughts."*)

---

## DELIVERABLES CHECKLIST

The AI should produce ALL of the following — do not skip any file:

- [ ] `index.html` — full landing page with all 7 sections
- [ ] `program.html` — full 12-week accordion program
- [ ] `login.html` — Google Sign-In page
- [ ] `dashboard.html` — 3-tab tracker/journal
- [ ] `css/global.css` — variables, resets, typography, utilities
- [ ] `css/landing.css`
- [ ] `css/program.css`
- [ ] `css/dashboard.css`
- [ ] `js/firebase-config.js` — with setup comments
- [ ] `js/auth.js` — Google Sign-In, session persistence, route guards
- [ ] `js/landing.js` — parallax, counters, fire effect, scroll reveals
- [ ] `js/program.js` — accordions, modals, progress bar
- [ ] `js/dashboard.js` — Firestore CRUD for all 3 tracker tabs + Chart.js weight graph
- [ ] `firebase.json` — hosting config
- [ ] `README.md` — setup instructions for Firebase config

---

## REVIEW NOTES FOR CLAUDE (post-generation QA)

After the AI generates the code, paste it back to Claude with the message:
**"Please review this output against the 12 Weeks to Anders spec and flag anything missing, broken, or off-spec."**

Claude will check for:
- All pages and files present
- Firebase auth flow correct (Google Sign-In, redirect guards, session persistence)
- Firestore data structure matches spec (`users/{uid}/workouts`, `/weight`, `/journal`)
- All 12 animation/interaction requirements implemented
- Color palette matches (`#C8102E`, `#0A0A0A`, etc.)
- Mobile-first CSS (375px base, no horizontal overflow)
- All 3 workout days (A/B/C) with correct exercises and phase-appropriate rep ranges
- Chart.js weight graph present and styled
- Nav auth state (login/logout visibility) working
- Accordion expand/collapse animated
- All 7 landing page sections present
- Footer present with correct copy
- Funny copy in the right places, real exercise data everywhere else