import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

function Login({setToken}) {

  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')

  const onSubmitHandler = async (e)=> {
    try { 
      e.preventDefault()
      const response = await axios.post(backendUrl + 'api/user/admin', {email, password})
      console.log(response)
      if(response.data.success){
        setToken(response.data.token)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  return (



    <form onSubmit={onSubmitHandler}>
      <label htmlFor="email">Email Address</label>
      <input type='email' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <label htmlFor="email">Password</label>
      <input type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}/>

    </form>
  )
}

export default Login