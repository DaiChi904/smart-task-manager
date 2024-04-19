import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import { todosAtom } from '../Todo/CardCreater';

import { getLastDay, getBeforeMonth, getNextMonth, getDayOfWeek } from '../../utils/date';

import "./MainCalendar.css";
import OneDayTimeTable from './OneDayTimeTable';


type CalendarType = {
    date: {
        year: number,
        month: number,
        day: number,
        dayOfWeek: number,
    },
    todos: null | {
        title: string,
        content: string,
        startDate: string[],
        dueDate: string[],
    }[],
    isToday: boolean,
    ShowLimit: {
        isShowLimitActive: boolean,
        limitedTodos: string[] | null,
    }
}

type YearMonthType = {
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

function MainCalendar() {
    // Get Atom
    const [todos, setTodos] = useAtom(todosAtom);

    const [currentMonth, setCurrentMonth] = useState<CalendarType[]>([]);
    const [beforeMonth, setBeforeMonth] = useState<CalendarType[]>([]);
    const [afterMonth, setAfterMonth] = useState<CalendarType[]>([]);

    // Values related to <oneDayTimeTabe />.
    const [timeTableValue, setTimeTableValue] = useState<TodosInfoType[]>([]);
    const [timeTableSelectedDate, setTimeTableSelectedDate] = useState<DateType>({ year: dateOfToday.getFullYear(), month: dateOfToday.getMonth(), day: dateOfToday.getDate(), dayOfWeek: dateOfToday.getDay() });

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

    const handleSetTimeTable = (todos: TodosInfoType[] | null, selectedDate: DateType) => {
        if (todos === null) {
            alert("Unexpected error has occured.")
        } else {
            setTimeTableValue(todos);
            setTimeTableSelectedDate(selectedDate);
        }
    }

    useEffect(() => {
        const newBeforeMonth: CalendarType[] = [];
        const newCurrentMonth: CalendarType[] = [];
        const newAfterMonth: CalendarType[] = [];

        // Array of day of manth before currentMonth
        const beforeDate = getBeforeMonth(new Date(currentDate.year, currentDate.month));
        for (let bi: number = getLastDay(beforeDate.getMonth()); bi > getLastDay(beforeDate.getMonth()) - getDayOfWeek(new Date(currentDate.year, currentDate.month, 1)); bi--) {
            const newDayOfWeek = getDayOfWeek(new Date());
            const newDate: DateType = {
                year: beforeDate.getFullYear(),
                month: beforeDate.getMonth(),
                day: bi,
                dayOfWeek: newDayOfWeek,
            }
            // append from tail
            newBeforeMonth.unshift({ date: newDate, todos: null, isToday: false, ShowLimit: { isShowLimitActive: false, limitedTodos: null, }, });
        }
        setBeforeMonth([...newBeforeMonth]);

        // Array of day of current Month
        for (let i: number = 1; i <= getLastDay(currentDate.month); i++) {
            const newDayOfWeek = getDayOfWeek(new Date(currentDate.year, currentDate.month, i));
            const newDate: DateType = {
                year: currentDate.year,
                month: currentDate.month,
                day: i,
                dayOfWeek: newDayOfWeek,
            }
            const todosInfo: TodosInfoType[] = [];
            // Search todos.dueDate match to Day or not, one by one.
            todos.forEach((todos) => {
                const todosDueDate = todos.dueDate;
                const todosStartDate = todos.startDate;
                // Splited Order is year[0], month[1], day[2], hour[3], minute[4].
                if (typeof todosDueDate !== "string") return;
                const splitedTodosDueDate = todosDueDate.split("-");
                if (typeof todosStartDate !== "string") return;
                const splitedTodosStartDate = todosStartDate.split("-");

                const newTodosInfo: TodosInfoType = {
                    title: todos.cardTitle,
                    content: todos.cardContent,
                    startDate: splitedTodosStartDate,
                    dueDate: splitedTodosDueDate,
                }

                // Push title to todosInfo if todosDate and I, which is the day, is match.
                if (i < 10 && (`${currentDate.year}` == splitedTodosDueDate[0]) && (`0${currentDate.month + 1}` == splitedTodosDueDate[1])) {
                    const I = `0${i}`;
                    if (I === splitedTodosDueDate[2]) {
                        todosInfo.push(newTodosInfo);
                    }
                } else if ((`${currentDate.year}` == splitedTodosDueDate[0]) && (`0${currentDate.month + 1}` == splitedTodosDueDate[1])) {
                    const I = `${i}`;
                    if (I === splitedTodosDueDate[2]) {
                        todosInfo.push(newTodosInfo);
                    }
                }
            })

            // Create string[] if todosInfo.lengh is more than 4
            const limitedTodosArray: string[] = [];
            if (todosInfo.length > 3) {
                todosInfo.forEach((todos, index) => {
                    if (index >= todosInfo.length) return;
                    if (index >= 3) {
                        limitedTodosArray.pop();
                        limitedTodosArray.push(`${todosInfo.length - 2} infos remaining`);
                    } else {
                        limitedTodosArray.push(todos.title);
                    }
                })
            }

            // Cheack isShowLimitActive is true or false.
            if (todosInfo.length > 3) {
                // Check isToday, then append from head.
                if (dateOfToday.getDate() == i && (currentDate.year === dateOfToday.getFullYear()) && (currentDate.month === dateOfToday.getMonth())) {
                    newCurrentMonth.push({ date: newDate, todos: todosInfo, isToday: true, ShowLimit: { isShowLimitActive: true, limitedTodos: limitedTodosArray, }, });
                } else {
                    newCurrentMonth.push({ date: newDate, todos: todosInfo, isToday: false, ShowLimit: { isShowLimitActive: true, limitedTodos: limitedTodosArray, }, });
                }
            } else {
                // Check isToday, then append from head.
                if (dateOfToday.getDate() == i && (currentDate.year === dateOfToday.getFullYear()) && (currentDate.month === dateOfToday.getMonth())) {
                    newCurrentMonth.push({ date: newDate, todos: todosInfo, isToday: true, ShowLimit: { isShowLimitActive: false, limitedTodos: null, }, });
                } else {
                    newCurrentMonth.push({ date: newDate, todos: todosInfo, isToday: false, ShowLimit: { isShowLimitActive: false, limitedTodos: null, }, });
                }
            }
        }
        setCurrentMonth([...newCurrentMonth]);

        // Array of day of manth after currentMonth
        const afterDate = getNextMonth(new Date(currentDate.year, currentDate.month));
        for (let ai: number = 1; ai <= 42 - newCurrentMonth.length - newBeforeMonth.length; ai++) {
            const newDayOfWeek = getDayOfWeek(new Date(afterDate.getFullYear(), afterDate.getMonth(), ai));
            const newDate: DateType = {
                year: afterDate.getFullYear(),
                month: afterDate.getMonth(),
                day: ai,
                dayOfWeek: newDayOfWeek,
            }
            // append from head
            newAfterMonth.push({ date: newDate, todos: null, isToday: false, ShowLimit: { isShowLimitActive: false, limitedTodos: null, }, });
        }
        setAfterMonth([...newAfterMonth]);
    }, [todos, currentDate]);

    return (
        <>
            <div id="entireContainer">

                <div id="entireCalendarContainer">

                    <div id="calendarMenu">
                        <div className="calendarMenuChild">
                            <div id="date">
                                <b>{yearMonthDisplayer(new Date(currentDate.year, currentDate.month))}</b>
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
                        {[...beforeMonth, ...currentMonth, ...afterMonth].map((allMonth) => (
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

                </div>

                <div id="entireTimeTableContainer">
                    <OneDayTimeTable todosValue={timeTableValue} selectedDate={timeTableSelectedDate} />
                </div>

            </div>
        </>
    )
}

export default MainCalendar;

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

function yearMonthDisplayer(date: Date) {
    const monthList: { [key: number]: string } = {
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