import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const protect = async (req, res, next) => {
    let token=req.headers.authorization ;
    if(token && token.startsWith("Bearer")){
        try {
            token=token.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({msg:"No token, authorization denied"})
        }
        
    }else{
        res.status(401).json({msg:"No token, authorization denied"})
    }
}
    

export {protect};
