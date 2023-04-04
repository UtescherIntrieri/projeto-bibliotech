import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  reauthenticateWithCredential,
  signOut,
  getAuth,
  deleteUser,
  EmailAuthProvider,
  updatePassword,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { auth } from "./config";

// Função assíncrona = que o resultado não é obtido de imediato
// Haverá "espera"
export async function cadastrarEmailSenha(email, senha) {
  // Indicar para o firebase que queremos cadastrar
  // um novo usuário utilizando email/senha
  console.log(email, senha);
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

export async function editarSenha(senhaAtual, novaSenha) {
  try {
    const user = getAuth().currentUser;
    if (!user) {
      throw new Error("User not found.");
    }
    const credential = EmailAuthProvider.credential(user.email, senhaAtual);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, novaSenha);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deletarUsuario(user) {
  try {
    await deleteUser(user);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateUser(data) {
  try {
    updateProfile(auth.currentUser, data);
  } catch (e) {}
}

export async function updateCurrentEmail(data) {
  try {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      data.currentPassword
    );
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, data.email);
  } catch (e) {
    console.error(e);
  }
}

export async function sendEmailVerification(email) {
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (e) {
    console.error(e);
  }
}

export async function updateCurrentPassword(data) {
  try {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      data.currentPassword
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, data.newPassword);
  } catch (e) {
    console.error(e);
  }
}

export async function sendPasswordResetEmail(email) {
  try {
    sendPasswordResetEmail(auth, email);
  } catch (e) {
    console.error(e);
  }
}
