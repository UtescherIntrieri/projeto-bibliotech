import { db } from "./config";
import { collection } from "firebase/firestore";

export const livrosCollection = collection(db, "livros");
export const autoresCollection = collection(db, "autores");
export const emprestimosCollection = collection(db, "emprestimos");