import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq5fmzYi0Rc4QO4gbWDexxsQaFqNmy9uc",
  authDomain: "finalproject-8a79b.firebaseapp.com",
  projectId: "finalproject-8a79b",
  storageBucket: "finalproject-8a79b.appspot.com",
  messagingSenderId: "117775363441",
  appId: "1:117775363441:web:4ef67f1a38d950a0069ad0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
