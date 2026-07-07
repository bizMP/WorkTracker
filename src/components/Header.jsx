//Imports
import "./Header.css";
import { useEffect, useState } from "react";

//Header structure
function Header() {

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
            <img src="#" alt="userProfile"></img>
            <h2>Hello Name</h2>

            <p>{time.toLocaleTimeString() + " " + time.toLocaleDateString()}</p>
        </div>
    );
}

export default Header;