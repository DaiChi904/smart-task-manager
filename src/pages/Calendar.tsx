import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import MainCalendar from '../components/Calender/MainCalendar';

import "./Calendar.css";
import OneDayTimeTable from '../components/Calender/OneDayTimeTable';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calender</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
          <MainCalendar />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
