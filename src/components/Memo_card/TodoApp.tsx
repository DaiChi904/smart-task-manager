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
  }

  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");
  const [todos, setTodos] = useState<CardValue[]>([]);

  // prevent type error
  type generateCardList = () => JSX.Element[];
  const generateCardList:generateCardList = () => {
    return todos.map((value) => {
      return <CardList  todos={value}/>
    })
  }
  

    return(
      <div>
      <div className="CardList">{generateCardList()}</div>
      
      <form className="NewCard" onSubmit={(se) => handleSubmit(se)}>
        <IonCard className="Card">
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
        </IonCard>
        <input type="submit" value="Add Task" id="TodoAdd" />
      </form>
      </div>
    );
}
export default TodoApp;