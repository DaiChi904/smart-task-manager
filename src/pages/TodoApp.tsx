import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import TodoApp from '../components/Todo/TodoApp';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Memo Card List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <TodoApp />

    </IonPage>
  );
};

export default Tab1;
