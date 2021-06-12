import React, { useState, useEffect } from 'react';
import SleepTrackerImage from "../../Assets/Images/SleepTrackerImage.jpg"
import { useHistory } from "react-router";
import fire from '../../firebase';

import NoData from '../../Assets/Images/nodatafound.png';

import "./Dashboard.css";
import BarChart from '../Chart';

const Dashboard = () => {
    const [openEntry,setOpenEntry] = useState(false);
    const [date,_setDate] = useState("");
    const [sleepTime,_setSleepTime] = useState("");
    const [wakeupTime,_setWakeupTime] = useState("");
    const [duration,_setSleepDuration] = useState();
    const [pastData,_setPastData] = useState([]);
    const [username,_setUserName] = useState("");
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
            sleepTime:sleepTime,
            wakeupTime:wakeupTime,
            duration:`${hours}:${minutes}`
        }

                let formData = new FormData();
                formData.append('username', username);
                formData.append('date',date);
                formData.append('sleepTime',sleepTime)
                formData.append('wakeupTime',wakeupTime);
                formData.append('duration',`${hours}:${minutes}`);
                fetch("http://127.0.0.1:8000/api/v1/add-sleep-data/",{
                    method:"POST",
                    body:formData
                })
                .then(response=>response.json())
                .then((res)=>{
                    console.log(res)
                    getPastData()     
                });
                setOpenEntry(false);

    }

    const getPastData = async ()=>{
                let formData = new FormData();
                formData.append('username', username);
                fetch("http://127.0.0.1:8000/api/v1/sleep-time-list/",{
                    method:"POST",
                    body:formData
                })
                .then(response=>response.json())
                .then((res)=>{
                    _setPastData(res);        
                });
    }

    useEffect(()=>{
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                let formData = new FormData();
                formData.append('username', user.email);
                fetch("http://127.0.0.1:8000/api/v1/sleep-time-list/",{
                    method:"POST",
                    body:formData
                })
                .then(response=>response.json())
                .then((res)=>{
                    _setPastData(res);        
                });
                _setUserName(user.email);
            }else{
                history.push("/");
            }
        })
    },[])
    

    const _handleLogout = ()=>{
        fire.auth().signOut();
        history.push("/")
    }

    return (
        <div>
            <div className="logo-container">
                <div>
                    <img src={SleepTrackerImage} alt="sleep tracker image" className="home-logo" />
                </div>
                <div className="logo-header">
                    Sleep Tracker
                </div>
                <input type="button" value="Logout" className="logout-button" onClick={_handleLogout}/>
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
            <div>
            <div className="data-container">
                    <div >Date</div>
                    <div >Sleep Time</div>
                    <div >Wakeup Time</div>
                    <div >Sleep Duaration</div>
                {pastData.map((data)=>(
                    <>
                    <div key={data.date}>{data.date}</div>
                    <div key={data.sleepTime}>{data.sleepTime}</div>
                    <div key={data.wakeupTime}>{data.wakeupTime}</div>
                    <div key={data.duration}>{data.duration}</div>
                    </>
                ))}
            </div>
                {/* <BarChart duration={[9,8,7,5,4,3,2]} dates={['11-1-1','12-1-1','13-1-1','14-1-1','15-1-1','16-1-1','17-1-1']} /> */}
                {/* <BarChart  systolicName="SYSTOLIC"
                            diastolicName="DIASTOLIC"
                            diastolicData={[10, 32, 40, 80, 90, 62, 70]}
                            systolicData={[6, 38, 48, 62, 70, 32, 90]}
                            values={[
                                    ["1", "Sun"],
                                    ["2", "Mon"],
                                    ["3", "Tue"],
                                    ["4", "Wed"],
                                    ["5", "Thu"],
                                    ["6", "Fri"],
                                    ["7", "Sat"],
                            ]} 
                /> */}
                <BarChart data={pastData} />
            </div>    
            )}
            
        </div>
    )
}

export default Dashboard