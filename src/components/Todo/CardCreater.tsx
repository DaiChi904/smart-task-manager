// Core part of this App. Create new todos and displying Todo List is main role of this Compornent. Additionaly, the core content of Todos and setTodos, which is this App, is difined in this compornent as a TodosContext.

import { useState, useRef } from "react";
import { IonContent, IonIcon, IonModal, IonTextarea } from '@ionic/react';
import { IonDatetime } from "@ionic/react";
import { IonButtons, IonButton } from "@ionic/react";

import "./TodoCore.css"

import { notificationsOutline } from 'ionicons/icons';
import { atom, useAtom } from "jotai";
import { MordalType, modalManagerAtom } from "./TodoApp";
import { IonTextareaCustomEvent, TextareaInputEventDetail } from "@ionic/core";


export type CardValueType = {
  id: number;
  cardTitle: string;
  cardContent: string;
  checked: boolean;
  startDate: null | string | string[] | undefined;
  dueDate: null | string | string[] | undefined;
}

export const todosAtom = atom<CardValueType[]>([]);

export default function CardCreater() {
  // States which are related to show or hide input field by pressing paticular elements.
  const [MordalValue, setMordalValue] = useAtom<MordalType>(modalManagerAtom);
  const [todoDateSetFieldShowStatus, setTodoDateSetFieldShowStatus] = useState(false);

  // Values related to creating cards.
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");
  const [todoDueDate, setTodoDueDate] = useState<null | string | string[] | undefined>(null);
  const [todos, setTodos] = useAtom(todosAtom);

  // Get input Values of card.
  // async await はちゃんと勉強しないとヤバそう
  const handeleTitleChange = async (input: IonTextareaCustomEvent<TextareaInputEventDetail>) => {
    const textAreaElement = await input.target.getInputElement();
    setInputTitleValue(textAreaElement.value);
  }
  const handeleContentChange = async (input: IonTextareaCustomEvent<TextareaInputEventDetail>) => {
    const textAreaElement = await input.target.getInputElement();
    setInputContentValue(textAreaElement.value);
  }

  const handleShowDateSetField = () => {
    if (todoDateSetFieldShowStatus === false) {
      setTodoDateSetFieldShowStatus(true);
    } else {
      setTodoDateSetFieldShowStatus(false);
    }
  }

  // Get input value of card due date calender.
  const dueDate = useRef<null | HTMLIonDatetimeElement>(null);
  // Set due-date from calender.
  const DateConfirm = () => {
    dueDate.current?.confirm();
    const Date_Default = dueDate.current?.value;
    // Set formated string: YYYY-MM-DD-HH-MM-SS.
    if (typeof Date_Default === null) {
      console.log("Unexpected error has occuered in TodoApp compornent")
      return;
    } else if (typeof Date_Default === "string") {
      const Date_Formated = Date_Default.replace(/T|:/g, "-");
      setTodoDueDate(Date_Formated);
    } else if (typeof Date_Default === "object") {
      console.log("Unexpected error has occuered in TodoApp compornent")
      return;
    } else if (typeof Date_Default === "undefined") {
      console.log("Unexpected error has occuered in TodoApp compornent")
      return;
    }
    setTodoDateSetFieldShowStatus(false);
  };
  const DateClear = () => {
    dueDate.current?.reset();
    setTodoDueDate(null);
    setTodoDateSetFieldShowStatus(false);
  }
  const DateCancel = () => {
    dueDate.current?.cancel();
    setTodoDateSetFieldShowStatus(false);
  }

  // Create new Todo
  const handleAdd = (add: { preventDefault: () => void; }) => {
    // Cancel action if more than one text input field is empty. 
    if (inputTitleValue === "" || inputContentValue === "") {
      // Hide todo input field
      setMordalValue({isOtherModalOpen: null, isClosedSuccessfully: true});
      // Initialize inputTitleValue and inputContentValue.
      setInputTitleValue("");
      setInputContentValue("");
      alert("Your action has been canceled due to lack of the title or the content.")
    } else {
      add.preventDefault();
      const newTodo: CardValueType = {
        id: todos.length,
        cardTitle: inputTitleValue,
        cardContent: inputContentValue,
        checked: false,
        startDate: null,
        dueDate: todoDueDate,
      };
      // Create new Todo array.
      setTodos([newTodo, ...todos]);
      // Hide todo input field.
      setMordalValue({isOtherModalOpen: null, isClosedSuccessfully: true});
      // Initialize inputValues.
      setInputTitleValue("");
      setInputContentValue("");
      setTodoDueDate(null);
    }
  }

  // Cancel adding Todo.
  const handleCancel = () => {
    // Hide todo input field.
    setMordalValue({isOtherModalOpen: null, isClosedSuccessfully: true});
    // Initialize inputValues.
    setInputTitleValue("");
    setInputContentValue("");
    setTodoDueDate(null);
  }
  
  console.log(todos);

  return(
    <>
      <IonModal isOpen={MordalValue.isOtherModalOpen === "createModalOpen"}>
        <IonContent>
        <IonIcon id="Notifaction" aria-hidden="true" icon={notificationsOutline} onClick={handleShowDateSetField}></IonIcon>
        <p>Title</p>
        <IonTextarea
          placeholder="Type Card Title" 
          value={inputTitleValue}
          onIonInput={(input) => handeleTitleChange(input)}
        />
        <p>Content</p>
        <IonTextarea
          placeholder="Type Card Details"
          value={inputContentValue}
          onIonInput={(input) => handeleContentChange(input)}
        />
        <div>
        <IonButtons>
          <IonButton onClick={handleAdd} shape="round">Create</IonButton>
          <IonButton onClick={handleCancel} shape="round">Cancel</IonButton>
        </IonButtons>
        </div>
        <div className={todoDateSetFieldShowStatus ? "show" : "hidden"}>
          <div className="SetTodoDueDateField">
            <IonDatetime ref={dueDate}>
              <IonButtons slot="buttons">
                <IonButton color="primary" onClick={DateConfirm}>Set</IonButton>
                <IonButton color="primary" onClick={DateClear}>clear</IonButton>
                <IonButton color="primary" onClick={DateCancel}>Cancel</IonButton>
              </IonButtons>
            </IonDatetime>
          </div>
        </div>
        </IonContent>
      </IonModal>
    </>
  );
}