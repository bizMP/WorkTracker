//Imports
import "./Footer.css";
import { CalendarDotsIcon, GearIcon } from "@phosphor-icons/react";

//Footer structure
function Footer({ setPage }) {
    return(
        <div className="footerWrapper">
            <button type="button" onClick={() => setPage("calendar")} className="calendar">
                <CalendarDotsIcon size={25} />
                <p>Calendar</p>
            </button>

            <button type="button" onClick={() => setPage("settings")} className="settings">
                <GearIcon size={25} />
                <p>Settings</p>
            </button>
        </div>
    );
}

export default Footer;