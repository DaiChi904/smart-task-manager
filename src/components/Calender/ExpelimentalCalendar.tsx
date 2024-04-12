import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { todosAtom } from '../Memo_card/TodoApp';

import { getLastDay, getBeforeMonth, getNextMonth, getDayOfWeek } from '../../utils/date';

import "./expeliment.css";


type CalendarType = {
    day: number,
    todos: null | string[],
    isToday: boolean,
}

type DateType = {
    year: number,
    month: number,
    day: number,
    dayOfWeek: number,
}

// Get date of today
const dateOfToday = new Date();

function ExpCalendar() {
    // Get Atom
    const [todos, setTodos] = useAtom(todosAtom);

    const [renderArray_CurrentDate, setRenderArray_CurrentDate] = useState<CalendarType[]>([]);
    const [renderArray_BeforeDate, setRenderArray_BeforeDate] = useState<CalendarType[]>([]);
    const [renderArray_AfterDate, setRenderArray_AfterDate] = useState<CalendarType[]>([]);

    // Date which is selected
    const [currentDate, setCurrentDate] = useState<DateType>({ year: dateOfToday.getFullYear(), month: dateOfToday.getMonth(), day: dateOfToday.getDate(), dayOfWeek: dateOfToday.getDay(), });

    useEffect(() => {
        const newBeforeRenderArray: CalendarType[] = [];
        const newCurrentRenderArray: CalendarType[] = [];
        const newAfterRenderArray: CalendarType[] = [];

        // Array of day of manth before currentMonth
        const beforeDate = getBeforeMonth(new Date(currentDate.year, currentDate.month))
        for (let bi: number = getLastDay(beforeDate.getMonth()); bi > getLastDay(beforeDate.getMonth()) - getDayOfWeek(new Date(currentDate.year, currentDate.month, 1)); bi--) {
            const DayOfWeek = getDayOfWeek(new Date())
            const newDate: DateType = {
                year: beforeDate.getFullYear(),
                month: beforeDate.getMonth(),
                day: bi,
                dayOfWeek: DayOfWeek,
            }
            // append from tail
            newBeforeRenderArray.unshift({ day: newDate.day, todos: null, isToday: false });
        }
        setRenderArray_BeforeDate([...newBeforeRenderArray]);

        // Array of day of current Month
        for (let i: number = 1; i <= getLastDay(currentDate.month); i++) {
            const DayOfWeek = getDayOfWeek(new Date(currentDate.year, currentDate.month, i));
            const newDate: DateType = {
                year: currentDate.year,
                month: currentDate.month,
                day: i,
                dayOfWeek: DayOfWeek,
            }
            const todosArray: string[] = [];
            // Search todos.dueDate match to Day or not, one by one.
            todos.map((todos) => {
                const todosDate = todos.dueDate;
                if (typeof todosDate !== "string") return alert("Unexpected error has ocuured.")
                // Splited Order is year[0], month[1], day[2], hour[3], minute[4].
                const splitedTodosDate = todosDate.split("-");

                const title = todos.cardTitle;

                // Push title to todosArray if todosDate and I, which is the day, is match.
                if (i < 10) {
                    const I = `0${i}`;
                    if (I === splitedTodosDate[2]) {
                        todosArray.push(title);
                        return;
                    } else {
                        return;
                    }
                } else {
                    const I = `${i}`;
                    if (I === splitedTodosDate[2]) {
                        todosArray.push(title);
                        return;
                    } else {
                        return;
                    }
                }
            })
            // append from head
            if (currentDate.day == i) {
                newCurrentRenderArray.push({ day: newDate.day, todos: todosArray, isToday: true });
            } else {
                newCurrentRenderArray.push({ day: newDate.day, todos: todosArray, isToday: false });
            }

        }
        setRenderArray_CurrentDate([...newCurrentRenderArray]);

        // Array of day of manth after currentMonth
        const afterDate = getNextMonth(new Date(currentDate.year, currentDate.month));
        for (let ai: number = 1; ai <= 42 - newCurrentRenderArray.length - newBeforeRenderArray.length; ai++) {
            const DayOfWeek = getDayOfWeek(new Date(afterDate.getFullYear(), afterDate.getMonth(), ai))
            const newDate: DateType = {
                year: afterDate.getFullYear(),
                month: afterDate.getMonth(),
                day: ai,
                dayOfWeek: DayOfWeek,
            }
            // append from head
            newAfterRenderArray.push({ day: newDate.day, todos: null, isToday: false });
        }
        setRenderArray_AfterDate([...newAfterRenderArray]);
    }, [todos, currentDate])

    console.log(renderArray_BeforeDate, renderArray_CurrentDate, renderArray_AfterDate)

    return (
        <>
            <div>
                {dateDisplayer(new Date(currentDate.year, currentDate.month))}
            </div>
            <div className='container'>

                <CalendarHeader />
                
                {[...renderArray_BeforeDate, ...renderArray_CurrentDate, ...renderArray_AfterDate].map((renderArray) => (
                    <div className={renderArray.isToday ? "testTrue" : "testFalse"}>
                        {renderArray.day}
                        {renderArray.todos && renderArray.todos.map((todos) => (
                            <div className="test">
                                {todos}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </>
    )
}

export default ExpCalendar;

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

function dateDisplayer(date: Date) {
    const monthList: {[key: number]: string} = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "Ocutober",
        10: "Nobember",
        11: "December",
    }
    return (
        `${monthList[date.getMonth()]} ${date.getFullYear()}`
    )
}