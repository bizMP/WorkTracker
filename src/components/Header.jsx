//Imports
import "./Header.css";
import { useEffect, useState } from "react";

//Header structure
function Header({ userSettings }) {

    //Timer and date display
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="headerDiv">
            <h2>Hello {userSettings.fname}</h2>

            <p>{time.toLocaleTimeString() + " " + time.toLocaleDateString()}</p>
        </div>
    );
}

export default Header;