import { Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import NavBar from './components/NavBar';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react';
import Login from './components/Login';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {

  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : '')

  useEffect(()=> {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='h-screen bg-[#f6f9ff]'>
      {!token === ''? <Login setToken={setToken}/> :
      <>
       <ToastContainer/>
      <NavBar setToken={setToken} />
      <Routes>
        <Route path="*" element={<Admin token={token} />} />
      </Routes>
      </>}
    </div>
  );
  // return (
  //   <div className='h-screen bg-[#f6f9ff] overflow-hidden'>
  //     <NavBar />
  //     <hr />
  //     <div className='flex'> 
  //       <SideBar/>
  //       <Routes>
  //         <Route path='/addproducts' element={<AddProduct/>}/>
  //         <Route path='/listproducts' element={<ListProduct/>}/>
  //         <Route path='/order' element={<Orders/>}/>
  //       </Routes>
  //     </div>
  //   </div>
  // );
}

export default App;
