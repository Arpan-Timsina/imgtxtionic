import { IonContent, IonHeader,IonList,IonLabel,IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './History.css';

const Tab3: React.FC = () => {

  const summaries: string[] = [
    "The protagonist embarks on a journey to find a long-lost treasure, facing numerous challenges along the way.",
    "In a dystopian society, a group of rebels fights against oppressive rulers to restore freedom to the people.",
    "A scientist accidentally creates a time machine and must race against time to prevent disastrous consequences.",
    "After surviving a plane crash, a group of strangers must work together to survive on a deserted island.",
    "A young wizard discovers his true identity and must confront the dark wizard who killed his parents.",
    "Two star-crossed lovers from rival families defy societal norms to be together, facing tragic consequences.",
    "A group of astronauts embarks on a mission to explore a distant planet, encountering unforeseen dangers.",
    "A detective investigates a series of gruesome murders, uncovering a web of deceit and betrayal.",
    "In a post-apocalyptic world, a lone survivor must navigate through desolate landscapes to find sanctuary.",
    "A family's peaceful life is disrupted when they discover a hidden secret that changes everything."
];


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList inset={true}>
        {summaries.map((summary, index) => (
                <IonItem key={index}>
                    <IonLabel>Summary {index + 1}: {summary}</IonLabel>
                </IonItem>
            ))}
      

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
