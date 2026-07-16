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

    const [userSettings, setUserSettings] = useState({
        fname: "",
        lname: "",
        hourlyRate: 0,
        vacationDays: 0
    });

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

    async function getUserSettings() {
        try {
            const { data, error } = await supabase
                .from("user_settings")
                .select("*")
                .eq("id", session.user.id)
                .single();

            if(error) {
                setError(error.message);
                return;
            }

            setUserSettings({
                fname: data.first_name,
                lname: data.last_name,
                hourlyRate: data.hourly_rate,
                vacationDays: data.vacation_days
            });

        } 
        catch(err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        if(session) {
            getUserSettings();
        }
    }, [session]);

    async function getUserWorkLogs() {
        try {
            const {data: workLogsData, error: workLogsError} = await supabase .from("work_logs") .select("*") .eq("user_id", session.user.id);

            if(workLogsError) {
                setError(workLogsError.message);
            }

            if(workLogsData) {
                const formattedLogs = workLogsData.map(log => ({
                    date: log.work_date,
                    hours: log.work_hours,
                    minutes: log.work_minutes
                }));

                setWorkLogs(formattedLogs);
            }
        }
        catch(err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        if(session) {
            getUserWorkLogs();
        }
    }, [session]);

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
                    <Calendar setSelectedDay={setSelectedDay} workLogs={workLogs} />
                    <LoggingHours selectedDay={selectedDay} setWorkLogs={setWorkLogs} workLogs={workLogs} session={session} />
                    <Statistics />
                    <Footer setPage={setPage} />
                </>
            )}

            {page === "settings" && (
                <>
                  <Header />
                  <Settings userSettings={userSettings} setUserSettings={setUserSettings} session={session} />
                  <Footer setPage={setPage} />
                </>
            )}
        </>
    );
}

export default App;