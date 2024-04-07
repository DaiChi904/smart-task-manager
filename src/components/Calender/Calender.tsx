// Display all of todos in this calender. This calender displays due date of todos, and terms of todos are planed.

import { useEffect, useState } from 'react';
import { IonDatetime } from '@ionic/react';
import { todosAtom } from '../Memo_card/TodoApp';
import { useAtom } from 'jotai';

import "./Calender.css"
import { reload } from 'ionicons/icons';

const dayOfWeekArray: {[key: number]: string} = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "WednesDay",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

const commonYearLastDayArray: {[key: number]: number} = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
}

const leapYearLastDayArray: {[key: number]: number} = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
}

let dateOfToday = new Date( 2024, 0, 4);

function firstDateInfoGeter(yearOfToday:number, monthOfToday:number) {
    const firstDate = new Date(yearOfToday, monthOfToday, 1);
    return firstDate;
}

function lastDateInfoGeter(yearOfToday:number, monthOfToday:number) {
    const lastDate = new Date(yearOfToday, monthOfToday, commonYearLastDayArray[monthOfToday + 1]);
    return lastDate;
}

function dateBacker(yearOfToday:number, monthOfToday:number) {
    if (monthOfToday === 0) {
        const changedYearNum: number = yearOfToday -1;
        const changedMonthNum: number = 11;
        const backedDate = new Date(changedYearNum, changedMonthNum);
        return backedDate;
    } else {
        const changedMonthNum: number = monthOfToday - 1;
        const backedDate = new Date(yearOfToday, changedMonthNum);
        return backedDate;
    }
}

function dateAdvancer(yearOfToday:number, monthOfToday:number) {
    if (monthOfToday === 11) {
        const changedYearNum: number = yearOfToday + 1;
        const changedMonthNum: number = 0;
        const advancedDate = new Date(changedYearNum, changedMonthNum);
        return advancedDate;
    } else {
        const changedMonthNum: number = monthOfToday + 1;
        const advancedDate = new Date(yearOfToday, changedMonthNum);
        return advancedDate;
    }
}

