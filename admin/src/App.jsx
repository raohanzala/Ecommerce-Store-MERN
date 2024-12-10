import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

import { Suspense } from 'react';
import AppLayout from './pages/AppLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ListProduct from './components/ListProduct';
import Orders from './pages/Orders';
import AddProduct from './components/AddProduct';
import Notifications from './pages/Notifications';
import Loader from './components/Loader';
import { ShopContext } from './contexts/ShopContext';
import LoadingLogo from './components/LoadingLogo';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = 'Rs.'

function App() {

const {token, isLoading : contextLoading} = useContext(ShopContext)

// const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")

// useEffect(()=> {
//   localStorage.setItem('token', token)
// },[token])


// if (contextLoading) {
//   return <Loader />;  // Or a simple loading spinner while the token is being fetched
// }
  return (
    <div className='h-screen bg-[#f6f9ff]'>
      {token ? 
      <AppLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Dashboard  />} />
          <Route path="/add" element={< AddProduct />} />
          <Route path="/list" element={< ListProduct />} />
          <Route path="/orders" element={< Orders />} />
          <Route path="/notifications" element={< Notifications />} />
          <Route path="/profile" element={< Profile/>} />
        </Routes>
      </Suspense>
    </AppLayout> : <Login /> }

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
