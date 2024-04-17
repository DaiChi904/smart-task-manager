// Core part of this App. Create new todos and displying Todo List is main role of this Compornent. Additionaly, the core content of Todos and setTodos, which is this App, is difined in this compornent as a TodosContext.

import { IonContent } from '@ionic/react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';

import "./TodoCore.css"

import { add } from 'ionicons/icons';
import { atom, useAtom } from "jotai";

import CardCreater from './CardCreater';
import CardManager from './CardManager';


export type MordalType = {
  isOtherModalOpen: string | null,
  isClosedSuccessfully: boolean,
}

// Value to juage other mordal is opening or not.
export const modalManagerAtom = atom<MordalType>({ isOtherModalOpen: null, isClosedSuccessfully: true });

function TodoApp() {
  const [MordalValue, setMordalValue] = useAtom<MordalType>(modalManagerAtom);

  const handleCreateModalOpen = () => {
    if (MordalValue.isOtherModalOpen === null && MordalValue.isClosedSuccessfully === true) {
      setMordalValue({ isOtherModalOpen: "createModalOpen", isClosedSuccessfully: false });
    } else if (MordalValue.isClosedSuccessfully === false) {
      setMordalValue({ isOtherModalOpen: "createModalOpen", isClosedSuccessfully: false });
    } else {
      console.log("Other modal is already opening now.")
    }
  }

  return (
    <IonContent fullscreen>

      <CardManager />

      <CardCreater />

      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={add} onClick={handleCreateModalOpen}></IonIcon>
        </IonFabButton>
      </IonFab>

    </IonContent>
  );
}

export default TodoApp;