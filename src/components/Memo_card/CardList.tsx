import { useState, useRef, MouseEvent } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import CardSetuper from "./CardSetuper";

type CardValue = {
    id: number;
    cardTitle: string;
    cardContent: string;
    checked: boolean;
  }

function CardList({todos}: {todos:CardValue}) {
    const handlePopup = (ep: MouseEvent<HTMLIonCardElement, globalThis.MouseEvent>) => {
        <CardSetuper todos={todos} />
    }
    return(
        <div>
            <IonCard className="Card" onClick={(ep) => handlePopup(ep)}>
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

export default CardList;
