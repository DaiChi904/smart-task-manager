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
        startDate: string[] | null,
        dueDate: string[] | null,
        cheacked: boolean,
        isInProgress: boolean,
        isExpired: boolean,
        isStartDate: boolean,
    }[],
    status: {
        isToday: boolean,
        isShowLimitActive: boolean,
    }
    limitedTodos: string[] | null,
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
            newLastMonth.unshift({ date: newDate, todos: null, status: {isToday: false, isShowLimitActive: false}, limitedTodos: null });
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
                const splitedTodosStartDate = getSplitedDate(todosStartDate);
                const splitedTodosDueDate = getSplitedDate(todosDueDate);

                const checkedValue = statusCheacker(todosStartDate, todosDueDate, todos.checked);


                // Push title to todosInfo if todosDate and I, which is the day, is match.
                if (splitedTodosDueDate === null) {
                    return;
                } else {
                    const newTodosInfo: TodosInfoType = {
                        title: todos.cardTitle,
                        content: todos.cardContent,
                        startDate: splitedTodosStartDate,
                        dueDate: splitedTodosDueDate,
                        cheacked: todos.checked,
                        isInProgress: checkedValue.newIsProgress,
                        isExpired: checkedValue.newIsExpired,
                        isStartDate: false,
                    }

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
                }

                if (splitedTodosStartDate === null) {
                    return;
                } else {
                    const newTodosInfo: TodosInfoType = {
                        title: todos.cardTitle,
                        content: todos.cardContent,
                        startDate: splitedTodosStartDate,
                        dueDate: splitedTodosDueDate,
                        cheacked: todos.checked,
                        isInProgress: checkedValue.newIsProgress,
                        isExpired: checkedValue.newIsExpired,
                        isStartDate: true,
                    }
    
                    if (i < 10 && (`${currentDate.year}` == splitedTodosStartDate[0]) && (`0${currentDate.month + 1}` == splitedTodosStartDate[1])) {
                        const I = `0${i}`;
                        if (I === splitedTodosStartDate[2]) {
                            todosInfo.push(newTodosInfo);
                        }
                    } else if ((`${currentDate.year}` == splitedTodosStartDate[0]) && (`0${currentDate.month + 1}` == splitedTodosStartDate[1])) {
                        const I = `${i}`;
                        if (I === splitedTodosStartDate[2]) {
                            todosInfo.push(newTodosInfo);
                        }
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
                    newCurrentMonth.push({ date: newDate, todos: todosInfo, status: {isToday: true, isShowLimitActive: true}, limitedTodos: limitedTodosArray });
                } else {
                    newCurrentMonth.push({ date: newDate, todos: todosInfo, status: {isToday: false, isShowLimitActive: true}, limitedTodos: limitedTodosArray });
                }
            } else {
                // Check isToday, then append from head.
                if (dateOfToday.getDate() == i && (currentDate.year === dateOfToday.getFullYear()) && (currentDate.month === dateOfToday.getMonth())) {
                    newCurrentMonth.push({ date: newDate, todos: todosInfo, status: {isToday: true, isShowLimitActive: false}, limitedTodos: null });
                } else {
                    newCurrentMonth.push({ date: newDate, todos: todosInfo, status: {isToday: false, isShowLimitActive: false}, limitedTodos: null });
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
            newNextMonth.push({ date: newDate, todos: null, status: {isToday: false, isShowLimitActive: false}, limitedTodos: null });
        }
        setNextMonth([...newNextMonth]);

        setAllMonth({lastMonth: newLastMonth, currentMonth: newCurrentMonth, nextMonth: newNextMonth});
    }, [todos, currentDate]);

    return allMonth;
}

/**
 * Cheack each todos is in progress or not and is expired or not.
 * @param todosDueDate 
 * @param todosStartDate 
 * @param checked 
 */
function statusCheacker(todosStartDate: string | string[] | null | undefined, todosDueDate: string | string[] | null | undefined, checked: boolean) {
    const formatedISOStringToday = (new Date().toISOString()).replace(/T|:/g, "-");

    const todayValue = getDateValue(formatedISOStringToday);
    const startDateValue = getDateValue(todosStartDate);
    const dueDateValue = getDateValue(todosDueDate);

    if (typeof todosStartDate === "string") {
        if (checked === true) {
            const newIsProgress = false;
            const newIsExpired = false;
            return {newIsProgress: newIsProgress, newIsExpired: newIsExpired};
        } else {
            if (dueDateValue > todayValue && todayValue > startDateValue) {
                const newIsProgress = true;
                const newIsExpired = false;
                return {newIsProgress: newIsProgress, newIsExpired: newIsExpired};
            } else if (startDateValue > todayValue) {
                const newIsProgress = false;
                const newIsExpired = false;
                return {newIsProgress: newIsProgress, newIsExpired: newIsExpired};
            } else {
                const newIsProgress = false;
                const newIsExpired = true;
                return {newIsProgress: newIsProgress, newIsExpired: newIsExpired};
            }
        }
    } else {
        if (checked === true) {
            const newIsProgress = false;
            const newIsExpired = false;
            return {newIsProgress: newIsProgress, newIsExpired: newIsExpired};
        } else {
            if (dueDateValue > todayValue) {
                const newIsProgress = false;
                const newIsExpired = false;
                return {newIsProgress: newIsProgress, newIsExpired: newIsExpired};
            } else {
                const newIsProgress = false;
                const newIsExpired = true;
                return {newIsProgress: newIsProgress, newIsExpired: newIsExpired};
            }
        }
    }
}

/**
 * Create splited date(string array). If this function receves values which is not string, this returns null.
 * @param dateString 
 */
function getSplitedDate(dateString: string | string[] | null | undefined) {
    if (typeof dateString === "string") {
        const splitedDateString = dateString.split("-");
        return splitedDateString;
    } else {
        return null;
    }
}

/**
 * Get marged string value as number. YYYYMMDDHHmm
 * @param date 
 */
function getDateValue(date: string | string[] | null | undefined) {
    if (typeof date === "string") {
        const dateValue = parseFloat(date.replace(/-/g, ""));
        return dateValue;
    } else {
        const dateValue = NaN;
        return dateValue;
    }
}