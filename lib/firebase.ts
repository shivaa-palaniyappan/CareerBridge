// Firebase configuration and initialization
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBIt_DBt76jEvp_kDDT0lVexqqc3MNFhxs",
  authDomain: "careerbridge-84397.firebaseapp.com",
  projectId: "careerbridge-84397",
  storageBucket: "careerbridge-84397.firebasestorage.app",
  messagingSenderId: "540914856503",
  appId: "1:540914856503:web:2da61e0539c4af90af05b2",
  measurementId: "G-H83KY5JTBE",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null

export default app
