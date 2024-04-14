import { useState } from "react";
import { TodosInfoType } from "./MainCalendar";
import "./OneDayTimeTable.css";

function OneDayTimeTable({value}: {value: TodosInfoType[]}) {
    return(
        <>
            <div id="timeTableContainer">
                {value && value.map((todos) => (
                    <div id="innnerTableElement">
                        {todos.title}
                    </div>
                ))}
            </div>
        </>
    )
}

export default OneDayTimeTable;