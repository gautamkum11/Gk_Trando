import User from "../models/Usermodel.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

export async function Signupin(req,res){
    try{
        const {mobile} = req.body;  
        if(!mobile)
        {
            return res.status(422).send({message : "Please fill the field"});
        }
        const userexist = await User.findOne({mobile});
        if(!userexist)
        {
            const user = new User({
                mobile: mobile,
                profession: ' ',
                experience: ' ',
                howknowus: ' ',
                whylearning: ' ',
                time: ' '
            });
            const newuser = await user.save();
            if(newuser)
            {
                return res.status(201).send({message: "User registered Successfully"});
            }
        }
        return res.status(201).send({message : "mobile number already exist"});
    }catch(error){
        return res.status(500).send({error});
    }
}

export async function generateOTP(req,res) {
    req.app.locals.OTP = otpGenerator.generate(4,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
    res.status(200).send({code : req.app.locals.OTP});
}

export async function verifyOTP(req,res) {
    const {code,mobile} = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code))
    {
        req.app.locals.OTP = null;
        const userexist = await User.findOne({mobile});
        const token = jwt.sign({userId: userexist._id},process.env.SECRET_KEY);
        res.status(200).cookie("jwtoken",token,{
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 600) //10min
        });
        if(userexist.profession === ' ' || userexist.experience === ' ' || userexist.howknowus === ' ' || userexist.whylearning === ' ' || userexist.time === ' ')
        {
            return res.status(200).send({
                message: "Verified successfully",
                token
            });
        }
        return res.status(200).send({message : "dashboard"});
    }
    else 
    {
        res.status(200).send({message : "Invalid otp"});
    }
}


export async function Questions(req,res) {
    try{
        const {userId} = req.user;
        const body = req.body;
        const updatedata = await User.updateOne({_id: userId},body);
        return res.status(201).send({message: "Record updated"}); 
    }catch(error){
        return res.status(500).send({error});
    }
}

export async function dashboard(req,res){
    try{
        const {userId} = req.user;
        const user = await User.findOne({_id: userId});
        return res.status(201).send(user);
    }catch(error) {
        return res.status(500).send({error});
    }
}