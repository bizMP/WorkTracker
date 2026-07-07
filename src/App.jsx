//Imports
import { useState } from "react";

import Calendar from "./components/calendar";
import Header from "./components/Header";
import LoggingHours from "./components/LoggingHours";
import Statistics from "./components/Statistics";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import { supabase } from "./supabaseClient";

console.log(supabase);

function App() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [page, setPage] = useState("login");

    return (
        <>
            {page === "login" && (
                <>
                  <Login setPage={setPage}/>
                </>
            )}

            {page === "signUp" && (
                <>
                  <SignUp setPage={setPage}/>
                </>
            )}

            {page === "calendar" && (
                <>
                    <Header />
                    <Calendar setSelectedDay={setSelectedDay} />
                    <LoggingHours selectedDay={selectedDay} />
                    <Statistics />
                    <Footer setPage={setPage} />
                </>
            )}

            {page === "settings" && (
                <>
                  <Header />
                  <Settings />
                  <Footer setPage={setPage} />
                </>
            )}
        </>
    );
}

export default App;