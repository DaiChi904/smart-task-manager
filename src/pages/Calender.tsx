import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Calender from '../components/Calender/Calender';
import Expelimentalcalender from '../components/Calender/expeliment';
import ExpCalendar from '../components/Calender/ExpelimentalCalendar';

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
        <ExpCalendar />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
