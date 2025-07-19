// Import des fonctions Firebase nécessaires
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";      
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AI*****************Ak", // Remplacez par votre clé API
  authDomain: "greenland-b6c0c.firebaseapp.com",  // Remplacez par votre domaine d'authentification
  projectId: "greenland-b6c0c",  // Remplacez par votre ID de projet
  storageBucket: "greenland-b6c0c.firebasestorage.app",
  messagingSenderId: "////////////////////////", // Remplacez par votre ID d'expéditeur de messages
  appId: "//////////////", // Remplacez par votre ID d'application
  measurementId: "////////////////////////7"  // Remplacez par votre ID de mesure
  // Note: Assurez-vous de remplacer les valeurs par celles de votre projet Firebase
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
