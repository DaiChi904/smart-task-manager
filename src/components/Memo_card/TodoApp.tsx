import { useState, useRef, FormEvent } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import CardList from "./CardList";

import "./TodoApp.css"

function TodoApp() {
  type CardValue = {
    id: number;
    cardTitle: string;
    cardContent: string;
    checked: boolean;
  }

  // Show or hide todo input field by pressing AddTask
  const [showStatus, setShowStatus] = useState(false) 
  const handeleshow = () => {
    setShowStatus(true)
  }

  // Get input Values of card
  const handeleTitleChange = (ie: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(ie.target.value)
    setInputTitleValue(ie.target.value)
  }
  const handeleContentChange = (ie: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(ie.target.value)
    setInputContentValue(ie.target.value)
  }

  // Create new Todo
  const handleSubmit = (se: FormEvent<HTMLFormElement>) => {
    se.preventDefault();
    const newTodo: CardValue = {
      id: todos.length,
      cardTitle: inputTitleValue,
      cardContent: inputContentValue,
      checked: false,
    }
    
    setTodos([newTodo, ...todos])

    //Hide todo input field
    setShowStatus(false);
  }

  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");
  const [todos, setTodos] = useState<CardValue[]>([]);

    return(
      <div className="Container">
        <CardList todos={todos} />

        <div className={showStatus ? "show" : "hidden"}>
          <form onSubmit={(se) => handleSubmit(se)}>
            <IonCard className="PendingCard">
              <IonCardHeader>
                <IonCardTitle>
                  <textarea
                    placeholder="Type Card Title" 
                    onChange={(ie) => handeleTitleChange(ie)}
                    id="TitleInput"
                  />
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <textarea
                  placeholder="Type Card Details"
                  onChange={(ie) => handeleContentChange(ie)}
                  id="ContentInput"
                />
              </IonCardContent>
              <input type="submit" value="Add" id="AddBtn"/>
            </IonCard>
          </form>
        </div>
        <button id="TodoAdd" onClick={handeleshow}><b>Add Task</b></button>
      </div>
    );
}
export default TodoApp;