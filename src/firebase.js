import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDi2Ks-EYARLIU5T68uHhY3GQf8wPJGFo8",
  authDomain: "image-upload-ce423.firebaseapp.com",
  projectId: "image-upload-ce423",
  storageBucket: "image-upload-ce423.appspot.com",
  messagingSenderId: "622562321908",
  appId: "1:622562321908:web:2a0ce71fe594742ef285a1",
  measurementId: "G-86ZBP2FKDN"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);