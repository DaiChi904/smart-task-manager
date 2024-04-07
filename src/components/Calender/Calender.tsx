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

function Calender() {
    const [update,setUpdata]=useState<boolean>(false)

    type dateArrayType = {
        year: number,
        month: number,
        day: number,
        dayOfWeek: number,
        info?: string,
    }

    const [todos, setTodos] = useAtom(todosAtom);

    const [beforeDateArray, setBeforeDateArray] = useState<dateArrayType[]>([])
    const [dateArray, setDateArray] = useState<dateArrayType[]>([])
    const [afterDateArray, setAfterDateArray] = useState<dateArrayType[]>([])
    
    // Info about before date at this time.
    const beforeDate = new Date();
    const beforeYear: number = beforeDate.getFullYear() - 1;
    const beforeMonth: number = beforeDate.getMonth();
    const beforeDay: number = beforeDate.getDate() - 1;
    const beforeDayOfWeek: number = beforeDate.getDay() - 1;
    const beforeHour: number = beforeDate.getHours() - 1;
    const beforeMinite: number = beforeDate.getMinutes() - 1;

    // Info about date at this time.
    const dateOfToday = new Date();
    const yearOfToday: number = dateOfToday.getFullYear();
    const monthOfToday: number = dateOfToday.getMonth();
    const dayOfToday: number = dateOfToday.getDate();
    const dayOfWeekOfToday: number = dateOfToday.getDay();
    const hourOfToday: number = dateOfToday.getHours();
    const miniteOfToday: number = dateOfToday.getMinutes();

    // Info about before date at this time.
    const nextDate = new Date();
    const nextYear: number = nextDate.getFullYear() - 1;
    const nextMonth: number = nextDate.getMonth();
    const nextDay: number = nextDate.getDate() - 1;
    const nextDayOfWeek: number = nextDate.getDay() - 1;
    const nextHour: number = nextDate.getHours() - 1;
    const nextMinite: number = nextDate.getMinutes() - 1;
    useEffect(() => {
        const beforeDateArray: dateArrayType[] = []
        const newDateArray: dateArrayType[] = []
        const afterDateArray: dateArrayType[] = []

        for (let i:number = 1; i <= commonYearLastDayArray[monthOfToday + 1]; i++) {
            const dateOfNewDate = new Date(yearOfToday, monthOfToday, i);
            const testInfo: string = "ここが今日";
            if (i === dayOfToday) {
                const newDate: dateArrayType = {
                    year: dateOfNewDate.getFullYear(),
                    month: dateOfNewDate.getMonth() + 1,
                    day: dateOfNewDate.getDate(),
                    dayOfWeek: dateOfNewDate.getDay(),
                    info: testInfo,
                }
                newDateArray.push(newDate);
            } else {
                const newDate: dateArrayType = {
                    year: dateOfNewDate.getFullYear(),
                    month: dateOfNewDate.getMonth() + 1,
                    day: i,
                    dayOfWeek: dateOfNewDate.getDay(),
                }
                newDateArray.push(newDate);
            }
        }
        setDateArray([...newDateArray])
        for (let bi:number = commonYearLastDayArray[beforeMonth]; bi >= commonYearLastDayArray[beforeMonth] + 1; bi--) {
            const newDate: dateArrayType = {
                year: yearOfToday,
                month: monthOfToday,
                day: bi,
                dayOfWeek: dayOfWeekOfToday,
            }
            beforeDateArray.unshift(newDate);
        }
        setBeforeDateArray([...beforeDateArray])
        for (let ai:number = 1; ai <= commonYearLastDayArray[nextMonth] - 20 - dayOfWeekOfToday; ai++) {
            const newDate: dateArrayType = {
                year: yearOfToday,
                month: monthOfToday,
                day: ai,
                dayOfWeek: dayOfWeekOfToday,
            }
            afterDateArray.push(newDate);
        }
        setAfterDateArray([...afterDateArray])
    },[])
    
    console.log("This Month:",{dateArray})
    console.log(beforeDateArray)
    console.log(afterDateArray)

    return (
        <>
            <div id='TodosDisplayerContainer'>
                <div id='TodosLeftDisplayer'>
                    <p>左側のフレックス</p>
                    <h1>{yearOfToday}年{monthOfToday + 1}月</h1>
                    <div id='Calendar-Container'>
                        <div className='Calendar-DateBox'>Sun</div>
                        <div className='Calendar-DateBox'>Mon</div>
                        <div className='Calendar-DateBox'>Tue</div>
                        <div className='Calendar-DateBox'>Wed</div>
                        <div className='Calendar-DateBox'>Thu</div>
                        <div className='Calendar-DateBox'>Fri</div>
                        <div className='Calendar-DateBox'>Sat</div>
                        {beforeDateArray.map((beforeDateArray) => (
                            <div className='Calendar-Children-before'>{beforeDateArray.day}</div>
                        ))}
                        {dateArray.map((dateArray) => (
                            <div className='Calendar-Children'>{dateArray.day}{dateArray.info}</div>
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