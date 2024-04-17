// Management and Editing for Todos.

import { useState, useRef } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonModal, IonTextarea } from '@ionic/react';
import { IonDatetime, IonDatetimeButton } from '@ionic/react';
import { IonButton, IonButtons } from '@ionic/react'
import { notificationsOutline } from "ionicons/icons";
import { IonTextareaCustomEvent, TextareaInputEventDetail } from "@ionic/core";

import { useAtom } from "jotai";

import { CardValueType } from "./CardCreater";
import { todosAtom } from "./CardCreater";
import { MordalType, modalManagerAtom } from "./TodoApp";

export default function CardManager() {
  // States which are related to show or hide input field by pressing paticular elements.
  const [MordalValue, setMordalValue] = useAtom<MordalType>(modalManagerAtom);
  const [todoDateSetFieldShowStatus, setTodoDateSetFieldShowStatus] = useState(false);

  const [todos, setTodos] = useAtom(todosAtom);
  // Values related to editing cards.
  const [editTitleValue, setEditTitleValue] = useState("");
  const [editContentValue, setEditContentValue] = useState("");
  const [editingCardID, setEditingCardID] = useState<number>(NaN);
  const [editTodoDueDate, setEditTodoDueDate] = useState<null | string | string[] | undefined>(null);

  // Get edited Values of card.
  // async await はちゃんと勉強しないとヤバそう
  const handeleTitleChange = async (edit: IonTextareaCustomEvent<TextareaInputEventDetail>) => {
    const textAreaElement = await edit.target.getInputElement();
    setEditTitleValue(textAreaElement.value);
  }
  const handeleContentChange = async (edit: IonTextareaCustomEvent<TextareaInputEventDetail>) => {
    const textAreaElement = await edit.target.getInputElement();
    setEditContentValue(textAreaElement.value);
  }

  const handleShowDateSetField = () => {
    if (todoDateSetFieldShowStatus === false) {
      setTodoDateSetFieldShowStatus(true);
    } else {
      setTodoDateSetFieldShowStatus(false);
    }
  }

  // Get input value of card due date calender.
  const editDueDate = useRef<null | HTMLIonDatetimeElement>(null);
  // Set due-date from calender.
  const EditDateConfirm = () => {
    // Change the state of IonDatetime Compornent.
    editDueDate.current?.confirm();
    const editDate = editDueDate.current?.value;
    // Set formated string: YYYY-MM-DD-HH-MM-SS.
    if (typeof editDate === null) {
      console.log("Unexpected error has occuered in TodoApp compornent")
      return;
    } else if (typeof editDate === "string") {
      const editDate_Formated = editDate.replace(/T|:/g, "-");
      setEditTodoDueDate(editDate_Formated);
    } else if (typeof editDate === "object") {
      console.log("Unexpected error has occuered in TodoApp compornent")
      return;
    } else if (typeof editDate === "undefined") {
      console.log("Unexpected error has occuered in TodoApp compornent")
      return;
    }
    setTodoDateSetFieldShowStatus(false);
  };
  const EditDateClear = () => {
    // Change the state of IonDatetime Compornent.
    editDueDate.current?.reset();

    setEditTodoDueDate(null);
    setTodoDateSetFieldShowStatus(false);
  }
  const EditDateCancel = () => {
    // Change the state of IonDatetime Compornent.
    editDueDate.current?.cancel();
    
    setTodoDateSetFieldShowStatus(false);
  }

  // !Important: The type of dueDate should be fixed.
  const handleEdit = (id: number, cardTitle: string, cardContent: string, startDate: null | string | string[] | undefined, dueDate: null | string | string[] | undefined) => {
    if (MordalValue.isOtherModalOpen === null && MordalValue.isClosedSuccessfully === true) {
      setMordalValue({isOtherModalOpen: "editModalOpen", isClosedSuccessfully: false});
      setEditTitleValue(cardTitle);
      setEditContentValue(cardContent);
      setEditTodoDueDate(dueDate);
      setEditingCardID(id);
    } else if (MordalValue.isClosedSuccessfully === false) {
      setMordalValue({isOtherModalOpen: "editModalOpen", isClosedSuccessfully: false});
      setEditTitleValue(cardTitle);
      setEditContentValue(cardContent);
      setEditTodoDueDate(dueDate);
      setEditingCardID(id);
    } else {
      console.log("Other modal is opening now")
    }
  }

  const handleConfirmEdit = () => {
    // Create new edited card.
    const newTodo: CardValueType = {
      id: todos.length,
      cardTitle: editTitleValue,
      cardContent: editContentValue,
      checked: false,
      startDate: null,
      dueDate: editTodoDueDate,
    };
    // Delete the card which is pre-edited.
    const pendingTodos = todos.filter((pendingtodos) => {
      if (pendingtodos.id === editingCardID) {
        return false
      } else {
        return pendingtodos;
      };
    });
    // Create editied todos array.
    setTodos([newTodo, ...pendingTodos]);

    // きれいにできそう
    // Hide todo input field.
    setMordalValue({isOtherModalOpen: null, isClosedSuccessfully: false});
    // Initialize editValues.
    setEditTitleValue("");
    setEditContentValue("");
    setEditTodoDueDate(null);
    setEditingCardID(NaN);
  }

  const handleCancelEdit = () => {
    // Hide todo input field.
    setMordalValue({isOtherModalOpen: null, isClosedSuccessfully: false});
    // Initialize editValues.
    setEditTitleValue("");
    setEditContentValue("");
    setEditTodoDueDate(null);
    setEditingCardID(NaN);
  }

  const handleDelete = () => {
    const pendingTodos = todos.filter((pendingtodos) => {
      if (pendingtodos.id === editingCardID) {
        return false;
      } else {
        return pendingtodos;
      };
    });
    // Significant bug exist. It is needed to investigate. Maybe it is because of id is set by todos(array) length. It needs completely unique id.
    setTodos([...pendingTodos]);
    
    // Hide todo input field.
    setMordalValue({isOtherModalOpen: null, isClosedSuccessfully: false});
    // Initialize editValues.
    setEditTitleValue("");
    setEditContentValue("");
    setEditTodoDueDate(null);
    setEditingCardID(NaN);
  }

  return(
    <>

      <div className="CardList">
        {todos.map((todos) => (
          <IonCard className="Card" onClick={() => handleEdit(todos.id, todos.cardTitle, todos.cardContent, todos.startDate, todos.dueDate)}>
            <IonCardHeader>
              <IonCardTitle>
                <div id="Title" key={todos.id}>{todos.cardTitle}</div>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div id="Content" key={todos.id}>{todos.cardContent}</div>
            </IonCardContent>
          </IonCard>
        ))}
      </div>

      <IonModal isOpen={MordalValue.isOtherModalOpen === "editModalOpen"}>
        <IonContent>
        <IonIcon id="Notifaction" aria-hidden="true" icon={notificationsOutline} onClick={handleShowDateSetField}></IonIcon>
        <p>Title</p>
        <IonTextarea
          placeholder="Type Card Title" 
          value={editTitleValue}
          onIonInput={(edit) => handeleTitleChange(edit)}
        />
        <p>Content</p>
        <IonTextarea
          placeholder="Type Card Details"
          value={editContentValue}
          onIonInput={(edit) => handeleContentChange(edit)}
        />
        <div>
        <IonButtons>
          <IonButton onClick={handleConfirmEdit} shape="round"><b>Confirm</b></IonButton>
          <IonButton onClick={handleDelete} shape="round"><b>Delete</b></IonButton>
          <IonButton onClick={handleCancelEdit} shape="round"><b>Cancel</b></IonButton>
        </IonButtons>
        </div>
        <div className={todoDateSetFieldShowStatus ? "show" : "hidden"}>
          <div className="SetTodoDueDateField">
            <IonDatetime ref={editDueDate}>
                <IonButtons slot="buttons">
                  <IonButton color="primary" onClick={EditDateConfirm}>Set</IonButton>
                  <IonButton color="primary" onClick={EditDateClear}>clear</IonButton>
                  <IonButton color="primary" onClick={EditDateCancel}>Cancel</IonButton>
                </IonButtons>
              </IonDatetime>
          </div>
        </div>
        </IonContent>
      </IonModal>

    </>
  );
}