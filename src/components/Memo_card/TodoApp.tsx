import { useState, useRef, FormEvent } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import CardList from "./CardList";

import "./TodoApp.css"
import { alarm } from "ionicons/icons";

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
  const handeleTitleChange = (input: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(input.target.value)
    setInputTitleValue(input.target.value)
  }
  const handeleContentChange = (input: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(input.target.value)
    setInputContentValue(input.target.value)
  }

  // Create new Todo
  const handleAdd = (add: { preventDefault: () => void; }) => {
    // Cancel action if more than one input field is empty. 
    if (inputTitleValue === "" || inputContentValue === "") {
      setShowStatus(false);
      // Initialize inputTitleValue and inputContentValue
      setInputTitleValue("");
      setInputContentValue("");
      alert("Your action has canceled due to lack of the title or the content.")
      return;
    } else {
      add.preventDefault();
      const newTodo: CardValue = {
        id: todos.length,
        cardTitle: inputTitleValue,
        cardContent: inputContentValue,
        checked: false,
      };
      // Creae new Todo array
      setTodos([newTodo, ...todos]);
      // Hide todo input field
      setShowStatus(false);
      // Initialize inputTitleValue and inputContentValue
      setInputTitleValue("");
      setInputContentValue("");
    }
  }

  // Cancel adding Todo
  const handleCancel = () => {
    setShowStatus(false);
    setInputTitleValue("");
    setInputContentValue("");
  }

  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");
  const [todos, setTodos] = useState<CardValue[]>([]);

    return(
      <div className="Container">
        <CardList todos={todos} />

        <div className={showStatus ? "show" : "hidden"}>
            <IonCard className="PendingCard">
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
        </div>
        <button id="TodoAdd" onClick={handeleshow}><b>Add Task</b></button>
      </div>
    );
}

export default TodoApp;