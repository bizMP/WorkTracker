//Imports
import "./LoggingHours.css";

import { useState } from "react";

//Logging hours structure
function LoggingHours({ selectedDay, setWorkLogs, workLogs }) {

    const [workHours, setWorkHours] = useState(0);
    const [workMinutes, setWorkMinutes] = useState(0);

    function handleSubmit(event) {

        event.preventDefault();

        if (!selectedDay) return;

        const workDate = new Date(selectedDay.year, selectedDay.month, selectedDay.day);

        const updatedWorkLogs = [...workLogs, {date: workDate, hours: workHours, minutes: workMinutes}];
        setWorkLogs(updatedWorkLogs);

        setWorkHours(0);
        setWorkMinutes(0);
    }

    return(
        <div className="loggingHoursWrapper">
            <h1>{selectedDay ? `${selectedDay.day}.${selectedDay.month + 1}.${selectedDay.year}` : "Select a day"}</h1>

            <form className="workingTimeForm" onSubmit={handleSubmit}>
                <h2>Input Your Work Hours</h2>

                <input type="number" placeholder="0" id="workHours" value={workHours} onChange={(event) => setWorkHours(Number(event.target.value))}></input>
                <label htmlFor="workHours">h</label>

                <input type="number" placeholder="0" id="workMinutes" value={workMinutes} onChange={(event) => setWorkMinutes(Number(event.target.value))}></input>
                <label htmlFor="workMinutes">min</label>

                <button type="submit" disabled={!selectedDay}>Log Hours</button>
            </form>
        </div>
    );
}

export default LoggingHours;