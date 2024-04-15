import { useState } from "react";
import { TodosInfoType } from "./MainCalendar";
import "./OneDayTimeTable.css";

function OneDayTimeTable({value}: {value: TodosInfoType[]}) {
    console.log(value);
    if (value.length <= 0) {
        console.log("No todos!")
        return(
            <NoElement />
        )
    } else {
        return(
            <>
                <div id="timeTableContainer">
                    {value && value.map((todos) => (
                        <div id="innerTableElement">
                            <h1>{todos.title}</h1>
                            <p>{todos.content}</p>
                            <p>by {todos.dueDate[2]}.{todos.dueDate[1]}.{todos.dueDate[0]}<br />{todos.dueDate[3]}:{todos.dueDate[4]}</p>
                        </div>
                    ))}
                </div>
            </>
        )
    }
    
}

export default OneDayTimeTable;

function NoElement() {
    return(
        <div id="timeTableContainer">
            <div id="innerTableElement">
                <p>There is no todos on this day.</p>
            </div>
        </div>
    )
}