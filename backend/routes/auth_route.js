import express from 'express'
import {signupController,loginController,testcontroller} from '../controller/auth_controller.js'
import { isAdmin, requireSignIn } from '../middleware/auth_middleware.js';
//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST 
router.post('/signup', signupController)

//LOGIN || POST
router.post('/login', loginController)

//test route
router.get('/test', requireSignIn,isAdmin, testcontroller)

export default router