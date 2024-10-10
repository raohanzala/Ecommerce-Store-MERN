import React, { useState } from 'react'

const Login = () => {

  const [currentState , setCurrentState] = useState('Login')

  const [formData, setFormData] = useState({
    username: '',
    password : '',
    email : ''
  }) 

  const onSubmitHandler = (e)=>{
    e.preventDefault()

  }
  
  
  const changeHandler = (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})

  }

  const login = async ()=>{
    console.log('Login function ')

    let responseData

    await fetch('http://localhost:3000/login', {
      method : 'POST',
      headers : {
        Accept  : 'application/form-data',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((res)=> res.json()).then((data)=> responseData=data)


    if(responseData.success ){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    }else{
      alert(responseData.errors)
    }
  }



  const signup = async ()=>{
    console.log('singup function')

    let responseData

    await fetch('http://localhost:3000/signup', {
      method : 'POST',
      headers : {
        Accept  : 'application/form-data',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((res)=> res.json()).then((data)=> responseData = data)


    if(responseData.success ){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace('/')
    }else{
      alert(responseData.errors)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? '' : <input type="text" name='username' value={formData.username}  onChange={changeHandler} className='w-full px-3 py-2 border border-gray-800' placeholder='Name'  required />}
      <input type="email" name='email' value={formData.email} onChange={changeHandler} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" name='password' value={formData.password} onChange={changeHandler} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
          {
            currentState === 'Login'
            ? <p onClick={()=> setCurrentState('Sign Up')} className='cursor-pointer'>Create account </p>
            : <p onClick={()=> setCurrentState('Login')} className='cursor-pointer'>Login Here </p>
          }
      </div>
      <button onClick={()=> {currentState === 'Login' ? login(): signup()}} className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login'? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login