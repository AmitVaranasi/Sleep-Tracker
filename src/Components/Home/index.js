import React, { useState } from 'react'
import "./Home.css";
import logo from "../../Assets/Images/lotus.png";
import Login from '../Login';
import Dashboard from '../Dashboard';
import AddAccount from '../AddAccount';
const Home = () => {
    const [loginModal,setOpenLoginModal] = useState(false);
    const [signupModal,setSignUpModal] = useState(false);
    const [loggedin,setloggedin] = useState(false);
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
            <div className="home-body-container" onClick={() =>setloggedin(true)}>
                Home
            </div>
            {loginModal && <Login />}
            {signupModal && <AddAccount />}
        </div>}
        {loggedin && <Dashboard />}
        </div>
    )
}

export default Home