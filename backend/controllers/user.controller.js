import validator from "validator"
import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User does't exist with this email" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = createToken(user._id)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid password' })
    }


  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const registerUser = async (req, res) => {
  try {

    const { name, password, email } = req.body

    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.json({ success: false, message: "User already exists" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' })
    }
    if (password.length < 8) {
      return res.json({ success: false, message: 'Please enter at least 8 characters' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword

    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({ success: true, token })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }


}

const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    res.json({success : false, message : error.message})
  }
}

const allUser = async (req, res) => {
  try {
    const users = await userModel.find({}); 
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, allUser }