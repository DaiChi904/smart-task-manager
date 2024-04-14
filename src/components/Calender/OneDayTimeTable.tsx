import { useState } from "react";
import { TodosInfoType } from "./MainCalendar";
import "./OneDayTimeTable.css";

function OneDayTimeTable({value}: {value: TodosInfoType[]}) {
    const handleConsole = () => {
        console.log(value);
    }
    return(
        <>
            <div id="timeTableContainer">
                <div className="test">
                    <button onClick={handleConsole}>コンソールに出力</button>
                </div>

            </div>
        </>
    )
}

export default OneDayTimeTable;