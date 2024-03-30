import { useState, useRef, MouseEvent, Key } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

type CardValue = {
    id: number;
    cardTitle: string;
    cardContent: string;
    checked: boolean;
  }

function CardSetuper({todos}: {todos:CardValue}) {
    const handleEdit = (edit: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        console.log("edit");
    }
    
    const handleDelete = (del: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        console.log("del");
    }

    {/*
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    setEditTitle(todos.cardTitle);
    setEditContent(todos.cardContent);
    */}
    return(
        <div>
            <IonCard className="Card">
                <div className="CardMenu">
                    <button className="CardMenuChild" onClick={(edit) => handleEdit(edit)} >編集</button>
                    <button className="CardMenuChild" onClick={(del) => handleDelete(del)} >削除</button>
                </div>
                <IonCardHeader>
                    <IonCardTitle>
                        <div id="Title" key={todos.id}>{todos.cardTitle}</div>
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <div id="Content" key={todos.id}>{todos.cardContent}</div>
                </IonCardContent>
            </IonCard>
        </div>
    );
}

export default CardSetuper;
