import JWT from "jsonwebtoken";
import user_model from "../model/user_model.js";

//Protected Routes
export const requireSignIn = (req, res, next) => {
    try{
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    }catch(error){
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'Invalid Token'
        })
    }     
}; 

//Admin Access
export const isAdmin = async(req, res, next) => {
    try{
        const user = await user_model.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: 'Access Denied'
            })
        }else{
            next();
        }
    } catch(error){
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'Error in Admin Middleware',
            error
        })
    }
}

       