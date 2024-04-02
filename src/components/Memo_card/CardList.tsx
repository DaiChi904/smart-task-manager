import { useState, useRef, MouseEvent } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import CardSetuper from "./CardSetuper";

type CardProps = {
    todos:{
        id: number;
        cardTitle: string;
        cardContent: string;
        checked: boolean;
    }[]
  }

function CardList(todos: CardProps) {
    return(
        <div className="CardList">
            {todos.todos.map((todos) => (
                <IonCard className="Card">
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
    );
}

export default CardList;
