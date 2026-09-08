// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCARWKhJe7IPA0kSVZaYgYn6ztjNdrgUuc",
//   authDomain: "smart-farmer-assistant-e5e78.firebaseapp.com",
//   projectId: "smart-farmer-assistant-e5e78",
//   storageBucket: "smart-farmer-assistant-e5e78.firebasestorage.app",
//   messagingSenderId: "990556361869",
//   appId: "1:990556361869:web:613bc91cae8879553cfec4",
//   measurementId: "G-G35MVDGZV5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);

// export default app;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCARWKhJe7IPA0kSVZaYgYn6ztjNdrgUuc",
  authDomain: "smart-farmer-assistant-e5e78.firebaseapp.com",
  projectId: "smart-farmer-assistant-e5e78",
  storageBucket: "smart-farmer-assistant-e5e78.firebasestorage.app",
  messagingSenderId: "990556361869",
  appId: "1:990556361869:web:613bc91cae8879553cfec4",
  measurementId: "G-G35MVDGZV5",
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

export default app;

