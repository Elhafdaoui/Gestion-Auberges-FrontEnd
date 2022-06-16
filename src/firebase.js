import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDO0b7m3OptiUKmuQzawYq9H7rlkvjSeRU",
  authDomain: "auberge-c0603.firebaseapp.com",
  projectId: "auberge-c0603",
  storageBucket: "auberge-c0603.appspot.com",
  messagingSenderId: "216735387153",
  appId: "1:216735387153:web:b5c20aaeb4fe7bb2306bb0"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)