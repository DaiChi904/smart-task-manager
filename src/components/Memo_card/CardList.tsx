import { useState, useRef, MouseEvent } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

type CardValue = {
    id: number;
    cardTitle: string;
    cardContent: string;
    checked: boolean;
  }

const handleEdit = (edit: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    console.log("edit");
}

const handleDelete = (del: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    console.log("del");
}

function CardList({todos}: {todos:CardValue}) {
    return(
        <div>
            <IonCard className="Card">
                <div className="CardMenu">
                    <button className="CardMenuChild" onClick={(edit) => handleEdit(edit)} >編集</button>
                    <button className="CardMenuChild" onClick={(del) => handleDelete(del)} >削除</button>
                </div>
                <IonCardHeader>
                    <IonCardTitle>
                        <div>{todos.cardTitle}</div>
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <div>{todos.cardContent}</div>
                </IonCardContent>
            </IonCard>
        </div>
    );
}

export default CardList;