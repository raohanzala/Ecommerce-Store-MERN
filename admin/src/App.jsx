import { Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import NavBar from './components/NavBar';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className='h-screen bg-[#f6f9ff]'>
      <ToastContainer/>
      <NavBar />
      <Routes>
        <Route path="*" element={<Admin />} />
      </Routes>
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
