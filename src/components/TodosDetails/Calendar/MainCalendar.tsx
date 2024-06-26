import { useState } from 'react';
import { getLastDay, getLastMonth, getNextMonth, getDayOfWeek } from '../../../utils/date';

import "./MainCalendar.css";
import OneDayTimeTable from '../OneDayTimeTable';
import CoreCalendar from './CoreCalendar';
import { YearMonthType } from '../../../types/calendarTypes';

// Get date of today
const dateOfToday = new Date();

function MainCalendar() {
    // Date of year and month which is selected now. InitialValue is date of today.
    const [currentDate, setCurrentDate] = useState<YearMonthType>({ year: dateOfToday.getFullYear(), month: dateOfToday.getMonth() });

    const handleSetLastMonth = () => {
        const beforeDate = getLastMonth(new Date(currentDate.year, currentDate.month));
        setCurrentDate({ year: beforeDate.getFullYear(), month: beforeDate.getMonth() });
    }
    const handleSetNextMonth = () => {
        const nextDate = getNextMonth(new Date(currentDate.year, currentDate.month));
        setCurrentDate({ year: nextDate.getFullYear(), month: nextDate.getMonth() });
    }

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
                            <button className="calendarMenuButton" onClick={handleSetLastMonth}><span><b>&lt;</b></span></button>
                            <b>|</b>
                            <button className="calendarMenuButton" onClick={handleSetNextMonth}><span><b>&gt;</b></span></button>
                        </div>
                    </div>

                    <div id="calendarContainer">
                        <CoreCalendar selectedDate={currentDate} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default MainCalendar;

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