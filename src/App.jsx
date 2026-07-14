//Imports
import { useState, useEffect } from "react";

import { supabase } from "./supabase";

import Calendar from "./components/calendar";
import Header from "./components/Header";
import LoggingHours from "./components/LoggingHours";
import Statistics from "./components/Statistics";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
    const [selectedDay, setSelectedDay] = useState(null);

    const [page, setPage] = useState("");

    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
    const [sessionLoading, setSessionLoading] = useState(true);

    const [workLogs, setWorkLogs] = useState([]);

    async function checkForSession() {

        try{
            setSessionLoading(true);

            const {data: sessionData, error: sessionError} = await supabase.auth.getSession();

            if(sessionError) {
                setPage("login");
            }
            else if(sessionData.session) {
                setSession(sessionData.session);
                setPage("calendar");
            }
            else {
                setPage("login");
            }
        }
        catch(error) {
            setError(error.message);
        }
        finally {
            setSessionLoading(false);
        }
    }

    useEffect(() => {
        checkForSession();
    }, []);

    return (
        <>
            {page === "login" && (
                <>
                  <Login setPage={setPage} setSession={setSession}/>
                </>
            )}

            {page === "signUp" && (
                <>
                  <SignUp setPage={setPage} setSession={setSession}/>
                </>
            )}

            {page === "calendar" && (
                <>
                    <Header />
                    <Calendar setSelectedDay={setSelectedDay} />
                    <LoggingHours selectedDay={selectedDay} setWorkLogs={setWorkLogs} workLogs={workLogs} />
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