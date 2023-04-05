import {
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { livrosCollection } from "./collections";
import { autoresCollection } from "./collections";
import { storage } from "./config"

export async function addLivro(data) {
    await addDoc(livrosCollection, data);
}
export async function addAutor(data) {
    await addDoc(autoresCollection, data);
}

export async function getLivros() {
    const snapshot = await getDocs(livrosCollection);
    let livros = [];
    snapshot.forEach(doc => {
        livros.push({...doc.data(), id: doc.id});
    })
    return livros;
}
export async function getAutores() {
    const snapshot = await getDocs(autoresCollection);
    let autores = [];
    snapshot.forEach(doc => {
        autores.push({...doc.data(), id: doc.id});
    })
    return autores;
}
export async function getLivro(id) {
    const document = await getDoc(doc(livrosCollection, id));
    return {...document.data(), id: document.id};
}
export async function getAutor(id) {
    const document = await getDoc(doc(autoresCollection, id));
    return {...document.data(), id: document.id};
}

export async function updateLivro(id, data) {
    await updateDoc(doc(livrosCollection, id), data);
}

export async function deleteLivro(id) {
    await deleteDoc(doc(livrosCollection, id));
}

export async function uploadCapaLivro(imagem) {
    const filename = imagem.name;
    const imageRef = ref(storage, `livros/${filename}`);
    const result = await uploadBytes(imageRef, imagem);
    return await getDownloadURL(result.ref);
}