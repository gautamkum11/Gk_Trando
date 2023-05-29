import jwt from "jsonwebtoken";

export default async function Auth(req,res,next) {
    try{
        const token = req.cookies.jwtoken;
        // console.log(token);
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