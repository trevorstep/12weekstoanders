# 12 Weeks to Anders

A mobile-first, multi-page fitness web application parodying workout programs, while delivering legitimately useful glute-focused training.

## Firebase Setup Instructions

This project uses Firebase for Authentication, Firestore (database), and Hosting.

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called "12-weeks-to-anders"
3. Enable **Authentication** > **Google Sign-In**
4. Create a **Firestore database** in production mode
5. Go to Project Settings > Your Apps > Add Web App
6. Copy your config object and update `js/firebase-config.js` with your API keys.

### Firestore Security Rules
Paste the following into your Firebase Console > Firestore > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Local Development

Since this app uses ES modules for Firebase, you need to serve it over a local web server (e.g., using VS Code Live Server, Python's `http.server`, or Node's `serve`). Opening the HTML files directly via `file://` will block the module imports due to CORS.

### Deployment

1. Run `firebase login`
2. Run `firebase init hosting` (Select your project, set public directory to the root `.` or structure accordingly, don't overwrite existing HTML)
3. Run `firebase deploy`
