import express from 'express'
import { loginUser, registerUser, adminLogin, allUser } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/users', allUser)

export default userRouter