import express from 'express'
import {signupController,loginController} from '../controller/auth_controller.js'
import { taskController,getAllTasksController,updateTaskController,deleteTaskController,searchTasksController } from '../controller/task_controller.js';
import { isAdmin, requireSignIn } from '../middleware/auth_middleware.js';
//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST 
router.post('/signup', signupController)

//LOGIN || POST
router.post('/login', loginController)

//test route
router.post('/tasks', requireSignIn, isAdmin, taskController)

router.put('/tasks/:id', requireSignIn, isAdmin, updateTaskController)

router.delete('/tasks/:id', requireSignIn, isAdmin, deleteTaskController)

router.get('/tasks/:id', searchTasksController)

router.get('/tasks', getAllTasksController)



export default router