function Calender() {
    const [todos, setTodos] = useAtom(todosAtom);

    type dateArrayType = {
        year: number,
        month: number,
        day: number,
        dayOfWeek: number,
        info?: string | null,
        isIndicatied?: boolean,
    }

    const [beforeDateArray, setBeforeDateArray] = useState<dateArrayType[]>([]);
    const [dateArray, setDateArray] = useState<dateArrayType[]>([]);
    const [afterDateArray, setAfterDateArray] = useState<dateArrayType[]>([]);
    
    

    // Info about date at this time.
    const dateOfToday = new Date();
    const yearOfToday: number = dateOfToday.getFullYear();
    const monthOfToday: number = dateOfToday.getMonth();
    const dayOfToday: number = dateOfToday.getDate();
    const dayOfWeekOfToday: number = dateOfToday.getDay();
    const hourOfToday: number = dateOfToday.getHours();
    const miniteOfToday: number = dateOfToday.getMinutes();

    const newFirstDate = firstDateInfoGeter(yearOfToday, monthOfToday);
    const dayOfWeekOfNewFirstDate: number = newFirstDate.getDay();
    const newLastDate = lastDateInfoGeter(yearOfToday, monthOfToday);
    const dayOfWeekOfNewLastDate: number = newLastDate.getDay();

    // Info about before date at this time.
    const newBackedDate = dateBacker(yearOfToday, monthOfToday);
    const beforeMonth = newBackedDate.getMonth();

    // Info about next date at this time.
    const newAdvancedDate = dateAdvancer(yearOfToday, monthOfToday);
    const nextMonth = newAdvancedDate.getMonth();

    useEffect(() => {
        const beforeDateArray: dateArrayType[] = [];
        const newDateArray: dateArrayType[] = [];
        const afterDateArray: dateArrayType[] = [];

        for (let i:number = 1; i <= commonYearLastDayArray[monthOfToday + 1]; i++) {
            const dateOfNewDate = new Date(yearOfToday, monthOfToday, i);
                if (todos.length > 0) {
                    todos.map((todos) => {
                        if (i === dayOfToday) {
                            const newDate: dateArrayType = {
                                year: dateOfNewDate.getFullYear(),
                                month: dateOfNewDate.getMonth() + 1,
                                day: dateOfNewDate.getDate(),
                                dayOfWeek: dateOfNewDate.getDay(),
                                info: todos.cardTitle,
                                isIndicatied: true,
                            }
                            newDateArray.push(newDate);
                        } else {
                            const newDate: dateArrayType = {
                                year: dateOfNewDate.getFullYear(),
                                month: dateOfNewDate.getMonth() + 1,
                                day: dateOfNewDate.getDate(),
                                dayOfWeek: dateOfNewDate.getDay(),
                                info: todos.cardTitle,
                                isIndicatied: false,
                            }
                            newDateArray.push(newDate);
                        }
                    })
                } else {
                    if (i === dayOfToday) {
                        const newDate: dateArrayType = {
                            year: dateOfNewDate.getFullYear(),
                            month: dateOfNewDate.getMonth() + 1,
                            day: dateOfNewDate.getDate(),
                            dayOfWeek: dateOfNewDate.getDay(),
                            info: null,
                            isIndicatied: true,
                        }
                        newDateArray.push(newDate);
                    } else {
                        const newDate: dateArrayType = {
                            year: dateOfNewDate.getFullYear(),
                            month: dateOfNewDate.getMonth() + 1,
                            day: dateOfNewDate.getDate(),
                            dayOfWeek: dateOfNewDate.getDay(),
                            info: null,
                            isIndicatied: false,
                        }
                        newDateArray.push(newDate);
                    }
                }
        }
        
        setDateArray([...newDateArray])
        for (let bi:number = commonYearLastDayArray[beforeMonth + 1]; bi > commonYearLastDayArray[beforeMonth + 1] - dayOfWeekOfNewFirstDate; bi--) {
            const newDate: dateArrayType = {
                year: yearOfToday,
                month: monthOfToday,
                day: bi,
                dayOfWeek: dayOfWeekOfToday,
            }
            beforeDateArray.unshift(newDate);
        }
        setBeforeDateArray([...beforeDateArray])
        for (let ai:number = 1; ai <= 42 - newDateArray.length - beforeDateArray.length; ai++) {
            const newDate: dateArrayType = {
                year: yearOfToday,
                month: monthOfToday,
                day: ai,
                dayOfWeek: dayOfWeekOfToday,
            }
            afterDateArray.push(newDate);
        }
        setAfterDateArray([...afterDateArray])
    },[todos])
    
    console.log("This Month:",{dateArray})
    console.log("Todos:",{todos})
    

    return (
        <>
            <div id='TodosDisplayerContainer'>
                <div id='TodosLeftDisplayer'>
                    <p>左側のフレックス</p>
                    <h1>{dayOfToday}. {monthOfToday + 1}. {yearOfToday}</h1>
                    <div id='Calendar-Container'>
                        <div className='Calendar-DateBox'>Sun</div>
                        <div className='Calendar-DateBox'>Mon</div>
                        <div className='Calendar-DateBox'>Tue</div>
                        <div className='Calendar-DateBox'>Wed</div>
                        <div className='Calendar-DateBox'>Thu</div>
                        <div className='Calendar-DateBox'>Fri</div>
                        <div className='Calendar-DateBox'>Sat</div>
                        {beforeDateArray.map((beforeDateArray) => (
                            <div className='Calendar-Children-before'>
                                {beforeDateArray.day}
                            </div>
                        ))}
                        {dateArray.map((dateArray) => (
                            <div className={dateArray.isIndicatied ? "Calendar-Children-indicatied" : "Calendar-Children"}>
                                <div>
                                    <b>{dateArray.day}</b>
                                </div>
                                <b>{dateArray.info}</b>
                            </div>
                        ))}
                        {afterDateArray.map((afterDateArray) => (
                            <div className='Calendar-Children-after'>{afterDateArray.day}</div>
                        ))}
                    </div>
                </div>
                <div id='TodosRightDisplayer'>
                    <p>右側のフレックス</p>
                </div>
            </div>
        </>
    );
}
export default Calender;