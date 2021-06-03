import React, { useState } from 'react'
import "./Dashboard.css";
import logo from "../../Assets/Images/lotus.png"

const Dashboard = () => {
    const [openEntry,setOpenEntry] = useState(false);
    return (
        <div>
            <div className="logo-container">
                <div>
                    <img src={logo} alt="" className="home-logo" />
                </div>
                <div className="logo-header">
                    Sleep Tracker
                </div>
                <input type="button" value="Logout" />
            </div>
            {openEntry &&
                <div className="entry-container">
                    <div className="flex">
                        <div>Date:</div>
                        <input type="date" />
                    </div>
                    <div className="flex">
                        <div>Sleep Time:</div>
                        <input type="time" />
                    </div>
                    <div className="flex">
                        <div>Wake Up Time:</div>
                        <input type="time" />
                    </div>
                    <input type="submit" />
                </div>
            }
            <div>
                <input type="button" value="new entry" className="new-entry-button" onClick={()=> setOpenEntry(true)}/>
            </div>
            <div className="data-container">
                <div>Data</div>
            </div>
        </div>
    )
}

export default Dashboard