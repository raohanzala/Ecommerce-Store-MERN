import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

import { Suspense } from 'react';
import LoadingLogo from './components/LoadingLogo';
import AppLayout from './pages/AppLayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ListProduct from './components/ListProduct';
import Orders from './pages/Orders';
import AddProduct from './components/AddProduct';
import Loader from './components/Loader';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = 'Rs.'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : '')

  useEffect(()=> {
    // localStorage.removeItem('token');
    localStorage.setItem('token', token)
  }, [token])


  console.log(token ? 'Token is present' : 'No token found');
  

  return (
    <div className='h-screen bg-[#f6f9ff]'>
      {token ? 
      <AppLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={< AddProduct/>} />
          <Route path="/list" element={< ListProduct/>} />
          <Route path="/orders" element={< Orders/>} />
          <Route path="/settings" element={< Settings/>} />
        </Routes>
      </Suspense>
    </AppLayout> : <Login setToken={setToken}/> }

    <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '1px' }}
        toastOptions={{
          success: {
            duration: 2000
          },
          error: {
            duration: 3000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',

          }
        }}
      />
    </div>
  );
  
}

export default App;
