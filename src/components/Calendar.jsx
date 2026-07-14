//Imports
import "./Calendar.css";

import { useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

//Returns a table with the days of the month
function tableOfDays(month, year) {

    const calendar = [];

    const firstDayOfMonth = new Date(year, month, 1);

    const startingGap = (firstDayOfMonth.getDay() + 6) % 7;
    for(let i = 0; i < startingGap; i++) {
        calendar.push(null);
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        calendar.push(i);
    }

    return calendar;
}

//Calendar structure
function Calendar({ setSelectedDay, workLogs }) {

    const today = new Date();

    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const calendar = tableOfDays(month, year);

    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthName = monthNames[month];

    function previousMonth() {

        if(month === 0) {
            setYear(year - 1);
            setMonth(11);
        }
        else setMonth(month - 1);
    }

    function nextMonth() {
        
        if(month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    return (
        <div className="calendarWrapper">
            <div className="switchingMonths">
                <button type="button" onClick={previousMonth}><ArrowLeftIcon size={32} /></button>

                <h2>{monthName} {year}</h2>
                
                <button type="button" onClick={nextMonth}><ArrowRightIcon size={32} /></button>
            </div>

            <div className="weekdays">
                <p>Mon</p>
                <p>Tue</p>
                <p>Wed</p>
                <p>Thu</p>
                <p>Fri</p>
                <p>Sat</p>
                <p>Sun</p>
            </div>

            <div className="calendar">
                {calendar.map((day, index) => {
                    if(day === null) {
                        return <div key={index} className="day"></div>
                    }

                    const currentDay = new Date(year, month, day);

                    const hasWorkLogged = workLogs.some(log => log.date.getTime() === currentDay.getTime());

                    return(
                        <button type="button" key={index} className={hasWorkLogged ? "loggedDay" : "day"} onClick={() => setSelectedDay({day, month, year})}>{day}</button>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;