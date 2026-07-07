//Imports
import "./SignUp.css";

//Sign Up structure
function SignUp({ setPage }) {
    return(
        <div className="signUpWrapper">
            <h1>Welcome!</h1>
            <form>
                <label htmlFor="fname">First Name</label>
                <input type="text" placeholder="John" id="fname" autoComplete="given-name"></input>

                <label htmlFor="lname">Last Name</label>
                <input type="text" placeholder="Doe" id="lname" autoComplete="family-name"></input>

                <label htmlFor="email">Email</label>
                <input type="email" placeholder="johndoe@gmail.com" id="email" autoComplete="email"></input>
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" autoComplete="new-password"></input>

                <button type="submit" onClick={() => setPage("calendar")}>Sign Up</button>
                <button type="button" onClick={() => setPage("login")}>Have an Account Already?</button>
            </form>
        </div>
    );
}

export default SignUp;