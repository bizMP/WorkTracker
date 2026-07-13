//Imports
import "./SignUp.css";

import { useState } from "react";
import { supabase } from "../supabase"

//Sign Up structure
function SignUp({ setPage, setSession }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSignUp(event) {

        event.preventDefault();

        try {
            setError(null);

            setLoading(true);

            const { data, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName
                    }
                }
            });

            if(authError) {
                setError(authError.message);
            }
            else {
                setSession(data.session)
                setPage("calendar");
            }
        }
        catch(error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return(
        <div className="signUpWrapper">
            {error && (
                <div className="errorBox">
                    {error}
                </div>
            )}

            <h1>Welcome!</h1>
            <form onSubmit={handleSignUp}>
                <label htmlFor="fname">First Name</label>
                <input type="text" placeholder="John" id="fname" autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>

                <label htmlFor="lname">Last Name</label>
                <input type="text" placeholder="Doe" id="lname" autoComplete="family-name" value={lastName} onChange={(event) => setLastName(event.target.value)}></input>

                <label htmlFor="email">Email</label>
                <input type="email" placeholder="johndoe@gmail.com" id="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)}></input>

                <button type="submit" disabled={loading}>{loading ? "Creating Account..." : "Sign Up"}</button>
                <button type="button" onClick={() => setPage("login")}>Have an Account Already?</button>
            </form>
        </div>
    );
}

export default SignUp;