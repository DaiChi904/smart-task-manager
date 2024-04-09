// Core part of this App. Create new todos and displying Todo List is main role of this Compornent. Additionaly, the core content of Todos and setTodos, which is this App, is difined in this compornent as a TodosContext.

import { useState, createContext, useRef, FormEvent, useEffect } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { IonDatetime } from "@ionic/react";
import { IonButtons, IonButton } from "@ionic/react";
import CardList from "./CardList";

import "./TodoApp.css"

import { notificationsOutline } from 'ionicons/icons';
import { atom, useAtom } from "jotai";


export type CardValue = {
  id: number;
  cardTitle: string;
  cardContent: string;
  checked: boolean;
  startDate?: null | string | string[] | undefined;
  dueDate?: null | string | string[] | undefined;
}
export const todosAtom = atom<CardValue[]>([])


function TodoApp() {
  function dateFormatter(dateString: string): { year: number, month: number, day: number, hour: number, minute: number } {
    const date = new Date(dateString);
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
    };
}


  // States which are related to show or hide input field by pressing paticular elements.
  const [todoInputFieldShowStatus, setTodoInputFieldShowStatus] = useState(false);
  const [todoDateSetFieldShowStatus, setTodoDateSetFieldShowStatus] = useState(false);


  const handeleShowTodoInputField = () => {
    setTodoInputFieldShowStatus(true)
  }

  // Get input Values of card
  const handeleTitleChange = (input: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputTitleValue(input.target.value)
  }
  const handeleContentChange = (input: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContentValue(input.target.value)
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
    const Date_Formatted = dateFormatter(Date_Default);
    setTodoDueDate(Date_Default);
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
      setTodoInputFieldShowStatus(false);
      // Initialize inputTitleValue and inputContentValue
      setInputTitleValue("");
      setInputContentValue("");
      alert("Your action has been canceled due to lack of the title or the content.")
      return;
    } else {
      add.preventDefault();
      const newTodo: CardValue = {
        id: todos.length,
        cardTitle: inputTitleValue,
        cardContent: inputContentValue,
        checked: false,
        dueDate: todoDueDate,
      };
      // Creae new Todo array
      setTodos([newTodo, ...todos]);
      // Hide todo input field
      setTodoInputFieldShowStatus(false);
      // Initialize inputValues
      setInputTitleValue("");
      setInputContentValue("");
      setTodoDueDate(null);
    }
  }

  // Cancel adding Todo
  const handleCancel = () => {
    setTodoInputFieldShowStatus(false);
    // Initialize inputValues
    setInputTitleValue("");
    setInputContentValue("");
    setTodoDueDate(null);
  }

  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");
  const [todoDueDate, setTodoDueDate] = useState<null | string | string[] | undefined>(null);
  const [todos, setTodos] = useAtom(todosAtom);

  // Debug
  useEffect(() => {
    console.log(todos);
  }, [todos])

  return(
    <div className="Container">

        <CardList />

      <div className={todoInputFieldShowStatus ? "show" : "hidden"}>
        <div className="CreateTodoContainer">
          <IonCard className="PendingCard">
            <IonIcon id="Notifaction" aria-hidden="true" icon={notificationsOutline} onClick={handleShowDateSetField}></IonIcon>
            <IonCardHeader>
              <IonCardTitle>
                <textarea
                  placeholder="Type Card Title" 
                  value={inputTitleValue}
                  onChange={(input) => handeleTitleChange(input)}
                  id="TitleInput"
                />
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <textarea
                placeholder="Type Card Details"
                value={inputContentValue}
                onChange={(input) => handeleContentChange(input)}
                id="ContentInput"
              />
            </IonCardContent>
            <div className="CardMenu">
              <button id="AddBtn" className="CardMenuChild" onClick={handleAdd}><b>Add</b></button>
              <button id="CancelBtn" className="CardMenuChild" onClick={handleCancel}><b>Cancel</b></button>
            </div>
          </IonCard>
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
        </div>
      </div>
      <button id="TodoAdd" onClick={handeleShowTodoInputField}><b>Add Task</b></button>
    </div>
  );
}

export default TodoApp;