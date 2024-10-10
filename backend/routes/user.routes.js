import express from 'express'
import { loginUser, register, adminLogin } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter