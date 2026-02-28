import user_model from "../model/user_model.js";
import { hashPassword } from "../helper/auth_helper.js";

export const signupController = async(req, res) => {
    try {
        const {name, email, password, role} = req.body
        //validations
        if(!name){
            return res.send({error: 'Name is Required'})
        }
        if(!email){
            return res.send({error: 'Email is Required'})
        }
        if(!password){
            return res.send({error: 'Password is Required'})
        }   
        if(!role){
            return res.send({error: 'Role is Required'})
        }
        //check user
        const existinguser = await user_model.findOne({email})

         //existing user
         if(existinguser){
            return res.status(200).send({
                success: false,
                message: 'Already Register Please Login'
            })
        }  

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user =  new user_model({name, email, password: hashedPassword,role}).save()
        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error: error.message
        })
    }
};
    