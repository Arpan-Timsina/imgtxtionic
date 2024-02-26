import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CameraComponent from '../components/Camera'
import './CameraPage.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);


const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          
          <IonTitle>Image to Text</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <CameraComponent/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
