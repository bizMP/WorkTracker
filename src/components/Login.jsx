//Imports
import "./Login.css";

import { supabase } from "../supabase";

import { useState } from "react";

//Login structure
function Login({ setPage, setSession }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    async function handleLogIn(event) {
        
        event.preventDefault();

        try {
            setLoading(true);

            setError(null);

            const {data, error: authError} = await supabase.auth.signInWithPassword( {
                email,
                password
            })

            if(authError) {
                setError(authError.message);
            }
            else {
                setSession(data.session);
                setPage("calendar");
            }
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return(
        <div className="loginWrapper">
            {error && (
                <div className="errorBox">
                    {error}
                </div>
            )}

            <h1>Welcome Back!</h1>
            <form onSubmit={handleLogIn}>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="johndoe@gmail.com" id="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)}></input>

                <button type="submit" disabled={loading}>{loading ? "Logging You In..." : "Log In"}</button>
                <button type="button" onClick={() => setPage("signUp")}>Don't Have an Account Yet?</button>
            </form>
        </div>
    );
}

export default Login;