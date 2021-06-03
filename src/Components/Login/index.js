import React, { useState } from 'react'
import { useHistory } from "react-router";
import "./Login.css"
const Login = () => {
    const [loginS,setLoginS] = useState(false);
    const history = useHistory();

    const LoginFunc = () => {
        // history.push("/dashboard");
        // setloggedin(true);
    }
    return (
        <div className="overlay">
            <div className="component">
                <div className="body-component">
                    <div className="header">
                        Login
                    </div>
                    <div className="mobile-header">Mobile Number:</div>
                    <input type="text" className="mobile-number-box" />
                    <div className="mobile-header">Password:</div>
                    <input type="password" className="mobile-number-box"/>
                    <br/>
                    <input type="button" value="Log In" className="login-button-div" onClick={LoginFunc}/>
                </div>
            </div>
            
        </div>
    )
}

export default Login;