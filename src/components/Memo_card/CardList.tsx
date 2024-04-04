// Management and Editing for Todos

import { useState, useContext, useRef, MouseEvent, SetStateAction } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import { CardValue, TodosContext } from "./TodoApp";

type CardProps = {
    todos:{
        id: number;
        cardTitle: string;
        cardContent: string;
        checked: boolean;
    }[]
  }

function CardList() {
  const TodosArray = useContext(TodosContext);
    // Get input Values of card
    const handeleTitleChange = (edit: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditTitleValue(edit.target.value)
    }
    const handeleContentChange = (edit: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditContentValue(edit.target.value)
    }

    // Set values related to editing cards
    const [editTitleValue, setEditTitleValue] = useState("");
    const [editContentValue, setEditContentValue] = useState("");
    const [editingCardID, setEditingCardID] = useState<number>();

    const [showStatus, setShowStatus] = useState(false) 
    const handleEdit = (id: number, cardTitle: string, cardContent: string) => {
        alert("You clicked card");
        setShowStatus(true);
        setEditTitleValue(cardTitle);
        setEditContentValue(cardContent);
        setEditingCardID(id);
    }

    const handleConfirmEdit = () => {
        setShowStatus(false);
        // Create new edited card
        const newTodo: CardValue = {
          id: TodosArray.todos.length,
          cardTitle: editTitleValue,
          cardContent: editContentValue,
          checked: false,
        };
        // Delete the card which is pre-edited
        const pendingTodos = TodosArray.todos.filter((pendingTodosArray) => {
          if (pendingTodosArray.id === editingCardID) {
            return false
          } else {
            return pendingTodosArray;
          };
        });
        // Create editied todos array
        TodosArray.setTodos([newTodo, ...pendingTodos]);
    }

    const handleCancelEdit = () => {
        setShowStatus(false);
    }

    const handleDelete = () => {
      const pendingTodos = TodosArray.todos.filter((pendingTodosArray) => {
        if (pendingTodosArray.id === editingCardID) {
          return false
        } else {
          return pendingTodosArray;
        };
      });
      // Significant bug exist. It is needed to investigate. Maybe it is because of id is set by todos(array) length. It needs completely unique id.
      TodosArray.setTodos([...pendingTodos]);
      setShowStatus(false);
    }

    return(
        <div className="Container">
            <div className="CardList">
                {TodosArray.todos.map((todos) => (
                    <IonCard className="Card" onClick={() => handleEdit(todos.id, todos.cardTitle, todos.cardContent)}>
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

            <div className={showStatus ? "show" : "hidden"}>
            <IonCard className="PendingCard">
              <IonCardHeader>
                <IonCardTitle>
                  <textarea
                    placeholder="Type Card Title" 
                    value={editTitleValue}
                    onChange={(edit) => handeleTitleChange(edit)}
                    id="TitleEdit"
                  />
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <textarea
                  placeholder="Type Card Details"
                  value={editContentValue}
                  onChange={(edit) => handeleContentChange(edit)}
                  id="ContentEdit"
                />
              </IonCardContent>
              <div className="CardMenu">
                <button id="ConfirmEditBtn" className="CardMenuChild" onClick={handleConfirmEdit}><b>Confirm</b></button>
                <button id="DeleteBtn" className="CardMenuChild" onClick={handleDelete}><b>Delete</b></button>
                <button id="CancelEditBtn" className="CardMenuChild" onClick={handleCancelEdit}><b>Cancel</b></button>
              </div>
            </IonCard>
            </div>
        </div>
    );
}

export default CardList;
