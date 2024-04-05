// Management and Editing for Todos

import { useState, useContext, useRef, MouseEvent, SetStateAction } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { IonDatetime, IonDatetimeButton } from '@ionic/react';
import { IonButton, IonButtons } from '@ionic/react'

import { CardValue } from "./TodoApp";
import { notificationsOutline } from "ionicons/icons";
import { useAtom } from "jotai";
import { todosAtom } from "./TodoApp";

// This type definition is needless at this time, but leaveing it unchanged just in case.
type CardProps = {
  todos:{
    id: number;
    cardTitle: string;
    cardContent: string;
    checked: boolean;
  }[]
}

function CardList() {
  const handeleTitleChange = (edit: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTitleValue(edit.target.value)
  }
  const handeleContentChange = (edit: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditContentValue(edit.target.value)
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
    // Change the state of IonDatetime Compornent
    editDueDate.current?.confirm();

    const editDate = editDueDate.current?.value;
    setEditTodoDueDate(editDate);
    setTodoDateSetFieldShowStatus(false);
  };
  const EditDateClear = () => {
    // Change the state of IonDatetime Compornent
    editDueDate.current?.reset();

    setEditTodoDueDate(null);
    setTodoDateSetFieldShowStatus(false);
  }
  const EditDateCancel = () => {
    // Change the state of IonDatetime Compornent
    editDueDate.current?.cancel();
    
    setTodoDateSetFieldShowStatus(false);
  }

  const [todos, setTodos] = useAtom(todosAtom)
  // Set values related to editing cards
  const [editTitleValue, setEditTitleValue] = useState("");
  const [editContentValue, setEditContentValue] = useState("");
  const [editingCardID, setEditingCardID] = useState<number>();
  const [editTodoDueDate, setEditTodoDueDate] = useState<null | string | string[] | undefined>(null);

  // States which are related to show or hide input field by pressing paticular elements.
  const [showStatus, setShowStatus] = useState(false);
  const [todoDateSetFieldShowStatus, setTodoDateSetFieldShowStatus] = useState(false);

  // !Important: The type of dueDate should be fixed.
  const handleEdit = (id: number, cardTitle: string, cardContent: string, dueDate: null | string | string[] | undefined) => {
    alert("You clicked card");
    setShowStatus(true);
    setEditTitleValue(cardTitle);
    setEditContentValue(cardContent);
    setEditTodoDueDate(dueDate);
    setEditingCardID(id);
  }

  const handleConfirmEdit = () => {
    setShowStatus(false);
    // Create new edited card
    const newTodo: CardValue = {
      id: todos.length,
      cardTitle: editTitleValue,
      cardContent: editContentValue,
      checked: false,
      dueDate: editTodoDueDate,
    };
    // Delete the card which is pre-edited
    const pendingTodos = todos.filter((pendingtodos) => {
      if (pendingtodos.id === editingCardID) {
        return false
      } else {
        return pendingtodos;
      };
    });
    // Create editied todos array
    setTodos([newTodo, ...pendingTodos]);
  }

  const handleCancelEdit = () => {
    setShowStatus(false);
  }

  const handleDelete = () => {
    const pendingTodos = todos.filter((pendingtodos) => {
      if (pendingtodos.id === editingCardID) {
        return false
      } else {
        return pendingtodos;
      };
    });
    // Significant bug exist. It is needed to investigate. Maybe it is because of id is set by todos(array) length. It needs completely unique id.
    setTodos([...pendingTodos]);
    setShowStatus(false);
  }
  
  return(
    <div className="Container">
      <div className="CardList">
        {todos.map((todos) => (
          <IonCard className="Card" onClick={() => handleEdit(todos.id, todos.cardTitle, todos.cardContent, todos.dueDate)}>
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
        <div className="CreateTodoContainer">
          <IonCard className="PendingCard">
            <IonCardHeader>
              <IonIcon id="Notifaction" aria-hidden="true" icon={notificationsOutline} onClick={handleShowDateSetField}></IonIcon>
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
        </div>
      </div>
    </div>
  );
}

export default CardList;
