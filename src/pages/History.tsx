import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./History.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Clipboard } from "@capacitor/clipboard";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { BASE_URL } from "../constant";

const url = BASE_URL;

const Tab3: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [history, setHistory] = useState<any>();
  const [currentHistory, setCurrentHistory] = useState<any | null>(null);
  const handleHisoryDetails = (item: any) => {
    setIsOpen(true);
    setCurrentHistory(item);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.get(url + `delete/${currentHistory.id}`);
      setDeleting(false);
    } catch (e) {
      console.error("Error deleting data:");
    } finally {
      setIsOpen(false);
      setDeleting(false);
      setCurrentHistory(null);
    }
  };
  useEffect(() => {
    async function fetchData() {
      setHistoryLoading(true);
      axios
        .get(url + "convert")
        .then((response) => {
          setHistory(response.data);
          setHistoryLoading(false);
        })
        .catch((error) => {
          setHistoryLoading(false);
          console.error("Error fetching data:", error);
        });
    }
    fetchData();
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
          {historyLoading ? (
            <IonSpinner
              name="lines"
              slot="end"
              style={{ marginLeft: "150px" }}
            />
          ) : (
            history &&
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
                  {item.converted_text?.substring(0, 50) + "..."}
                </div>
              </div>
            ))
          )}
          {}
        </IonList>
      </IonContent>

      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              
              {currentHistory?.converted_text && currentHistory.converted_text.substring(0, 50)}
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
                  {deleting && <IonSpinner name="crescent" />}
                  Delete
                </IonButton>
                <IonButton
                  fill="outline"
                  color={"primary"}
                  style={{ width: "100%" }}
                  onClick={() =>
                    writeToClipboard(currentHistory?.converted_text)
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
