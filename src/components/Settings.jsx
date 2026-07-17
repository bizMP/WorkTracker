//Imports
import "./Settings.css";

import { useState } from "react";

import { supabase } from "../supabase";

//Settings structure
function Settings({ userSettings, setUserSettings, session }) {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    async function saveChanges(event) {
        
        event.preventDefault();

        try {
            setLoading(true);

            const { data, error: updateError } = await supabase .from("user_settings") .update({
                first_name: userSettings.fname,
                last_name: userSettings.lname,
                hourly_rate: userSettings.hourlyRate,
                vacation_days: userSettings.vacationDays
            }) 
            .eq("id", session.user.id);

            if(updateError) {
                console.log(updateError);
                setError(updateError.message);
            }
        }
        catch(err) {
            console.log(err)
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return(
        <div className="settingsWrapper"> 
            <form onSubmit={saveChanges}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" value={userSettings.fname} onChange={(event) => setUserSettings({...userSettings, fname: event.target.value})}></input>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" value={userSettings.lname} onChange={(event) => setUserSettings({...userSettings, lname: event.target.value})}></input>

                <label htmlFor="hourlyRate">Hourly Rate ($)</label>
                <input type="number" id="hourlyRate" value={userSettings.hourlyRate} onChange={(event) => setUserSettings({...userSettings, hourlyRate: Number(event.target.value)})}></input>
                
                {error && (
                    <div className="errorBox">
                        {error}
                    </div>
                )}

                <button type="submit">{loading ? "Saving Changes..." : "Save Changes"}</button>
            </form>
        </div>
    );
}

export default Settings;