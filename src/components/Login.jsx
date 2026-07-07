//Imports
import "./Login.css";

//Login structure
function Login({ setPage }) {
    return(
        <div className="loginWrapper">
            <h1>Welcome Back!</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="johndoe@gmail.com" id="email" autoComplete="username"></input>
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" autoComplete="current-password"></input>

                <button type="submit" onClick={() => setPage("calendar")}>Log In</button>
                <button type="button" onClick={() => setPage("signUp")}>Don't Have an Account Yet?</button>
            </form>
        </div>
    );
}

export default Login;