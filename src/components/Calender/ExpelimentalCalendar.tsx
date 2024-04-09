import { useEffect, useState } from 'react';
import { IonDatetime } from '@ionic/react';
import { todosAtom } from '../Memo_card/TodoApp';
import { useAtom } from 'jotai';
import { render } from '@testing-library/react';
import "./expeliment.css";

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
        todos: null | [
            todo: null | string[],
        ],
        isToday: boolean,
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

    const [renderArray_CurrentDate, setRenderArray_CurrentDate] = useState<renderArrayType[]>([]);
    const [renderArray_BeforeDate, setRenderArray_BeforeDate] = useState<renderArrayType[]>([]);
    const [renderArray_AfterDate, setRenderArray_AfterDate] = useState<renderArrayType[]>([]);
    // Date which is selected
    const [currentDate, setCurrentDate] = useState<dateType>({year: yearOfToday, month: monthOfToday, day: dayOfToday, dayOfWeek: dayOfWeekOfToday,});

    useEffect(() => {
        const newBeforeRenderArray: renderArrayType[] = [];
        const newCurrentRenderArray: renderArrayType[] = [];
        const newAfterRenderArray: renderArrayType[] = [];

        // Get first date infomation of currrentDate
        const firstDate = firstDateInfoGeter(currentDate.year, currentDate.month);
        // Get day of week of first day
        const dayOdWeekOfFirstDate = firstDate.getDay();
        
        const beforeDate = dateBacker(currentDate.year, currentDate.month);
        const beforeYear = beforeDate.getFullYear();
        const beforeMonth = beforeDate.getMonth();

        const afterDate = dateAdvancer(currentDate.year, currentDate.month);
        const afterYear = afterDate.getFullYear();
        const afterMonth = afterDate.getMonth();

        // Array of day of manth before currentMonth
        for (let bi:number = commonYearLastDayArray[beforeMonth]; bi > commonYearLastDayArray[beforeMonth] - dayOdWeekOfFirstDate; bi--) {
            const DayOfWeek = dayOfWeekGeter(beforeYear, beforeMonth, bi)
            const newDate: dateType = {
                year: beforeYear,
                month: monthOfToday,
                day: bi,
                dayOfWeek: DayOfWeek,
            }
            // append from tail
            newBeforeRenderArray.unshift({day: newDate.day, todos: null, isToday: false});
        }
        setRenderArray_BeforeDate([...newBeforeRenderArray]);
        
        // Array of day of current Month
        for (let i :number = 1; i <= commonYearLastDayArray[currentDate.month]; i++) {
            const DayOfWeek = dayOfWeekGeter(currentDate.year, currentDate.month, i)
            const newDate: dateType = {
                year: currentDate.year,
                month: currentDate.month,
                day: i,
                dayOfWeek: DayOfWeek,
            }
            todos.map((todos) => {
                const todosDate = todos.dueDate;
                const todosDate_aligned = todosDate;
                console.log(todosDate_aligned)
            })
            // append from head
            newCurrentRenderArray.push({day: newDate.day, todos: null, isToday: false});
        }
        setRenderArray_CurrentDate([...newCurrentRenderArray]);

        // Array of day of manth after currentMonth
        for (let ai:number = 1; ai <= 42 - newCurrentRenderArray.length - newBeforeRenderArray.length; ai++) {
            const DayOfWeek = dayOfWeekGeter(afterYear, afterMonth, ai)
            const newDate: dateType = {
                year: afterYear,
                month: afterMonth,
                day: ai,
                dayOfWeek: DayOfWeek,
            }
            // append from head
            newAfterRenderArray.push({day: newDate.day, todos: null, isToday: false});
        }
        setRenderArray_AfterDate([...newAfterRenderArray]);
    }, [todos])
    
    console.log(renderArray_BeforeDate, renderArray_CurrentDate, renderArray_AfterDate)

    return (
        <>  
        <div>
            {currentDate.year}. {currentDate.month + 1}. {currentDate.day}
        </div>
        <div className='container'>
            <div className='Calendar-DateBox'>Sun</div>
            <div className='Calendar-DateBox'>Mon</div>
            <div className='Calendar-DateBox'>Tue</div>
            <div className='Calendar-DateBox'>Wed</div>
            <div className='Calendar-DateBox'>Thu</div>
            <div className='Calendar-DateBox'>Fri</div>
            <div className='Calendar-DateBox'>Sat</div>
            {renderArray_BeforeDate.map((renderArray) => (
                    <div className={renderArray.isToday ? "testTrue" : "testFalse"}>
                        {renderArray.day}
                        {renderArray.todos && renderArray.todos.map((todos) => (
                            <div className="test">
                                {todos}
                            </div>
                        ))}
                    </div>
                ))}

            {renderArray_CurrentDate.map((renderArray) => (
                    <div className={renderArray.isToday ? "testTrue" : "testFalse"}>
                        {renderArray.day}
                        {renderArray.todos && renderArray.todos.map((todos) => (
                            <div className="test">
                                {todos}
                            </div>
                        ))}
                    </div>
                ))}

            {renderArray_AfterDate.map((renderArray) => (
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