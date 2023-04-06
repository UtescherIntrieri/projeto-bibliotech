import React, { useState, useRef } from "react";
import { storage, auth } from "../../firebase/config";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./style.css";

export const UploadImage = (props) => {
  const [photoURL, setPhotoURL] = useState(props.photoURL);
  const fileInputRef = useRef(null);


  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
    
      const storageRef = ref(storage, `images/${file.name}`);
      try {
         const newFile = await uploadBytes(storageRef, file)
         const url = await getDownloadURL(storageRef)
         console.log(newFile, url)
         
        updateProfile(auth.currentUser, {
            photoURL: url,
        }) 
            
        setPhotoURL(url);
        
        if (props.onUpload) {
          props.onUpload(url);
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <div className="upload-container">
      <button onClick={handleAvatarClick} className="avatar-upload-button">
        <i className="bi bi-camera"></i>
        <span>Alterar imagem</span>
      </button>
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.gif"
        id="avatar-input"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
