import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';
import Orders from '../components/Orders';

const Admin = () => {
  return (
    <div className="flex bg-gray-100">

      <SideBar />
      
      <div className='p-5'>
        <Routes>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/" element={<AddProduct />} /> {/* Default route */}
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
