import { useState, useRef, MouseEvent, SetStateAction } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

type CardProps = {
    todos:{
        id: number;
        cardTitle: string;
        cardContent: string;
        checked: boolean;
    }[]
  }

function CardList(todos: CardProps) {
    // Get input Values of card
    const handeleTitleChange = (edit: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(edit.target.value)
        setEditTitleValue(edit.target.value)
    }
    const handeleContentChange = (edit: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(edit.target.value)
        setEditContentValue(edit.target.value)
    }

    const [editTitleValue, setEditTitleValue] = useState("");
    const [editContentValue, setEditContentValue] = useState("");

    const [showStatus, setShowStatus] = useState(false) 
    const handleEdit = (id: number, cardTitle: string, cardContent: string) => {
        alert("You clicked card");
        setShowStatus(true);
        setEditTitleValue(cardTitle);
        setEditContentValue(cardContent);
    }

    const handleConfirmEdit = () => {
        setShowStatus(false);
    }

    const handleCancelEdit = () => {
        setShowStatus(false);
    }

    const handleDelete = () => {

    }

    return(
        <div className="Container">
            <div className="CardList">
                {todos.todos.map((todos) => (
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
