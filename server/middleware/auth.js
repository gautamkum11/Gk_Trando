import jwt from "jsonwebtoken";

export default async function Auth(req,res,next) {
    try{
        const cookies = req.headers.cookie;
        const token = cookies.split("=")[1];
        const decodedtoken = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = decodedtoken;
        next();

    }catch(error){
        res.status(500).send("Authentication Failed");
    }
}

export function localVariables(req,res,next) {
    req.app.locals = {
        OTP : null
    }
    next();
}