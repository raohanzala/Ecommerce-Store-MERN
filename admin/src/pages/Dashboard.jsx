import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import toast from "react-hot-toast";
import { backendUrl } from "../App";
import axios from "axios";
import { useState } from "react";

const Dashboard = ({token}) => {
  const { setPageTitle, setIsLoading } = useContext(ShopContext);
  const [orders, setOrders] = useState([]); 

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

  useEffect(() => {
    setPageTitle("Dashboard");
    fetchAllOrders()
    }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Orders */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{orders.length }</p>
          <p className="text-sm text-gray-500 mt-1">+10% from last month</p>
        </div>
        {/* Revenue */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">$15,430</p>
          <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
        </div>
        {/* Total Items */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-600">Total Items</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">8,340</p>
          <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
        </div>
        {/* Active Users */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">523</p>
          <p className="text-sm text-gray-500 mt-1">+8% from last week</p>
        </div>
      </div>  

      {/* Recent Orders Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">Order ID</th>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">Customer</th>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">Total</th>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-2 border-b text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b text-sm text-gray-700">#1245</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">John Doe</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">$150</td>
                <td className="px-4 py-2 border-b text-sm text-green-600">Completed</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">2024-11-27</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b text-sm text-gray-700">#1246</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">Jane Smith</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">$250</td>
                <td className="px-4 py-2 border-b text-sm text-yellow-600">Pending</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">2024-11-26</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b text-sm text-gray-700">#1247</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">Mike Johnson</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">$90</td>
                <td className="px-4 py-2 border-b text-sm text-red-600">Cancelled</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">2024-11-25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Products</h2>
          <ul className="space-y-2">
            <li className="flex justify-between text-gray-700">
              <span>Smart Watch</span>
              <span className="font-bold">$3,200</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Fitness Tracker</span>
              <span className="font-bold">$2,800</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Luxury Watch</span>
              <span className="font-bold">$1,950</span>
            </li>
          </ul>
        </div>

        {/* Latest Customers */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Customers</h2>
          <ul className="space-y-2">
            <li className="flex justify-between text-gray-700">
              <span>John Doe</span>
              <span className="text-sm text-gray-500">2024-11-27</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Jane Smith</span>
              <span className="text-sm text-gray-500">2024-11-26</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Mike Johnson</span>
              <span className="text-sm text-gray-500">2024-11-25</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
