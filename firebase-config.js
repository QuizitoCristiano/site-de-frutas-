// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzoYBmdTZtVjAtjjGFbblHMaV6M7cG3zA",
  authDomain: "delicacty-site.firebaseapp.com",
  databaseURL: "https://delicacty-site-default-rtdb.firebaseio.com",
  projectId: "delicacty-site",
  storageBucket: "delicacty-site.appspot.com",
  messagingSenderId: "429040390010",
  appId: "1:429040390010:web:c8e89f91f5789a14edd0c3",
  measurementId: "G-H48QV0BQZ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
