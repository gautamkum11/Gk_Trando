import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
let firstRender = true;

function Dashboard() {
    const [user,setuser] = useState(null);

    const sendrequest = async() => {
        try{
            const res = await axios.get("http://localhost:5000/api/dashboard",{
                withCredentials: true
            });
            setuser(res.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=> {
        if(firstRender)
        {
            firstRender = false;
            sendrequest();
        }
    },[])

    return (
        <div>
            <div style = {{display: "flex"}}>
                <h1>Mobile :-</h1>
                {user && <h1>{user.mobile}</h1>}
            </div>
            <div style = {{display: "flex"}}>
                <h1>Profession :-</h1>
                {user && <h1>{user.profession}</h1>}
            </div>
            <div style = {{display: "flex"}}>
                <h1>Experience :-</h1>
                {user && <h1>{user.experience}</h1>}
            </div>
            <div style = {{display: "flex"}}>
                <h1>How you know about us? :-</h1>
                {user && <h1>{user.howknowus}</h1>}
            </div>
            <div style = {{display: "flex"}}>
                <h1>Why you are learning eng? :-</h1>
                {user && <h1>{user.whylearning}</h1>}
            </div>
            <div style = {{display: "flex"}}>
                <h1>How much time you can give? :-</h1>
                {user && <h1>{user.time}</h1>}
            </div>
        </div>
    );
}

export default Dashboard;