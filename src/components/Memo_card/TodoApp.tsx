// Core part of this App. Create new todos and displying Todo List is main role of this Compornent. Additionaly, the core content of Todos and setTodos, which is this App, is difined in this compornent as a TodosContext.

import { useState, createContext, useRef, FormEvent } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { IonDatetime } from "@ionic/react";
import { IonButtons, IonButton } from "@ionic/react";
import CardList from "./CardList";

import "./TodoApp.css"

import { notificationsOutline } from 'ionicons/icons';

// The code which just only below might not need to "export".
export type CardValue = {
  id: number;
  cardTitle: string;
  cardContent: string;
  checked: boolean;
  dueDate: any;
}

export type TodosContextType = {
  todos: CardValue[],
  setTodos: React.Dispatch<React.SetStateAction<CardValue[]>>
}

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
})

function TodoApp() {
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
  const confirm = () => {
    dueDate.current?.confirm();
    const Date = dueDate.current?.value;
    setTodoDueDate(Date);
    setTodoDateSetFieldShowStatus(false);
  };

  const cancel = () => {
    setTodoDateSetFieldShowStatus(false);
  }

  // Create new Todo
  const handleAdd = (add: { preventDefault: () => void; }) => {
    // Cancel action if more than one input field is empty. 
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
      // Initialize inputTitleValue and inputContentValue
      setInputTitleValue("");
      setInputContentValue("");
    }
  }

  // Cancel adding Todo
  const handleCancel = () => {
    setTodoInputFieldShowStatus(false);
    // Initialize inputTitleValue and inputContentValue
    setInputTitleValue("");
    setInputContentValue("");
  }

  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");
  const [todoDueDate, setTodoDueDate] = useState<null | string | string[] | undefined>(null);
  const [todos, setTodos] = useState<CardValue[]>([]);
  return(
    <div className="Container">
      <TodosContext.Provider value={{todos, setTodos}}>
        <CardList />
      </TodosContext.Provider>

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
                  <IonButton color="primary" onClick={confirm}>Set</IonButton>
                  <IonButton color="primary" onClick={cancel}>Cancel</IonButton>
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