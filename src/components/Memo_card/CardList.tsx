import CardAdder from "./cardadder";
import { useState, useRef } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

type CardValue = {
    map(arg0: (todos: CardValue) => import("react/jsx-runtime").JSX.Element): unknown;
    id: number;
    cardTitle: string;
    cardContent: string;
    checked: boolean;
  }

function CardList({todos}: {todos:CardValue}) {
    return(
        <>
        {todos.map((todos:CardValue) => (
        <div>
            <IonCard>
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
        ))}
        </>
    );
}

export default CardList;