// Display all of todos in this calender. This calender displays due date of todos, and terms of todos are planed.

import { useEffect, useState } from 'react';
import { IonDatetime } from '@ionic/react';
import { todosAtom } from '../Memo_card/TodoApp';
import { useAtom } from 'jotai';

import "./Calender.css"

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

function Calender() {
    type dateArrayType = {
        year: number,
        month: number,
        day: number,
        dayOfWeek: number,
    }

    const [todos, setTodos] = useAtom(todosAtom);

    const [dateArray, setDateArray] = useState<dateArrayType[]>([])
    
    // When the month of leap year 
    const dateOfToday = new Date();
    const yearOfToday: number = dateOfToday.getFullYear();
    const monthOfToday: number = dateOfToday.getMonth() + 1;
    const dayOfToday: number = dateOfToday.getDate();
    const dayOfWeekOfToday: number = dateOfToday.getDay();
    const hourOfToday: number = dateOfToday.getHours();
    const miniteOfToday: number = dateOfToday.getMinutes();
    useEffect(() => {
        const newDateArray: dateArrayType[] = []
        if (yearOfToday % 4 === 0 && monthOfToday === 2 || yearOfToday % 4 === 0 && yearOfToday % 100 === 0 && yearOfToday % 400 === 0 && monthOfToday === 2) {
            for (let i:number = 1; i <= leapYearLastDayArray[monthOfToday]; i++) {
                const newDate: dateArrayType = {
                    year: yearOfToday,
                    month: monthOfToday,
                    day: i,
                    dayOfWeek: dayOfWeekOfToday,
                }
                newDateArray.push(newDate);
            }
            setDateArray([...dateArray, ...newDateArray])
        } 
        // When the month of common year
            else {
            for (let i:number = 1; i <= commonYearLastDayArray[monthOfToday]; i++) {
                const newDate: dateArrayType = {
                    year: yearOfToday,
                    month: monthOfToday,
                    day: i,
                    dayOfWeek: dayOfWeekOfToday,
                }
                newDateArray.push(newDate);
            }
            setDateArray([...dateArray, ...newDateArray])
        }
    },[])
    console.log(dateArray)
    return (
        <>
            <div id='TodosDisplayerContainer'>
                <div id='TodosLeftDisplayer'>
                    <p>左側のフレックス</p>
                    <h1>{yearOfToday}年{monthOfToday}月</h1>
                    <div id='Calendar-Container'>
                        <div className='Calendar-DateBox'>Sun</div>
                        <div className='Calendar-DateBox'>Mon</div>
                        <div className='Calendar-DateBox'>Tue</div>
                        <div className='Calendar-DateBox'>Wed</div>
                        <div className='Calendar-DateBox'>Thu</div>
                        <div className='Calendar-DateBox'>Fri</div>
                        <div className='Calendar-DateBox'>Sat</div>
                        {dateArray.map((dateArray) => (
                            <div className='Calendar-Children'>{dateArray.day}</div>
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