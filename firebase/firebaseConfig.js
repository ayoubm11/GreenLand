// Import des fonctions Firebase nécessaires
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // <-- Ajout de getAuth
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDiep_lAhy5pjIm8jpY9oDwZyTPzi-4eAk",
  authDomain: "greenland-b6c0c.firebaseapp.com",
  projectId: "greenland-b6c0c",
  storageBucket: "greenland-b6c0c.firebasestorage.app",
  messagingSenderId: "569973363822",
  appId: "1:569973363822:web:6613371a402a74b4dd027f",
  measurementId: "G-RWB1WVFB8Z"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Initialisation Auth Firebase
const auth = getAuth(app);

// Initialisation conditionnelle Analytics (optionnel)
let analytics;
(async () => {
  if (await isSupported()) {
    analytics = getAnalytics(app);
  }
})();

// Export pour utilisation dans l'application
export { auth, analytics };
