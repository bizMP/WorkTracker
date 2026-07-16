//Imports
import "./LoggingHours.css";

import { useState } from "react";

import { supabase } from "../supabase";

//Logging hours structure
function LoggingHours({ selectedDay, setWorkLogs, workLogs, session }) {

    const [workHours, setWorkHours] = useState(0);
    const [workMinutes, setWorkMinutes] = useState(0);

    const [error, setError] = useState(null);

    async function handleSubmit(event) {

        event.preventDefault();

        if (!selectedDay) return;

        const workDate = `${selectedDay.year}-${String(selectedDay.month + 1).padStart(2, "0")}-${String(selectedDay.day).padStart(2, "0")}`;
        
        const updatedWorkLogs = [...workLogs, {date: workDate, hours: workHours, minutes: workMinutes}];

        setWorkLogs(updatedWorkLogs);

        setWorkHours(0);
        setWorkMinutes(0);

        try {
            const {data, error: insertError} = await supabase .from("work_logs") .insert({
                user_id: session.user.id,
                work_date: workDate,
                work_hours: workHours,
                work_minutes: workMinutes
            });

            if(insertError) {
                setError(insertError.message);
            }
        }
        catch(err) {
            setError(err.message);
        }
    }

    const selectedDate = selectedDay ? `${selectedDay.year}-${String(selectedDay.month + 1).padStart(2, "0")}-${String(selectedDay.day).padStart(2, "0")}` : null;

    const workLog = selectedDate ? workLogs.find(log => log.date === selectedDate) : null;

    async function handleUpdate(event) {
        
        event.preventDefault();

        if (!selectedDay) return;

        const workDate = `${selectedDay.year}-${String(selectedDay.month + 1).padStart(2, "0")}-${String(selectedDay.day).padStart(2, "0")}`;
        
        const updatedWorkLogs = workLogs.map(log => {
            if(log.date === workLog.date) {                
                return {
                    date: workDate,
                    hours: workHours,
                    minutes: workMinutes
                };
            }

            return log;
        });


        setWorkLogs(updatedWorkLogs);

        const { data, error } = await supabase
            .from("work_logs")
            .update({
                work_hours: workHours,
                work_minutes: workMinutes
            })
            .eq("user_id", session.user.id)
            .eq("work_date", workDate)

        setWorkHours(0);
        setWorkMinutes(0);
    }

    return(
        <div className="loggingHoursWrapper">
            <h1>{selectedDay ? `${selectedDay.day}.${selectedDay.month + 1}.${selectedDay.year}` : "Select a day"}</h1>

            {!workLog ? 
                (
                    <form className="workingTimeForm" onSubmit={handleSubmit}>
                        <h2>Input Your Work Hours</h2>

                        <input type="number" id="workHours" value={workHours} onChange={(event) => setWorkHours(Number(event.target.value))}></input>
                        <label htmlFor="workHours">h</label>

                        <input type="number" id="workMinutes" value={workMinutes} onChange={(event) => setWorkMinutes(Number(event.target.value))}></input>
                        <label htmlFor="workMinutes">min</label>

                        <button type="submit" disabled={!selectedDay}>Log Hours</button>
                    </form>
                ) 
                : 
                (
                    <form className="workingTimeForm" onSubmit={handleUpdate}>
                        <h2>Edit Your Work Hours</h2>

                        <input type="number" id="workHours" value={workHours} onChange={(event) => setWorkHours(Number(event.target.value))}></input>
                        <label htmlFor="workHours">h</label>

                        <input type="number" id="workMinutes" value={workMinutes} onChange={(event) => setWorkMinutes(Number(event.target.value))}></input>
                        <label htmlFor="workMinutes">min</label>

                        <p>Previous log: {workLog.hours}h {workLog.minutes}min</p>

                        <button type="submit" disabled={!selectedDay}>Save Changed Hours</button>
                    </form>
                )
            }
        </div>
    );
}

export default LoggingHours;