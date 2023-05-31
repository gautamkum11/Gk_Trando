import React, {useState} from "react";
import lessthan from "../images/lessthan.png";
import q1img from "../images/q5.svg";
import axios from "axios";
import {useNavigate} from "react-router-dom";
axios.defaults.withCredentials = true;

function Q5() {
    const navigate = useNavigate();
    const [opt,setopt] = useState("");

    const handlechange = (event) => {
        setopt(event.target.value);
    }

    const handleclick = async(event) => {
        event.preventDefault();
        if(opt != "")
        {
            try {
                const res = await axios.post("http://localhost:5000/api/questions",{
                    time : opt
                });
                navigate("/dashboard");
            } catch (error) {
                console.log(error);
            }
        }
        else 
        {
            alert("Please fill the fields");
        }
    }
    return (
        <div className = "q-1">
            <div className = "qcircle-1"></div>
            <div className = "qcircle-2"></div>
            <div className = "qcircle-3"></div>
            <a href = "/q4"><img src = {lessthan} className = "back" /></a>
            <div className = "q-2">
                <p className = "q-3">Lets know more about you</p>
                <img src = {q1img} className = "q2image"/>
            </div>
            <form className = "q-4">
                <p className = "q2-4-1">How much time you can give?</p>
                <select placeholder = "Please Select..." className = "q-5" onChange = {handlechange}>
                    <option className = "q-5">5 minutes</option>
                    <option className = "q-5" >10 minutes</option>
                    <option className = "q-5" >15 minutes</option>
                    <option className = "q-5">20 minutes</option>
                    <option value="" disabled selected hidden>Please Select...</option>
                </select>
                <button type = "submit" className = "qbutton" onClick = {handleclick}>Next</button>
            </form>
        </div>
    );   
}

export default Q5;