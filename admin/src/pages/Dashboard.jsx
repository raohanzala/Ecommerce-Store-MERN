import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Box from "../components/Box";
import HeadingLink from "../components/HeadingLink";
import Loader from "../components/Loader";
import { FiShoppingBag, FiUsers, FiDollarSign, FiBox } from 'react-icons/fi'; // Import Icons

const Dashboard = () => {
  const { 
    setPageTitle, 
    allUsers, 
    formatAmount, 
    orders, 
    initialLoading, 
    allProducts, 
    timestampToShortDate, 
    productLoading, 
    ordersLoading, 
    usersLoading 
  } = useContext(ShopContext);

  const totalRevenue = orders?.map((order) => order.amount)
    .reduce((total, amount) => total + amount, 0);

  useEffect(() => {
    setPageTitle("Dashboard");
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {initialLoading && <Loader type='full' />}
      
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here’s what’s happening with your store today.</p>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Box className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <FiShoppingBag className="text-blue-600 text-3xl" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
              {ordersLoading ? <Loader /> : (
                <>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{orders?.length}</p>
                  <p className="text-sm text-gray-500 mt-1">+10% from last month</p>
                </>
              )}
            </div>
          </div>
        </Box>

        <Box className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <FiDollarSign className="text-green-600 text-3xl" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
              {ordersLoading ? <Loader /> : (
                <>
                  <p className="text-3xl font-bold text-green-600 mt-2">{formatAmount(totalRevenue || 9000)}</p>
                  <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
                </>
              )}
            </div>
          </div>
        </Box>

        <Box className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <FiBox className="text-purple-600 text-3xl" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
              {productLoading ? <Loader /> : (
                <>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{allProducts?.length}</p>
                  <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
                </>
              )}
            </div>
          </div>
        </Box>

        <Box className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <FiUsers className="text-yellow-600 text-3xl" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
              {usersLoading ? <Loader /> : (
                <>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">{allUsers?.length}</p>
                  <p className="text-sm text-gray-500 mt-1">+8% from last week</p>
                </>
              )}
            </div>
          </div>
        </Box>
      </div>

      {/* Recent Orders */}
      <Box className="bg-white shadow-md rounded-lg mb-6">
        <HeadingLink title="Recent Orders" link="/orders" />
        <div className="overflow-x-auto">
          {ordersLoading ? <Loader /> : orders?.length > 0 ? (
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  {['Order ID', 'Customer', 'Total', 'Status', 'Date'].map((header) => (
                    <th key={header} className="px-4 py-2 text-sm font-semibold text-gray-600">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.address.firstName} {order.address.lastName}</td>
                    <td className="px-4 py-2">{formatAmount(order.amount)}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2">{timestampToShortDate(order.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-center py-4">No orders found.</p>
          )}
        </div>
      </Box>

      {/* Top Products and Latest Customers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Box className="bg-white shadow-md rounded-lg">
          <HeadingLink title="Top Products" link="/list" />
          {productLoading ? <Loader /> : (
            <ul className="space-y-4 p-4">
              {allProducts.slice(0, 3).map((product) => (
                <li key={product._id} className="flex items-center space-x-4">
                  <img src={product.image[0]} className="w-12 h-12 rounded" alt={product.name} />
                  <span>{product.name}</span>
                </li>
              ))}
            </ul>
          )}
        </Box>

        <Box className="bg-white shadow-md rounded-lg">
          <HeadingLink title="Latest Customers" link="/orders" />
          {usersLoading ? <Loader /> : (
            <ul className="space-y-4 p-4">
              {allUsers.slice(0, 3).map((user) => (
                <li key={user._id} className="flex items-center justify-between">
                  <span>{user.name}</span>
                  <span className="text-sm text-gray-500">{timestampToShortDate(user.date)}</span>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
