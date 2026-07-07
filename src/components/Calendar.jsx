//Imports
import "./Calendar.css";

//Returns a table with the days of the month
function tableOfDays() {
    const today = new Date();

    const month = today.getMonth();
    const year = today.getFullYear();

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

function openLogging(day) {

}

//Calendar structure
function Calendar({ setSelectedDay }) {
    const calendar = tableOfDays();

    return (
        <div className="calendarWrapper">
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
                {calendar.map((day, index) => (
                    <button type="button" onClick={() => setSelectedDay(day)} key={index} className="day">
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Calendar;