import express from 'express'
import {signupController} from '../controller/auth_controller.js'
//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST 
router.post('/signup', signupController)

export default router