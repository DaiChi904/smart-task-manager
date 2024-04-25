import { useState } from 'react';

import "./MainCalendar.css";
import OneDayTimeTable from './OneDayTimeTable';
import CalendarCreater from './CalendarCreater';
import { YearMonthType, TodosInfoType, DateType, AllCalendarType } from '../../types/calendarTypes';
import CalendarCells from './CalendarCells';

// Get date of today
const dateOfToday = new Date();

function CoreCalendar({selectedDate}: {selectedDate: YearMonthType}) {
    // Values related to <oneDayTimeTabe />.
    const [timeTableValue, setTimeTableValue] = useState<TodosInfoType[]>([]);
    const [timeTableSelectedDate, setTimeTableSelectedDate] = useState<DateType>({ year: dateOfToday.getFullYear(), month: dateOfToday.getMonth(), day: dateOfToday.getDate(), dayOfWeek: dateOfToday.getDay() });

    const handleSetTimeTable = (todos: TodosInfoType[] | null, selectedDate: DateType) => {
        if (todos === null) {
            alert("Unexpected error has occured.")
        } else {
            setTimeTableValue(todos);
            setTimeTableSelectedDate(selectedDate);
        }
    }

    const allMonth: AllCalendarType | undefined = CalendarCreater(selectedDate);
    console.log(allMonth);

    return (
        <>
            <div id="calendarContainer">
                <CalendarHeader />
                <CalendarCells allMonth={allMonth}/>
            </div>
        </>
    )
}

export default CoreCalendar;

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