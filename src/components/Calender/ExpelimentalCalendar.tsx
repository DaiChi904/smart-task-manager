import { useEffect, useState } from 'react';
import { IonDatetime } from '@ionic/react';
import { todosAtom } from '../Memo_card/TodoApp';
import { useAtom } from 'jotai';
import { render } from '@testing-library/react';

// !Important It should add leapYear Array
const commonYearLastDayArray: {[key: number]: number} = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
}

// Get date of today
const dateOfToday = new Date();
const yearOfToday = dateOfToday.getFullYear();
const monthOfToday = dateOfToday.getMonth();
const dayOfToday = dateOfToday.getDate();
const dayOfWeekOfToday = dateOfToday.getDay();

function ExpCalendar() {
    // functions
    function firstDateInfoGeter(currentYear:number, currentMonth:number) {
        const firstDate = new Date(currentYear, currentMonth, 1);
        return firstDate;
    }
    function lastDateInfoGeter(currentYear:number, currentMonth:number) {
        const lastDate = new Date(currentYear, currentMonth, commonYearLastDayArray[currentMonth]);
        return lastDate;
    }
    function dayOfWeekGeter(year: number, month: number, day:number) {
        const DayOfWeek = new Date(year, month, day).getDay();
        return DayOfWeek;
    }
    function dateBacker(currentYear:number, currentMonth:number) {
        if (currentMonth === 0) {
            const changedYearNum: number = currentYear -1;
            const changedMonthNum: number = 11;
            const backedDate = new Date(changedYearNum, changedMonthNum);
            return backedDate;
        } else {
            const changedMonthNum: number = currentMonth - 1;
            const backedDate = new Date(yearOfToday, changedMonthNum);
            return backedDate;
        }
    }
    function dateAdvancer(currentYear:number, currentMonth:number) {
        if (currentMonth === 11) {
            const changedYearNum: number = currentYear + 1;
            const changedMonthNum: number = 0;
            const advancedDate = new Date(changedYearNum, changedMonthNum);
            return advancedDate;
        } else {
            const changedMonthNum: number = currentMonth + 1;
            const advancedDate = new Date(yearOfToday, changedMonthNum);
            return advancedDate;
        }
    }

    type renderArrayType = {
        day: number,
        todos: null | string[],
        isToday: boolean,
    }

    type todosChildren = {

    }

    // !Important Month: 0 ~ 11, dayOfWeek: Sun = 0 ~ Sat = 6; Month needs to be plased one when it is rendered.
    // 一次的にnull追加
    type dateType = {
        year: number,
        month: number,
        day: number,
        dayOfWeek: number | null,
    }

    // Get Atom
    const [todos, setTodos] = useAtom(todosAtom);

    const [renderArray, setRenderArray] = useState<renderArrayType[]>();
    // Date which is selected
    const [currentDate, setCurrentDate] = useState<dateType>({year: yearOfToday, month: monthOfToday, day: dayOfToday, dayOfWeek: dayOfWeekOfToday,});
    // Values are Defined in the useEffect below
    const [beforeDateArray, setBeforeDateArray] = useState<dateType[]>();
    const [afterDateArray, setAfterDateArray] = useState<dateType[]>();

    


    useEffect(() => {
        const beforeDateArray: dateType[] = [];
        const currentDateArray: dateType[] = [];
        const afterDateArray: dateType[] = [];
        // useEffect内で色々定義する
        // Get first date infomation of currrentDate
        const firstDate = firstDateInfoGeter(currentDate.year, currentDate.month);
        // Get day of week of first day
        const dayOdWeekOfFirstDate = firstDate.getDay();
        
        const beforeDate = dateBacker(currentDate.year, currentDate.month);
        const beforeYear = beforeDate.getFullYear();
        const beforeMonth = beforeDate.getMonth();
        console.log(beforeDate);
        const afterDate = dateAdvancer(currentDate.year, currentDate.month);
        const afterYear = afterDate.getFullYear();
        const afterMonth = afterDate.getMonth();
        console.log(beforeDate);

        // Array of day of manth before currentMonth
        for (let bi:number = commonYearLastDayArray[beforeMonth + 1]; bi > commonYearLastDayArray[beforeMonth + 1] - dayOdWeekOfFirstDate; bi--) {
            const DayOfWeek = dayOfWeekGeter(beforeYear, beforeMonth, bi)
            const newDate: dateType = {
                year: beforeYear,
                month: monthOfToday,
                day: bi,
                dayOfWeek: DayOfWeek,
            }
            // append from tail
            beforeDateArray.unshift(newDate);
            //setRenderArray([...renderArray, {day: beforeDateArray, }])
        }
        setBeforeDateArray([...beforeDateArray]);
        // Array of day of manth after currentMonth
        for (let ai:number = 1; ai <= 42 - currentDateArray.length - beforeDateArray.length; ai++) {
            const DayOfWeek = dayOfWeekGeter(afterYear, afterMonth, ai)
            const newDate: dateType = {
                year: afterYear,
                month: afterMonth,
                day: ai,
                dayOfWeek: DayOfWeek,
            }
            // append from head
            afterDateArray.push(newDate);
            setRenderArray("");
        }
        setAfterDateArray([...afterDateArray]);

        // Set renderArray
        

    }, [todos])
    





    return (
        <>
            {renderArray.map((renderArray) => (
                <div className={renderArray.isToday ? "testTrue" : "testFalse"}>
                    {renderArray.day}
                    {renderArray.todos && renderArray.todos.map((info) => (
                        <div className="test">
                            {info.todos}
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default ExpCalendar;