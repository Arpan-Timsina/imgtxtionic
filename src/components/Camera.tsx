import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  IonButton,
  IonToast,
  IonCard,
  IonSkeletonText,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import axios from "axios";
import { camera } from "ionicons/icons";
import banner from "../assets/bannermain2.svg";
import banner2 from "../assets/bannermain.svg";

const url = "http://192.168.1.16:8000/convert"
const CameraComponent: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [convertedText, setConvertedText] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [loadingCamera, setLoadingCamera] = useState<boolean | undefined>(
    false
  );
  const [error, setError] = useState<string | null>(null);

  const takePhoto = async () => {
    try {
      setLoadingCamera(true);
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: true,
      });
      setPhotoUrl(capturedPhoto.webPath);
      setLoadingCamera(false);

      // Get the image file from the captured photo
      //@ts-ignore
      const response = await fetch(capturedPhoto.webPath);
      const blob = await response.blob();
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
      setImageFile(file);
    } catch (error) {
      setLoadingCamera(false);
      console.error("Error taking photo", error);
      setError("Cancelled taking photo");
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
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200) {
        setLoading(false);
        setConvertedText(response.data.text);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      setError("Error uploading image");
    }
  };

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        overflow: "none",
      }}
    >
      <IonToast
        isOpen={error != null}
        message={error || "Something went wrong"}
        duration={1000}
        position="top"
        buttons={[
          {
            text: "Close",
            role: "cancel",
          },
        ]}
      ></IonToast>
      {!photoUrl && (
        <div
          style={{
            alignSelf: "start",
            marginBottom: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={banner2}
            style={{
              objectFit: "cover",
              paddingTop: 20,
            }}
          ></img>
          <h1 style={{ alignSelf: "center" }}>
            <i>Scan Summarize</i>
          </h1>
          <img
            src={banner}
            style={{
              objectFit: "cover",
              paddingTop: 20,
            }}
          ></img>
        </div>
      )}

      <IonButton
        onClick={takePhoto}
        fill="outline"
        style={{ display: "flex", alignItems: "center" }}
      >
        <IonIcon slot="start" icon={camera}></IonIcon>
        {photoUrl ? "Retake Photo" : "Take Photo"}
      </IonButton>

      {convertedText && (
          <IonCard style={{ padding: 20, width: "90%", height: 'auto' }}>
            {convertedText}
          </IonCard>
        )}
      {photoUrl && (
        <>
          <IonCard
            style={{
              padding: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonCardTitle>Image</IonCardTitle>
            <IonCardContent>
              <img src={photoUrl} alt="Captured" style={{ width: "100%" }} />
            </IonCardContent>
            <IonCard />
          </IonCard>
          <IonButton onClick={uploadImage}>Upload Image</IonButton>
        </>
      )}

      {loadingCamera && (
        <IonItem>
          <IonLabel>Loading Camera</IonLabel>
          <IonSpinner name="lines-sharp"></IonSpinner>
        </IonItem>
      )}

      
    </div>
  );
};

export default CameraComponent;
