import { useState } from 'react';

import "./MainCalendar.css";
import OneDayTimeTable from './OneDayTimeTable';
import CalendarCreater from './CalendarCreater';

export type YearMonthType = {
    year: number,
    month: number,
}

export type TodosInfoType = {
    title: string,
    content: string,
    startDate: string[],
    dueDate: string[],
}

export type DateType = {
    year: number,
    month: number,
    day: number,
    dayOfWeek: number,
}

// Get date of today
const dateOfToday = new Date();

function CoreCalendar({selectedDate}: {selectedDate: YearMonthType}) {
    // Values related to <oneDayTimeTabe />.
    const [timeTableValue, setTimeTableValue] = useState<TodosInfoType[]>([]);
    const [timeTableSelectedDate, setTimeTableSelectedDate] = useState<DateType>({ year: dateOfToday.getFullYear(), month: dateOfToday.getMonth(), day: dateOfToday.getDate(), dayOfWeek: dateOfToday.getDay() });

    const handleSetTimeTable = (todos: TodosInfoType[] | null, selectedDate: DateType) => {
        if (todos === null) {
            alert("Unexpected error has occured.")
        } else {
            setTimeTableValue(todos);
            setTimeTableSelectedDate(selectedDate);
        }
    }

    const allMonth = CalendarCreater(selectedDate);
    console.log(allMonth);

    return (
        <>
            <div id="calendarContainer">
                <CalendarHeader />
                {allMonth && [...allMonth.lastMonth, ...allMonth.currentMonth, ...allMonth.nextMonth].map((allMonth) => (
                <div className={allMonth.isToday ? "testTrue" : "testFalse"} onClick={() => handleSetTimeTable(allMonth.todos, allMonth.date)}>
                    {allMonth.date.day}
                    {allMonth.ShowLimit.isShowLimitActive ? allMonth.ShowLimit.limitedTodos && allMonth.ShowLimit.limitedTodos.map((limitedTodos) => (
                        <div className="test">
                            {limitedTodos}
                        </div>
                    )) : allMonth.todos && allMonth.todos.map((todos) => (
                        <div className="test">
                            {todos.title}
                        </div>
                    ))}
                </div>
                ))}
            </div>

            <div id="entireTimeTableContainer">
                <OneDayTimeTable todosValue={timeTableValue} selectedDate={timeTableSelectedDate} />
            </div>
        </>
    )
}

export default CoreCalendar;

/**
 * Header of calendar
 */
function CalendarHeader() {
    return (
        <>
            <div className='Calendar-DateBox'>Sun</div>
            <div className='Calendar-DateBox'>Mon</div>
            <div className='Calendar-DateBox'>Tue</div>
            <div className='Calendar-DateBox'>Wed</div>
            <div className='Calendar-DateBox'>Thu</div>
            <div className='Calendar-DateBox'>Fri</div>
            <div className='Calendar-DateBox'>Sat</div>
        </>
    )
}