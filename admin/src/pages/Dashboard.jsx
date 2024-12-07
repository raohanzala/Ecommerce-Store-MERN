import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import toast from "react-hot-toast";
import { backendUrl } from "../App";
import axios from "axios";
import { FaShoppingCart, FaDollarSign, FaBoxes, FaUsers } from "react-icons/fa"; // Correct Import Position

const Dashboard = ({ token }) => {
  const { setPageTitle, setIsLoading } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const totalRevenue = orders
    .map((order) => order.amount)
    .reduce((total, amount) => total + amount, 0);

  // Fetch all orders
  const fetchAllOrders = async () => {
    setIsLoading(true);
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
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all products
  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: { token },
      });
      if (response.data.success) {
        setAllProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all users
  const fetchAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/user/users", {
        headers: { token },
      });
      if (response.data.success) {
        setAllUsers(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Format amount in the desired format
  function formatAmount(amount) {
    if (typeof amount !== "number") {
      throw new Error("Input must be a number");
    }

    const [integerPart, decimalPart] = amount.toString().split(".");

    const formattedInteger = integerPart
      .replace(/\B(?=(\d{2})+(?=\d{3}))/g, ",")
      .replace(/(\d)(?=(\d{3})+$)/, "$1,");

    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  }

  useEffect(() => {
    setPageTitle("Dashboard");
    fetchAllOrders();
    fetchAllUsers();
    fetchList();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Orders */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaShoppingCart className="text-blue-600 h-8 w-8" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{orders.length}</p>
            <p className="text-sm text-gray-500 mt-1">+10% from last month</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <FaDollarSign className="text-green-600 h-8 w-8" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {formatAmount(totalRevenue)}
            </p>
            <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <div className="p-3 bg-purple-100 rounded-full">
            <FaBoxes className="text-purple-600 h-8 w-8" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">{allProducts.length}</p>
            <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <div className="p-3 bg-yellow-100 rounded-full">
            <FaUsers className="text-yellow-600 h-8 w-8" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{allUsers?.length}</p>
            <p className="text-sm text-gray-500 mt-1">+8% from last week</p>
          </div>
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
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{order._id}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{order.address.name}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{order.amount}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{order.status}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{order.date}</td>
                </tr>
              ))}
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
            {allProducts.slice(0, 3).map((product) => (
              <li key={product._id} className="flex justify-between text-gray-700">
                <span>{product.name}</span>
                <span className="font-bold">{formatAmount(product.newPrice)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Customers */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Customers</h2>
          <ul className="space-y-2">
            {allUsers.slice(0, 3).map((user) => (
              <li key={user._id} className="flex justify-between text-gray-700">
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">{user.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
