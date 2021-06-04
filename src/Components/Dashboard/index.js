import React, { useState } from 'react';
import logo from "../../Assets/Images/lotus.png"
import { useHistory } from "react-router";

import NoData from '../../Assets/Images/nodatafound.png';

import "./Dashboard.css";

const Dashboard = () => {
    const [openEntry,setOpenEntry] = useState(false);
    const [date,_setDate] = useState("");
    const [sleepTime,_setSleepTime] = useState("");
    const [wakeupTime,_setWakeupTime] = useState("");
    const [duration,_setSleepDuration] = useState();
    const [pastData,_setPastData] = useState([]);
    const history = useHistory();

    const addNewData = ()=>{
        let splitted1 = sleepTime.split(":");
        let splitted2 = wakeupTime.split(":");
        let hour = splitted2[0]-splitted1[0];
        let min = splitted2[1]-splitted1[1];
        let hours = hour<0?hour+24:hour;
        let minutes = min<0?min+60:min;

        const newEntry = {
            date:date,
            sleep_Time:sleepTime,
            wakeup_Time:wakeupTime,
            sleep_duration:`${hours}:${minutes}`
        }

        _setPastData([...pastData,newEntry]);
        setOpenEntry(false);

    }

    return (
        <div>
            <div className="logo-container">
                <div>
                    <img src={logo} alt="" className="home-logo" />
                </div>
                <div className="logo-header">
                    Sleep Tracker
                </div>
                <input type="button" value="Logout" onClick={()=>{history.push("/")}}/>
            </div>
            {openEntry &&
                <div className="entry-container">
                    <div className="flex">
                        <div>Date:</div>
                        <input type="date" onChange={(e)=>{_setDate(e.target.value)}}/>
                    </div>
                    <div className="flex">
                        <div>Sleep Time:</div>
                        <input type="time" onChange={(e)=>{_setSleepTime(e.target.value)}}/>
                    </div>
                    <div className="flex">
                        <div>Wake Up Time:</div>
                        <input type="time" onChange={(e)=>{_setWakeupTime(e.target.value)}}/>
                    </div>
                    <input type="submit" onClick={addNewData}/>
                </div>
            }
            {openEntry===false&&(
                <div>
                    <input type="button" value="new entry" className="new-entry-button" onClick={()=> setOpenEntry(true)}/>
                </div>
            )}
            {pastData.length===0?(
                <img src={NoData} alt="no data found image"></img>
            ):(
            <div className="data-container">
                    <div >Date</div>
                    <div >Sleep Time</div>
                    <div >Wakeup Time</div>
                    <div >Sleep Duaration</div>
                {pastData.map((data)=>(
                    <>
                    <div key={data.date}>{data.date}</div>
                    <div key={data.sleep_Time}>{data.sleep_Time}</div>
                    <div key={data.wakeup_Time}>{data.wakeup_Time}</div>
                    <div key={data.sleep_duration}>{data.sleep_duration}</div>
                    </>
                ))}
            </div>    
            )}
            
        </div>
    )
}

export default Dashboard