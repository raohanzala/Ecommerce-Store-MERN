import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Order status updated successfully');
        fetchAllOrders(); // Refresh the orders list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User ID</th>
              <th className="py-2 px-4 text-left">Items</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{order.userId}</td>
                <td className="py-2 px-4">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4">{order.address}</td>
                <td className="py-2 px-4">{order.phone}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="border border-gray-300 rounded p-1"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
