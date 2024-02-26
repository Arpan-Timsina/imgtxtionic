import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CameraComponent from '../components/Camera'
import './CameraPage.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader before the render call
defineCustomElements(window);


const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <CameraComponent/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
