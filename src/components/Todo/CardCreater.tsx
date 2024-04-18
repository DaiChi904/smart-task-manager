// Core part of this App. Create new todos and displying Todo List is main role of this Compornent. Additionaly, the core content of Todos and setTodos, which is this App, is difined in this compornent as a TodosContext.

import { useState, useRef } from "react";
import { IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonTextarea } from '@ionic/react';
import { IonDatetime } from "@ionic/react";
import { IonButtons, IonButton } from "@ionic/react";

import "./TodoCore.css"

import { notificationsOutline } from 'ionicons/icons';
import { atom, useAtom } from "jotai";
import { MordalType, modalManagerAtom } from "./TodoApp";
import { IonTextareaCustomEvent, TextareaInputEventDetail } from "@ionic/core";

export type SetDateType = {
  startDate: boolean,
  dueDate: boolean,
}

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
  const [isSetDateModalOpen, setIsSetDateModalOpen] = useState<SetDateType>({startDate: false, dueDate: false});

  // Values related to creating cards.
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");
  const [todoStartDate, setTodoStartDate] = useState<null | string | string[] | undefined>(null);
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

  // Get input value of card due date calender.
  const startDate = useRef<null | HTMLIonDatetimeElement>(null);
  const dueDate = useRef<null | HTMLIonDatetimeElement>(null);
  // Set start-date and due-date from calender.
  const DateConfirm = () => {
    if (isSetDateModalOpen.startDate === true) {
      startDate.current?.confirm();
      const startDate_Default = startDate.current?.value;
      // Set formated string: YYYY-MM-DD-HH-MM-SS.
      if (typeof startDate_Default === null) {
        console.log("Unexpected error has occuered in TodoApp compornent")
      } else if (typeof startDate_Default === "string") {
        const startDate_Formated = startDate_Default.replace(/T|:/g, "-");
        setTodoStartDate(startDate_Formated);
      } else if (typeof startDate_Default === "object") {
        console.log("Unexpected error has occuered in TodoApp compornent")
      } else if (typeof startDate_Default === "undefined") {
        console.log("Unexpected error has occuered in TodoApp compornent")
      }
      setIsSetDateModalOpen({startDate: false, dueDate: false});
    } else if (isSetDateModalOpen.dueDate === true) {
      dueDate.current?.confirm();
      const dueDate_Default = dueDate.current?.value;
      // Set formated string: YYYY-MM-DD-HH-MM-SS.
      if (typeof dueDate_Default === null) {
        console.log("Unexpected error has occuered in TodoApp compornent")
      } else if (typeof dueDate_Default === "string") {
        const dueDate_Formated = dueDate_Default.replace(/T|:/g, "-");
        setTodoDueDate(dueDate_Formated);
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
  const DateClear = () => {
    if (isSetDateModalOpen.startDate === true) {
      startDate.current?.reset();
      setTodoStartDate(null);
      setIsSetDateModalOpen({startDate: false, dueDate: false,});
    } else if (isSetDateModalOpen.dueDate === true) {
      dueDate.current?.reset();
      setTodoDueDate(null);
      setIsSetDateModalOpen({startDate: false, dueDate: false,});
    } else {
      alert("Unexpected error has ocuured")
    }
  }
  const DateCancel = () => {
    if (isSetDateModalOpen.startDate === true) {
      startDate.current?.cancel();;
      setIsSetDateModalOpen({startDate: false, dueDate: false,});
    } else if (isSetDateModalOpen.dueDate === true) {
      dueDate.current?.cancel();
      setIsSetDateModalOpen({startDate: false, dueDate: false,});
    } else {
      alert("Unexpected error has ocuured")
    }
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
        startDate: todoStartDate,
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
  console.log(todoStartDate, todoDueDate)

  return(
    <>
      <IonModal isOpen={MordalValue.isOtherModalOpen === "createModalOpen"}>
        <IonHeader>
          Creating New Todo
          <IonButtons>
            <IonButton onClick={() => setIsSetDateModalOpen({startDate: true, dueDate: false})} shape="round">Set start date</IonButton>
            <IonButton onClick={() => setIsSetDateModalOpen({startDate: false, dueDate: true})} shape="round">Set due date</IonButton>
          </IonButtons>
        </IonHeader>
        <IonContent>
        <p>Title</p>
        <IonTextarea
          counter={true}
          maxlength={50}
          placeholder="Type Card Title" 
          value={inputTitleValue}
          onIonInput={(input) => handeleTitleChange(input)}
        />
        <p>Content</p>
        <IonTextarea
          autoGrow={true}
          placeholder="Type Card Details"
          value={inputContentValue}
          onIonInput={(input) => handeleContentChange(input)}
        />
        </IonContent>
        <IonFooter>
          <IonButtons>
            <IonButton onClick={handleAdd} shape="round">Create</IonButton>
            <IonButton onClick={handleCancel} shape="round">Cancel</IonButton>
          </IonButtons>
        </IonFooter>

        <IonModal isOpen={isSetDateModalOpen.startDate}>
          <p>Set start Date</p>
          <IonDatetime ref={startDate}>
            <IonButtons slot="buttons">
              <IonButton color="primary" onClick={DateConfirm}>Set</IonButton>
              <IonButton color="primary" onClick={DateClear}>clear</IonButton>
              <IonButton color="primary" onClick={DateCancel}>Cancel</IonButton>
            </IonButtons>
          </IonDatetime>
        </IonModal>
        <IonModal isOpen={isSetDateModalOpen.dueDate}>
          <p>Set due date</p>
          <IonDatetime ref={dueDate}>
            <IonButtons slot="buttons">
              <IonButton color="primary" onClick={DateConfirm}>Set</IonButton>
              <IonButton color="primary" onClick={DateClear}>clear</IonButton>
              <IonButton color="primary" onClick={DateCancel}>Cancel</IonButton>
            </IonButtons>
          </IonDatetime>
        </IonModal>
        
      </IonModal>
    </>
  );
}