import express from 'express'
import {signupController,loginController} from '../controller/auth_controller.js'
//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST 
router.post('/signup', signupController)

//LOGIN || POST
router.post('/login', loginController)

export default router