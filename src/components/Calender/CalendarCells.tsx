import { todosAtom } from "../Todo/CardCreater";
import { TodosAtomType } from "../../types/todoTypes";
import { AllCalendarType, CalendarType, DateType, TodosInfoType } from "../../types/calendarTypes";

export default function CalendarCells({allMonth}: {allMonth: AllCalendarType | undefined}) {

    const handleSetTimeTable = (todos: TodosInfoType[] | null, date: DateType) => {
        console.log("you clicked");
    }

    return(
        <>
            {allMonth && [...allMonth.lastMonth, ...allMonth.currentMonth, ...allMonth.nextMonth].map((allMonth) => (
                <div className={allMonth.status.isToday ? "testTrue" : "testFalse"} onClick={() => handleSetTimeTable(allMonth.todos, allMonth.date)}>
                    {allMonth.date.day}
                    {allMonth.status.isShowLimitActive ?
                        allMonth.todos && allMonth.todos.map((limitedTodos) => (
                        <div className={`cellElements_isStartDate_${limitedTodos.isStartDate}`}>
                            {limitedTodos.title}
                        </div>
                        )) : allMonth.todos && allMonth.todos.map((todos) => (
                        <div className={`cellElements_isStartDate_${todos.isStartDate}`}>
                            {todos.title}
                        </div>
                        ))
                    }
                </div>
            ))}
        </>
    )
}