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

type YearMonthType = {
    year: number,
    month: number,
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

    const [currentMonth, setCurrentMonth] = useState<CalendarType[]>([]);
    const [beforeMonth, setBeforeMonth] = useState<CalendarType[]>([]);
    const [afterMonth, setAfterMonth] = useState<CalendarType[]>([]);

    // Date of year and month which is selected
    const [currentDate, setCurrentDate] = useState<YearMonthType>({ year: dateOfToday.getFullYear(), month: dateOfToday.getMonth() });

    const handleSetBeforeMonth = () => {
        const beforeDate = getBeforeMonth(new Date(currentDate.year, currentDate.month));
        setCurrentDate({ year: beforeDate.getFullYear(), month: beforeDate.getMonth() });
    }
    const handleSetNextMonth = () => {
        const nextDate = getNextMonth(new Date(currentDate.year, currentDate.month));
        setCurrentDate({ year: nextDate.getFullYear(), month: nextDate.getMonth() });
    }

    useEffect(() => {
        const newBeforeMonth: CalendarType[] = [];
        const newCurrentMonth: CalendarType[] = [];
        const newAfterMonth: CalendarType[] = [];

        // Array of day of manth before currentMonth
        const beforeDate = getBeforeMonth(new Date(currentDate.year, currentDate.month));
        for (let bi: number = getLastDay(beforeDate.getMonth()); bi > getLastDay(beforeDate.getMonth()) - getDayOfWeek(new Date(currentDate.year, currentDate.month, 1)); bi--) {
            const dayOfWeek = getDayOfWeek(new Date());
            const newDate: DateType = {
                year: beforeDate.getFullYear(),
                month: beforeDate.getMonth(),
                day: bi,
                dayOfWeek: dayOfWeek,
            }
            // append from tail
            newBeforeMonth.unshift({ day: newDate.day, todos: null, isToday: false });
        }
        setBeforeMonth([...newBeforeMonth]);

        // Array of day of current Month
        for (let i: number = 1; i <= getLastDay(currentDate.month); i++) {
            const dayOfWeek = getDayOfWeek(new Date(currentDate.year, currentDate.month, i));
            const newDate: DateType = {
                year: currentDate.year,
                month: currentDate.month,
                day: i,
                dayOfWeek: dayOfWeek,
            }
            const todosArray: string[] = [];
            // Search todos.dueDate match to Day or not, one by one.
            todos.forEach((todos) => {
                const todosDate = todos.dueDate;
                if (typeof todosDate !== "string") return alert("Unexpected error has ocuured.");
                // Splited Order is year[0], month[1], day[2], hour[3], minute[4].
                const splitedTodosDate = todosDate.split("-");

                const title = todos.cardTitle;

                // Push title to todosArray if todosDate and I, which is the day, is match.
                if (i < 10) {
                    const I = `0${i}`;
                    if (I === splitedTodosDate[2]) {
                        todosArray.push(title);
                    }
                    return;
                } else {
                    const I = `${i}`;
                    if (I === splitedTodosDate[2]) {
                        todosArray.push(title);
                    }
                    return;
                }
            })
            // append from head
            if (dateOfToday.getDate() == i && (currentDate.year === dateOfToday.getFullYear()) && (currentDate.month === dateOfToday.getMonth())) {
                newCurrentMonth.push({ day: newDate.day, todos: todosArray, isToday: true });
            } else {
                newCurrentMonth.push({ day: newDate.day, todos: todosArray, isToday: false });
            }

        }
        setCurrentMonth([...newCurrentMonth]);

        // Array of day of manth after currentMonth
        const afterDate = getNextMonth(new Date(currentDate.year, currentDate.month));
        for (let ai: number = 1; ai <= 42 - newCurrentMonth.length - newBeforeMonth.length; ai++) {
            const dayOfWeek = getDayOfWeek(new Date(afterDate.getFullYear(), afterDate.getMonth(), ai));
            const newDate: DateType = {
                year: afterDate.getFullYear(),
                month: afterDate.getMonth(),
                day: ai,
                dayOfWeek: dayOfWeek,
            }
            // append from head
            newAfterMonth.push({ day: newDate.day, todos: null, isToday: false });
        }
        setAfterMonth([...newAfterMonth]);
    }, [todos, currentDate]);

    return (
        <>
            <div id="entireContainer">

                

                <div className="container">
                    
                    <div id="calendarMenu">
                        <div className="calendarMenuChild">
                            <div id="date">
                                <b>{dateDisplayer(new Date(currentDate.year, currentDate.month))}</b>
                            </div>
                        </div>
                        <div className="calendarMenuChild">
                            <button className="calendarMenuButton" onClick={handleSetBeforeMonth}><span><b>&lt;</b></span></button>
                            <b>|</b>
                            <button className="calendarMenuButton" onClick={handleSetNextMonth}><span><b>&gt;</b></span></button>
                        </div>
                    </div>
                    
                    <div id="calendarContainer">
                        <CalendarHeader />
                        {[...beforeMonth, ...currentMonth, ...afterMonth].map((renderArray) => (
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

                </div>
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