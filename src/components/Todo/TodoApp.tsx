// Core part of this App. Create new todos and displying Todo List is main role of this Compornent. Additionaly, the core content of Todos and setTodos, which is this App, is difined in this compornent as a TodosContext.

import { IonBackdrop, IonContent } from '@ionic/react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';

import "./TodoCore.css"

import { add } from 'ionicons/icons';
import { atom, useAtom } from "jotai";

import CardCreater from './CardCreater';
import CardManager from './CardManager';


export type ModalType = string | null

// Value to juage other mordal is opening or not.
export const modalManagerAtom = atom<ModalType>(null);

function TodoApp() {
  const [modalValue, setModalValue] = useAtom<ModalType>(modalManagerAtom);

  return (
    <IonContent fullscreen>

      <CardManager />
      
      <CardCreater />

      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={add} onClick={() => setModalValue("createModalIsOpen")}></IonIcon>
        </IonFabButton>
      </IonFab>

    </IonContent>
  );
}

export default TodoApp;