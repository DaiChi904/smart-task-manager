// Core part of this App. Create new todos and displying Todo List is main role of this Compornent. Additionaly, the core content of Todos and setTodos, which is this App, is difined in this compornent as a TodosContext.

import { IonContent } from '@ionic/react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';

import "./TodoCore.css"

import { add, notificationsOutline } from 'ionicons/icons';
import { atom, useAtom } from "jotai";
import CardManager from "./CardManager";
import CardCreater from "./CardCreater";

export type MordalType = boolean;

// Value to juage other mordal is opening or not.
export const isOtherMordalOpenAtom = atom<MordalType>(false);

function TodoApp() {
  const [isOtherMordalOpen, setIsOtherMordalOpen] = useAtom<MordalType>(isOtherMordalOpenAtom);

  const handleCreateMordalOpen = () => {
    setIsOtherMordalOpen(true);
  }
  return(
      <IonContent fullscreen>

        <CardManager />

        {isOtherMordalOpen ? 
          <CardCreater />
        : <></>
        }

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add} onClick={handleCreateMordalOpen}></IonIcon>
          </IonFabButton>
        </IonFab>

      </IonContent>
  );
}

export default TodoApp;