import {
  IonContent,
  IonHeader,
  IonList,
  IonLabel,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./History.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Clipboard } from "@capacitor/clipboard";
import { IonButtons, IonButton, IonModal, IonToast } from "@ionic/react";

const url = "http://127.0.0.1:8000";

const Tab3: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [history, setHistory] = useState<any>();
  const [currentHistory, setCurrentHistory] = useState<any | null>(null);
  const handleHisoryDetails = (item: any) => {
    setIsOpen(true);
    setCurrentHistory(item);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        url + `/convert?history_id=${currentHistory.id}`
      );
      console.log(res)
    } catch (e) {
      console.error("Error deleting data:", e);
    } finally {
      setIsOpen(false);
      setCurrentHistory(null);
    }
  };
  useEffect(() => {
    axios
      .get(url + "/convert")
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [isOpen]);

  const writeToClipboard = async (text: string) => {
    await Clipboard.write({
      string: text,
    });
    setIsToastOpen(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList
          inset={false}
          style={{
            width: "100%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {history &&
            history.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  borderRadius: "10px",
                  background: "#111",
                }}
                onClick={() => handleHisoryDetails(item)}
              >
                <div>
                  Summary {index + 1}:{" "}
                  {item.converted_text.substring(0, 50) + "..."}
                </div>
              </div>
            ))}
        </IonList>
      </IonContent>

      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {currentHistory?.converted_text.substring(0, 50)}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {currentHistory && (
          <IonContent className="ion-padding">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <IonButton
                  style={{ width: "100%" }}
                  color={"danger"}
                  fill="outline"
                  onClick={() => handleDelete()}
                >
                  Delete
                </IonButton>
                <IonButton
                  fill="outline"
                  color={"primary"}
                  style={{ width: "100%" }}
                  onClick={() =>
                    writeToClipboard(currentHistory.converted_text)
                  }
                >
                  Copy to clipboard
                </IonButton>
              </div>

              <div
                style={{
                  background: "#333",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <img src={url + currentHistory.image} alt="" />
              </div>
              <div
                style={{
                  background: "#333",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <p>{currentHistory.converted_text}</p>
              </div>
            </div>
          </IonContent>
        )}
      </IonModal>
      <IonToast
        isOpen={isToastOpen}
        onDidDismiss={() => setIsToastOpen(false)}
        message="Copied to clipboard"
        duration={2000}
      />
    </IonPage>
  );
};

export default Tab3;
