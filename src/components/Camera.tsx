import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IonButton, IonCard, IonSkeletonText } from "@ionic/react";
import axios from "axios";

const CameraComponent: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [convertedText, setConvertedText] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const takePhoto = async () => {
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: true,
      });
      setPhotoUrl(capturedPhoto.webPath);

      // Get the image file from the captured photo
      //@ts-ignore
      const response = await fetch(capturedPhoto.webPath);
      const blob = await response.blob();
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
      setImageFile(file);
    } catch (error) {
      console.error("Error taking photo", error);
    }
  };

  const uploadImage = async () => {
    try {
      if (!imageFile) {
        console.error("No image file to upload");
        return;
      }

      const formData = new FormData();
      //@ts-ignore
      formData.append("name", photoUrl?.split("/").pop());
      formData.append("image", imageFile);
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/convert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setConvertedText(response.data.text);
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <IonButton onClick={takePhoto}>Take Photo</IonButton>
      {photoUrl && (
        <>
        <img src={photoUrl} alt="Captured" style={{ width: "100%" }} />
        <IonButton onClick={uploadImage}>Upload Image</IonButton>
        </>
      )}

      

      {loading ? (
        <IonSkeletonText style={{padding: 20}}></IonSkeletonText>
      ) : (
        convertedText && (
          <IonCard style={{ padding: 20,width: '100%',height: 50   }}>{convertedText}</IonCard>
        )
      )}
    </div>
  );
};

export default CameraComponent;
