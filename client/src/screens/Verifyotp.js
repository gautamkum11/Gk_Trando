import React, {useEffect, useState} from "react";
import lessthan from "../images/lessthan.png";
import otpimage from "../images/otp.svg";
import OtpInput from 'react-otp-input';
import {useLocation,useNavigate} from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
let firstRender = true;

function Verifyotp() {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    const resend = async() => {
        try{
            const res = await axios.get("http://localhost:5000/api/generateotp");
            const code = res.data.code;
            console.log(code);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(firstRender)
        {
            firstRender = false;
            resend();
        }
    },[]);

    const handleclick = async(event) => {
        event.preventDefault();
        if(otp) 
        {
            try {
                const res = await axios.get("http://localhost:5000/api/verifyotp",{
                    params : {
                        code:otp,
                        mobile: location.state.mobile
                    }
                });
                if(res.data.message === "dashboard")
                {
                   return navigate("/dashboard");
                }
                alert(res.data.message);
                if(res.data.message === "Verified successfully")
                navigate("/q1",{
                    state: {
                        token : res.data.token
                    }
                });
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
        <div className = "otp-1">
            <div className = "otpcircle-1"></div>
            <div className = "otpcircle-2"></div>
            <div className = "otpcircle-3"></div>
            <a href = "/"><img src = {lessthan} className = "back" /></a>
            <form className = "otp-2">
                <img src = {otpimage} className = "otpimg" />
                <p className = "otp-3">OTP Verification</p>
                <p className = "otp-4">Enter the OTP sent to your email / mobile</p>
                <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>---</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle = "otpinput"
                />
                <form style= {{display: "flex",justifyContent:"center"}}>
                    <p className = "otp-6">Didn’t you receive the OTP?</p>
                    <a href = "/verifyotp" className = "otp-5" onClick= {resend}> Resend OTP</a>
                </form>
                <button type = "submit" className = "otpbutton" onClick = {handleclick}>Verify</button>
            </form>
        </div>
    );
}

export default Verifyotp;


