import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import TodoApp from '../components/Memo_card/TodoApp';


const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Memo Card List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TodoApp />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
