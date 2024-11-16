import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import toast from 'react-hot-toast';

function Login({setToken}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async ()=> {
    try { 
      const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Dashboard</h2>
        <p className="text-center text-gray-600">Sign in to your account</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login