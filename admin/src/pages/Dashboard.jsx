import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Box from "../components/Box";
import HeadingLink from "../components/HeadingLink";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { setPageTitle,allUsers,formatAmount, orders,initialLoading, allProducts, timestampToShortDate, productLoading, 
    ordersLoading, 
    usersLoading  } = useContext(ShopContext);

  console.log(allProducts, 'RespFetchList')
  
  const totalRevenue = orders?.map((order) => order.amount)
    .reduce((total, amount) => total + amount, 0);

  useEffect(() => {
    setPageTitle("Dashboard");
  }, []);

  return (
    <div className="">
       {initialLoading && <Loader type='full' />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Box>
          <div className="ml-4">
           <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
           {ordersLoading ? <p>Loading...</p>: <>
            <p className="text-3xl font-bold text-blue-600 mt-2">{orders?.length}</p>
            <p className="text-sm text-gray-500 mt-1">+10% from last month</p></> }
          </div>
        </Box>

        <Box>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
            {ordersLoading ? <p>Loading...</p>: <><p className="text-3xl font-bold text-green-600 mt-2">
              {formatAmount(totalRevenue || 9000)}
            </p>
            <p className="text-sm text-gray-500 mt-1">+15% from last month</p></>}
          </div>
        </Box>

        <Box>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
            {productLoading ? <p>Loading...</p>: <><p className="text-3xl font-bold text-purple-600 mt-2">{allProducts?.length}</p>
            <p className="text-sm text-gray-500 mt-1">+5% from last month</p></>}
          </div>
        </Box>

        <Box>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
            {usersLoading ? <p>Loading...</p>: <> <p className="text-3xl font-bold text-yellow-600 mt-2">{allUsers?.length}</p>
            <p className="text-sm text-gray-500 mt-1">+8% from last week</p></>}
          </div>
        </Box>
      </div>

      <Box className='mb-6'>
        <HeadingLink title='Recent Orders' link='/orders'/>
        <div className="overflow-x-auto">
          {ordersLoading ? <p>Loading...</p> : orders?.length > 0 ? <table className="table-auto w-full text-left border-collapse">
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
              {orders?.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{order._id}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{order.address.firstName} {order.address.lastName}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{formatAmount(order.amount)}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{order.status}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{timestampToShortDate(order.date)}</td>
                </tr>
              ))}
            </tbody>
          </table> : <div className="flex w-full h-full items-center justify-center"> <p className=" text-[#d2d2d2] mb-10 mt-2">You have no orders yet.</p></div>}
        </div>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Box>
        <HeadingLink title='Top Products' link='/list'/>
        {/* {isLoading && <p>Loading...</p> */}
         {productLoading ? <p>Loading...</p> : allProducts?.length > 0 ? <ul className="space-y-2">
            {allProducts?.slice(0, 3).map((product) => (
              <li key={product._id} className="flex justify-between text-gray-700">
                <div className="flex gap-2 items-center">
                <img src={product.image[0]} className="size-8" alt="" />
                <span>{product.name}</span>
                </div>
                <span className="font-bold">{formatAmount(product?.newPrice)}</span>
              </li>
            ))}
          </ul> : <div className="flex w-full h-full items-center justify-center"> <p className=" text-[#d2d2d2] mb-8">You have no products yet.</p></div>}
        </Box>

        <Box className='min-h-44 '>
        <HeadingLink title='Lastest Customers' link='/orders'/>
          { usersLoading ? <p>Loading...</p> : allUsers.length > 0 ? <ul className="space-y-2">
            {allUsers.slice(0, 3).map((user) => (
              <li key={user._id} className="flex justify-between text-gray-700">
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">{timestampToShortDate(user?.date)}</span>
              </li>
            ))}
          </ul> : <div className="flex w-full h-full items-center justify-center"> <p className=" text-[#d2d2d2] mb-8">You have no customers yet.</p></div>}
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
