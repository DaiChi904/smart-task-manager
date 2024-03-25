import CardAdder from "./cardadder";
import { useState, useRef } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

type CardValue = {
    id: number;
    cardTitle: string;
    cardContent: string;
    checked: boolean;
  }

function CardList({todos}: {todos:CardValue}) {
    return(
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
    );
}

export default CardList;