
import { TodosInfoType, DateType } from "../../types/calendarTypes";
import "./OneDayTimeTable.css";

function OneDayTimeTable(value: { todosValue: TodosInfoType[]; selectedDate: DateType; }) {
    const {todosValue, selectedDate}: {todosValue: TodosInfoType[], selectedDate: DateType} = value;
    console.log(todosValue);
    if (todosValue.length <= 0) {
        console.log("No todos!")
        return(
            <>
                <div>
                    {`${selectedDate.day}.${selectedDate.month}.${selectedDate.year}`}
                </div>
                <NoElement />
            </>
        )
    } else {
        return(
            <>
                <div>
                    {`${selectedDate.day}.${selectedDate.month}.${selectedDate.year}`}
                </div>
                <div id="timeTableContainer">
                    {todosValue && todosValue.map((todos) => (
                        todos.dueDate && 
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