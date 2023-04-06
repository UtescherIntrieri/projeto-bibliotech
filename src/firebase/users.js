import {
    getDocs,
} from "firebase/firestore";
import { usersCollection } from "./collections";


export async function getUser() {
  const snapshot = await getDocs(usersCollection);
  let user = [];
  snapshot.forEach((doc) => {
    user.push({ ...doc.data(), id: doc.id });
  });
  return user;
}

export async function uploadURL(imagem) {
  const filename = imagem.name;
  const imageRef = ref(storage, `photo/${filename}`);
  const result = await uploadBytes(imageRef, imagem);
  return await getDownloadURL(result.ref);
}