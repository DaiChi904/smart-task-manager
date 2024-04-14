import { useState } from "react";
import { TodosInfoType } from "./MainCalendar";
import "./OneDayTimeTable.css";

function OneDayTimeTable({value}: {value: TodosInfoType[]}) {
    if (!value) {
        console.log("No todos!")
        return(
            <div id="timeTableContainer">
                <div id="innerTableElement">
                    <p>There is no todos on this day.</p>
                </div>
            </div>
        )
    } else {
        return(
            <>
                <div id="timeTableContainer">
                    {value && value.map((todos) => (
                        <div id="innerTableElement">
                            <h1>{todos.title}</h1>
                            <p>{todos.content}</p>
                        </div>
                    ))}
                </div>
            </>
        )
    }
    
}

export default OneDayTimeTable;