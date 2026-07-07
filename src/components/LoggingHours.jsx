//Imports
import "./LoggingHours.css";

//Logging hours structure
function LoggingHours({ selectedDay }) {
    return(
        <div className="loggingHoursWrapper">
            <h1>{selectedDay ? `${selectedDay}.7.2026` : "Select a day"}</h1>

            <form className="workingTimeForm">
                <h2>Input Your Work Hours</h2>

                <input type="number" placeholder="0" id="workHours"></input>
                <label htmlFor="workHours">h</label>

                <input type="number" placeholder="0" id="workMinutes"></input>
                <label htmlFor="workMinutes">min</label>

                <button type="submit">Log Hours</button>
            </form>
        </div>
    );
}

export default LoggingHours;