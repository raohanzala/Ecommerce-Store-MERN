import React, { useContext, useEffect, useState } from 'react';
import SearchSortBar from '../components/SearchSortBar'; // Import your custom SearchSortBar component
import toast from 'react-hot-toast'; // Toast notifications
import { backendUrl } from '../App'; // Import your backend URL
import axios from 'axios'; // Axios for HTTP requests
import { ShopContext } from '../contexts/ShopContext';
import Loader from '../components/Loader';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for the drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer visibility
  const [isAnimating, setIsAnimating] = useState(false); // Animation for the drawer

  const {isLoading, setIsLoading, setPageTitle} = useContext(ShopContext)

  console.log('Is Loading',isLoading)
  // Fetch all orders from the backend
  const fetchAllOrders = async () => {
    setIsLoading(true)
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }finally{
      setIsLoading(false)
    }
  };

  // Handle order status change
  const statusHandler = async (event, orderId) => {
    setIsLoading(true)
    setIsDrawerOpen(false)
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }finally{
      setIsLoading(false)
    }
  };
  
  // Open drawer with selected order details
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  // Close drawer
  const closeDrawer = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setSelectedOrder(null);
    }, 300);
  };

  // Fetch orders on component mount
  useEffect(() => {
    setOrders([{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" }])
    // fetchAllOrders();
    setPageTitle('Orders')
  }, []);

  return (
    <div>
      <div className='mb-8'>

      <SearchSortBar placeholder="Search orders" options={['recent', 'date']} />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto mt-1">
        <table className="min-w-full bg-white rounded-md border-collapse table-auto">
          <thead>
            <tr className="bg-[#f2f2f2af] text-[#5c5c5c] text-sm">
            <th className="border py-3 px-1 max-w-fit ">S.No</th>
              <th className="border py-3 px-4">Product</th>
              <th className="border py-3 px-4">Customer</th>
              <th className="border py-3 px-4">Address</th>
              <th className="border py-3 px-4">Amount (PKR)</th>
              <th className="border py-3 px-4">Status</th>
              <th className="border py-3 px-4">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  onClick={() => handleOrderClick(order)}
                  className=" hover:bg-gray-50 text-center cursor-pointer text-sm "
                >
                  <td className="border py-3 px-4">{index + 1}</td>
                  <td className="border py-3 px-4 text-left">Patek Phillipe</td>
                  <td className="border py-3 px-4 text-left">{order.customerName || 'Kashif Ameen'}</td>
                  <td className="border py-3 px-4 text-left truncate">{order.address || 'H-429, Lahore, Punjab'}</td>
                  <td className="border py-3 px-4">{order.amount || '0'}</td>
                  <td
                    className={`py-3 border px-4 text-sm font-semibold ${
                      order.status === 'Pending'
                        ? 'text-yellow-500'
                        : order.status === 'Delivered'  
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-3 px-4 text-sm border">{order.date || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 text-center text-gray-500 font-semibold"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer for Order Details */}
      {isDrawerOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-20"
    onClick={closeDrawer}
  >
    <div
      className={`bg-white w-96 p-6 shadow-lg transform overflow-y-scroll transition-transform duration-300 ${
        isAnimating ? 'translate-x-0' : 'translate-x-full'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeDrawer}
        aria-label="Close drawer"
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      {selectedOrder ? (
        <>
          <p className="mb-5 text-gray-600">Date: {selectedOrder.date}</p>
          <table className="w-full border border-gray-300 text-left text-sm mb-3">
            <tbody>
              <tr className="border">
                <td className="py-2 px-4 font-semibold text-gray-600">Order ID</td>
                <td className="py-2 px-4">{selectedOrder._id}</td>
              </tr>
              <tr className="border">
                <td className="py-2 px-4 font-semibold text-gray-600">Customer</td>
                <td className="py-2 px-4">{selectedOrder.customerName}</td>
              </tr>
              <tr className="border">
                <td className="py-2 px-4 border font-semibold text-gray-600">Amount</td>
                <td className="py-2 px-4">{selectedOrder.amount}</td>
              </tr>
              <tr className="border">
                <td className="py-2 px-4 border font-semibold text-gray-600">Address</td>
                <td className="py-2 px-4">{selectedOrder.address}</td>
              </tr>
              <tr className="border">
                <td className="py-2 px-4 border font-semibold text-gray-600">Contact</td>
                <td className="py-2 px-4">{selectedOrder.contact}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 border font-semibold text-gray-600">Status</td>
                <td className="py-2 px-4">
                  <select
                    onChange={(event) =>
                      statusHandler(event, selectedOrder._id)
                    }
                    value={selectedOrder.status}
                    className="py-1 px-2 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="mb-2 text-lg font-semibold">Items</h2>
          <table className="w-full border border-gray-300 text-left text-sm">
            <tbody>
              <tr className="border">
                <td className="py-2 px-4 font-semibold text-gray-600">Order ID</td>
                <td className="py-2 px-4">{selectedOrder._id}</td>
              </tr>
              <tr className="border">
                <td className="py-2 px-4 font-semibold text-gray-600">Customer</td>
                <td className="py-2 px-4">{selectedOrder.customerName}</td>
              </tr>
              <tr className="border">
                <td className="py-2 px-4 border font-semibold text-gray-600">Amount</td>
                <td className="py-2 px-4">{selectedOrder.amount}</td>
              </tr>
              <tr className="border">
                <td className="py-2 px-4 border font-semibold text-gray-600">Address</td>
                <td className="py-2 px-4">{selectedOrder.address}</td>
              </tr>
              <tr className="border">
                <td className="py-2 px-4 border font-semibold text-gray-600">Contact</td>
                <td className="py-2 px-4">{selectedOrder.contact}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 border font-semibold text-gray-600">Status</td>
                <td className="py-2 px-4">
                  <select
                    onChange={(event) =>
                      statusHandler(event, selectedOrder._id)
                    }
                    value={selectedOrder.status}
                    className="py-1 px-2 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-gray-500">No order selected.</p>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Orders;
