//primero instalamos las dependencias con npm install firebase
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwn8UN2ILeml_NHvnv3NAKdm7MwdJ4aNM",
  authDomain: "proyecto2-6ccb5.firebaseapp.com",
  projectId: "proyecto2-6ccb5",
  storageBucket: "proyecto2-6ccb5.firebasestorage.app",
  messagingSenderId: "87561033268",
  appId: "1:87561033268:web:89440ba7e0382160c15c61"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);