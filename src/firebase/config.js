import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuALliR7lGfSFD5yhNMpVKmgY06jaljfI",
  authDomain: "blibliotech-lx.firebaseapp.com",
  projectId: "blibliotech-lx",
  storageBucket: "blibliotech-lx.appspot.com",
  messagingSenderId: "746404950040",
  appId: "1:746404950040:web:6c16647c43b9e52696936d",
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);

