import React, { useState } from 'react'
import "./Home.css";
import logo from "../../Assets/Images/lotus.png";
import Login from '../Login';
import AddAccount from '../AddAccount';
import { useHistory } from "react-router";
const Home = () => {
    const [loginModal,setOpenLoginModal] = useState(false);
    const [signupModal,setSignUpModal] = useState(false);
    const [loggedin,setloggedin] = useState(false);
    const history  = useHistory();

    return (
        <div>
        {!loggedin && <div className="home">
            <div className="home-header">
                <div className="logo-container">
                    <div>
                        <img src={logo} alt="" className="home-logo" />
                    </div>
                    <div className="logo-header">
                        Sleep Tracker
                    </div>
                </div>
                <div className="buttons-container">
                    <input type="button" value="Log in" className="login-button" onClick={()=>{setOpenLoginModal(true)}} />
                    <input type="button" value="Sign up" className="login-button" onClick={()=>{setSignUpModal(true)}} />
                </div>
            </div>
            <div className="home-body-container" onClick={() =>history.push("/dashboard")}>
                Home
            </div>
            {loginModal && <Login />}
            {signupModal && <AddAccount />}
        </div>}
        </div>
    )
}

export default Home