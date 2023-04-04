import { db } from "./config";
import { collection } from "firebase/firestore";

export const livrosCollection = collection(db, "livros");
export const emprestimosCollection = collection(db, "emprestimos");
export const usersCollection = collection(db, "usuarios")
export const autoresCollection = collection(db, "autores");