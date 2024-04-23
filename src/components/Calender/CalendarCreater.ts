import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { todosAtom } from "../Todo/CardCreater";
import { getLastMonth, getLastDay, getDayOfWeek, getNextMonth } from "../../utils/date";
import { DateType, TodosInfoType, YearMonthType } from "./CoreCalendar";

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
    },
}

export type AllCalendarType = {
    lastMonth: CalendarType[],
    currentMonth: CalendarType[],
    nextMonth: CalendarType[],
}

// Get date of today
const dateOfToday = new Date();

/**
 * Create object which is constructed by three object array, lastMonth, currentMonth and nextMonth.
 * The three object array is created for the condition of selectedDate, which is month selected by user in the calendar.
 * 
 * @param currentDate 
 */
export default function CalendarCreater(currentDate: YearMonthType) {
    // Get Atom
    const [todos, setTodos] = useAtom(todosAtom);

    const [lastMonth, setLastMonth] = useState<CalendarType[]>([]);
    const [currentMonth, setCurrentMonth] = useState<CalendarType[]>([]);
    const [nextMonth, setNextMonth] = useState<CalendarType[]>([]);
    const [allMonth, setAllMonth] = useState<AllCalendarType>();

    useEffect(() => {
        const newLastMonth: CalendarType[] = [];
        const newCurrentMonth: CalendarType[] = [];
        const newNextMonth: CalendarType[] = [];

        // Array of day of manth before currentMonth
        const beforeDate = getLastMonth(new Date(currentDate.year, currentDate.month));
        for (let bi: number = getLastDay(beforeDate.getMonth()); bi > getLastDay(beforeDate.getMonth()) - getDayOfWeek(new Date(currentDate.year, currentDate.month, 1)); bi--) {
            const newDayOfWeek = getDayOfWeek(new Date());
            const newDate: DateType = {
                year: beforeDate.getFullYear(),
                month: beforeDate.getMonth(),
                day: bi,
                dayOfWeek: newDayOfWeek,
            }
            // append from tail
            newLastMonth.unshift({ date: newDate, todos: null, isToday: false, ShowLimit: { isShowLimitActive: false, limitedTodos: null, }, });
        }
        setLastMonth([...newLastMonth]);

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
        for (let ai: number = 1; ai <= 42 - newCurrentMonth.length - newLastMonth.length; ai++) {
            const newDayOfWeek = getDayOfWeek(new Date(afterDate.getFullYear(), afterDate.getMonth(), ai));
            const newDate: DateType = {
                year: afterDate.getFullYear(),
                month: afterDate.getMonth(),
                day: ai,
                dayOfWeek: newDayOfWeek,
            }
            // append from head
            newNextMonth.push({ date: newDate, todos: null, isToday: false, ShowLimit: { isShowLimitActive: false, limitedTodos: null, }, });
        }
        setNextMonth([...newNextMonth]);

        setAllMonth({lastMonth: newLastMonth, currentMonth: newCurrentMonth, nextMonth: newNextMonth});
    }, [todos, currentDate]);

    return allMonth;
}