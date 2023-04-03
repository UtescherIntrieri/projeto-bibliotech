import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./config";

// Função assíncrona = que o resultado não é obtido de imediato
// Haverá "espera"
export async function cadastrarEmailSenha(email, senha) {
  // Indicar para o firebase que queremos cadastrar
  // um novo usuário utilizando email/senha

  // Aguardando o resultado do Firebase
  const resultado = await createUserWithEmailAndPassword(auth, email, senha);

  return resultado.user;
}

export async function loginGoogle() {
  // Configurar como o login do google vai funcionar
  const provider = new GoogleAuthProvider();
  const resultado = await signInWithPopup(auth, provider);

  return resultado.user;
}

export async function loginFacebook() {
  // Configurar como o login do google vai funcionar
  const provider = new FacebookAuthProvider();
  const resultado = await signInWithPopup(auth, provider);

  return resultado.user;
}

export async function loginEmailSenha(email, senha) {
  // Vai realizar o login com uma conta de email já existente
  const resultado = await signInWithEmailAndPassword(auth, email, senha);

  return resultado.user;
}

export async function logout() {
  // Deslogar o usuário atual do firebase
  await signOut(auth);
}
