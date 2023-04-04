import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQAkemHIEzJ1JK-70dCaG4onHH10SmvRI",
  authDomain: "bibliotech-nai.firebaseapp.com",
  projectId: "bibliotech-nai",
  storageBucket: "bibliotech-nai.appspot.com",
  messagingSenderId: "650664067450",
  appId: "1:650664067450:web:4b57b17ebb1ac4396956c3",
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);