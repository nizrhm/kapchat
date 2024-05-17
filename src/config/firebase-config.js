import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqG72fkVTMUTdHLiU_ixQl1wSStUsMMRQ",
  authDomain: "temptalk-f644b.firebaseapp.com",
  projectId: "temptalk-f644b",
  storageBucket: "temptalk-f644b.appspot.com",
  messagingSenderId: "566094356953",
  appId: "1:566094356953:web:466e7506e4a1a30cfc39c8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);