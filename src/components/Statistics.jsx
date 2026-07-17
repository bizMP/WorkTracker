//Imports
import "./Statistics.css";

import { useState } from "react";

//Statistics content
function Statistics({ selectedDay, workLogs, session }) {

    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthName = monthNames[selectedDay.month];

    const selectedMonth = `${selectedDay.year}-${String(selectedDay.month + 1).padStart(2, "0")}`;

    const displayedMonthLogs = workLogs.filter(log =>
        log.date.startsWith(selectedMonth)
    );

    const totalMinutesWorked = displayedMonthLogs.reduce((total, log) => {
        return total + log.hours * 60 + log.minutes;
    }, 0);

    const totalHours = Math.floor(totalMinutesWorked / 60);
    const remainingMinutes = totalMinutesWorked % 60;

    const totalMoney = displayedMonthLogs.reduce(
        (sum, log) => sum + log.moneyEarned,
        0
    );

    return (
        <div className="statisticsWrapper">
            <div className="statisticsBox">
                <p>Total Hours Worked ({monthName})</p>
                <h1>{totalHours}h {remainingMinutes}min</h1>
            </div>

            <div className="statisticsBox">
                <p>Total Money Earned ({monthName})</p>
                <h1>{totalMoney.toFixed(2)}€</h1>
            </div>
        </div>
    );
}

export default Statistics;