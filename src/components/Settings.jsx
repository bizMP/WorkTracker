//Imports
import "./Settings.css";
import { PlusCircleIcon } from "@phosphor-icons/react";

//Settings structure
function Settings() {
    return(
        <div className="settingsWrapper"> 
            <img src="#" alt="Profile Image"></img>
            <PlusCircleIcon size={16} />
            <form>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName"></input>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName"></input>

                <label htmlFor="hourlyRate">Hourly Rate</label>
                <input type="number" placeholder="0.00$" id="hourlyRate"></input>
                <label htmlFor="raise">Raise</label>
                <input type="number" placeholder="0.00$" id="raise"></input>
                <label htmlFor="dateOfRaise">Date Of Raise</label>
                <input type="date" id="dateOfRaise"></input>

                <label htmlFor="vacationDays">Vacation Days</label>
                <input type="number" placeholder="0" id="vacationDays"></input>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default Settings;