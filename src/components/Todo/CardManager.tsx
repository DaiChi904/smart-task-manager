// Management and Editing for Todos.

import { useState, useRef } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonTextarea } from '@ionic/react';
import { IonDatetime, IonDatetimeButton } from '@ionic/react';
import { IonButton, IonButtons } from '@ionic/react'
import { notificationsOutline } from "ionicons/icons";
import { IonTextareaCustomEvent, TextareaInputEventDetail } from "@ionic/core";

import { useAtom } from "jotai";

import { CardValueType, SetDateType } from "./CardCreater";
import { todosAtom } from "./CardCreater";
import { ModalType, modalManagerAtom } from "./TodoApp";

export default function CardManager() {
  // States which are related to show or hide input field by pressing paticular elements.
  const [modalValue, setModalValue] = useAtom<ModalType>(modalManagerAtom);
  const [isSetDateModalOpen, setIsSetDateModalOpen] = useState<SetDateType>({startDate: false, dueDate: false});

  const [todos, setTodos] = useAtom(todosAtom);
  // Values related to editing cards.
  const [editTitleValue, setEditTitleValue] = useState("");
  const [editContentValue, setEditContentValue] = useState("");
  const [editingCardID, setEditingCardID] = useState<number>(NaN);
  const [editTodoStartDate, setEditTodoStartDate] = useState<null | string | string[] | undefined>(null);
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

  // Get input value of card due date calender.
  const editStartDate = useRef<null | HTMLIonDatetimeElement>(null);
  const editDueDate = useRef<null | HTMLIonDatetimeElement>(null);
  // Set due-date from calender.
  const EditDateConfirm = () => {
    if (isSetDateModalOpen.startDate === true) {
      editStartDate.current?.confirm();
      const editStartDate_Default = editStartDate.current?.value;
      // Set formated string: YYYY-MM-DD-HH-MM-SS.
      if (typeof editStartDate_Default === null) {
        console.log("Unexpected error has occuered in TodoApp compornent")
      } else if (typeof editStartDate_Default === "string") {
        const editStartDate_Formated = editStartDate_Default.replace(/T|:/g, "-");
        setEditTodoStartDate(editStartDate_Formated);
      } else if (typeof editStartDate_Default === "object") {
        console.log("Unexpected error has occuered in TodoApp compornent")
      } else if (typeof editStartDate_Default === "undefined") {
        console.log("Unexpected error has occuered in TodoApp compornent")
      }
      setIsSetDateModalOpen({startDate: false, dueDate: false});
    } else if (isSetDateModalOpen.dueDate === true) {
      editDueDate.current?.confirm();
      const dueDate_Default = editDueDate.current?.value;
      // Set formated string: YYYY-MM-DD-HH-MM-SS.
      if (typeof dueDate_Default === null) {
        console.log("Unexpected error has occuered in TodoApp compornent")
      } else if (typeof dueDate_Default === "string") {
        const dueDate_Formated = dueDate_Default.replace(/T|:/g, "-");
        setEditTodoDueDate(dueDate_Formated);
      } else if (typeof dueDate_Default === "object") {
        console.log("Unexpected error has occuered in TodoApp compornent")
      } else if (typeof dueDate_Default === "undefined") {
        console.log("Unexpected error has occuered in TodoApp compornent")
      }
      setIsSetDateModalOpen({startDate: false, dueDate: false});
    } else {
      alert("Unexpected error has ocuured");
    }
  } 
  const EditDateClear = () => {
    if (isSetDateModalOpen.startDate === true) {
      editStartDate.current?.reset();
      setEditTodoStartDate(null);
      setIsSetDateModalOpen({startDate: false, dueDate: false,});
    } else if (isSetDateModalOpen.dueDate === true) {
      editDueDate.current?.reset();
      setEditTodoDueDate(null);
      setIsSetDateModalOpen({startDate: false, dueDate: false,});
    } else {
      alert("Unexpected error has ocuured")
    }
  }
  const EditDateCancel = () => {
    if (isSetDateModalOpen.startDate === true) {
      editStartDate.current?.cancel();;
      setIsSetDateModalOpen({startDate: false, dueDate: false,});
    } else if (isSetDateModalOpen.dueDate === true) {
      editDueDate.current?.cancel();
      setIsSetDateModalOpen({startDate: false, dueDate: false,});
    } else {
      alert("Unexpected error has ocuured")
    }
  }

  // !Important: The type of dueDate should be fixed.
  const handleEdit = (id: number, cardTitle: string, cardContent: string, startDate: null | string | string[] | undefined, dueDate: null | string | string[] | undefined) => {
      setModalValue("editModalIsOpen");
      setEditTitleValue(cardTitle);
      setEditContentValue(cardContent);
      setEditTodoDueDate(dueDate);
      setEditingCardID(id);
  }

  const handleConfirmEdit = () => {
    // Create new edited card.
    const newTodo: CardValueType = {
      id: todos.length,
      cardTitle: editTitleValue,
      cardContent: editContentValue,
      checked: false,
      startDate: editTodoStartDate,
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
    setModalValue(null);
    // Initialize editValues.
    setEditTitleValue("");
    setEditContentValue("");
    setEditTodoDueDate(null);
    setEditingCardID(NaN);
  }

  const handleCancelEdit = () => {
    // Hide todo input field.
    setModalValue(null);
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
    setModalValue(null);
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

      <IonModal className="Modal" isOpen={modalValue === "editModalIsOpen"} onDidDismiss={() => setModalValue(null)}>
        <IonHeader>
          Editing New Todo
          <IonButtons>
            <IonButton onClick={() => setIsSetDateModalOpen({startDate: true, dueDate: false})} shape="round">Set start date</IonButton>
            <IonButton onClick={() => setIsSetDateModalOpen({startDate: false, dueDate: true})} shape="round">Set due date</IonButton>
          </IonButtons>
        </IonHeader>
        <IonContent>
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
        </IonContent>
        <IonFooter>
          <IonButtons>
            <IonButton onClick={handleConfirmEdit} shape="round"><b>Confirm</b></IonButton>
            <IonButton onClick={handleDelete} shape="round"><b>Delete</b></IonButton>
            <IonButton onClick={handleCancelEdit} shape="round"><b>Cancel</b></IonButton>
          </IonButtons>
        </IonFooter>

        <IonModal isOpen={isSetDateModalOpen.startDate} onDidDismiss={() => setIsSetDateModalOpen({startDate: false, dueDate: false,})}>
          <p>Set start Date</p>
          <IonDatetime ref={editStartDate}>
            <IonButtons slot="buttons">
              <IonButton color="primary" onClick={EditDateConfirm}>Set</IonButton>
              <IonButton color="primary" onClick={EditDateClear}>clear</IonButton>
              <IonButton color="primary" onClick={EditDateCancel}>Cancel</IonButton>
            </IonButtons>
          </IonDatetime>
        </IonModal>
        <IonModal isOpen={isSetDateModalOpen.dueDate} onDidDismiss={() => setIsSetDateModalOpen({startDate: false, dueDate: false,})}>
          <p>Set due date</p>
          <IonDatetime ref={editDueDate}>
            <IonButtons slot="buttons">
              <IonButton color="primary" onClick={EditDateConfirm}>Set</IonButton>
              <IonButton color="primary" onClick={EditDateClear}>clear</IonButton>
              <IonButton color="primary" onClick={EditDateCancel}>Cancel</IonButton>
            </IonButtons>
          </IonDatetime>
        </IonModal>

      </IonModal>

    </>
  );
}