import React, {useState} from "react";
import lessthan from "../images/lessthan.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signin() {
    const navigate = useNavigate();
    const [mobile,setmobile] = useState("");

    const handlechange = (event) => {
        setmobile(event.target.value);
    }

    const handleclick = async(event) => {
        event.preventDefault();
        if(mobile)
        {
            try {
                const res = await axios.post("http://localhost:5000/api/signupin",{mobile});
                console.log(res.data);
                if(res)
                {
                    const res1 = await axios.get("http://localhost:5000/api/generateotp");
                    const code = res1.data.code;
                    console.log(code);
                    navigate("/verifyotp",{
                        state: {
                            mobile: mobile,
                            code: res1.data.code
                        }
                    });
                }
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
        <div className = "signin-1">
            <div className = "signincircle-1"></div>
            <div className = "signincircle-2"></div>
            <div className = "signincircle-3"></div>
            <a href = "/"><img src = {lessthan} className = "back" /></a>
            <p className = "signin-2">Create Account</p>
            <p className = "signin-3">Sign up</p>
            <form className = "signin-4">
                <input className = "signin-5" placeholder = "+7 (960) 407-3-833" onChange = {handlechange}></input>
                <div className = "signin-6">
                    <button type= "submit" className = "signin-7" onClick = {handleclick} >Sign Up</button>
                </div>
                <p className = "signin-8">Having a query ?</p>
                <div className = "signin-6">
                    <button className = "signin-9">Get Help</button>
                </div>
            </form>
        </div>
    );
}

export default Signin;