import React from 'react';
import SearchSortBar from '../components/SearchSortBar';

const sampleOrders = [
  { id: 1, customer: "Alice Smith", amount: 12000, status: "Pending", date: "2024-10-01" },
  { id: 2, customer: "Bob Johnson", amount: 5400, status: "Delivered", date: "2024-10-02" },
  { id: 3, customer: "Charlie Brown", amount: 8900, status: "Canceled", date: "2024-10-03" },
  { id: 1, customer: "Alice Smith", amount: 12000, status: "Pending", date: "2024-10-01" },
  { id: 2, customer: "Bob Johnson", amount: 5400, status: "Delivered", date: "2024-10-02" },
  { id: 3, customer: "Charlie Brown", amount: 8900, status: "Canceled", date: "2024-10-03" },
  { id: 1, customer: "Alice Smith", amount: 12000, status: "Pending", date: "2024-10-01" },
  { id: 2, customer: "Bob Johnson", amount: 5400, status: "Delivered", date: "2024-10-02" },
  { id: 3, customer: "Charlie Brown", amount: 8900, status: "Canceled", date: "2024-10-03" },
  { id: 1, customer: "Alice Smith", amount: 12000, status: "Pending", date: "2024-10-01" },
  { id: 2, customer: "Bob Johnson", amount: 5400, status: "Delivered", date: "2024-10-02" },
  { id: 3, customer: "Charlie Brown", amount: 8900, status: "Canceled", date: "2024-10-03" },
  // Add more sample orders as needed
];

const Orders = () => {
  return (
    <div>
        <SearchSortBar placeholder='Search orders' options={['recent', 'date']}/>
    <div className="overflow-x-auto">

      <table className="min-w-full bg-white border rounded-md  border-gray-300">
        <thead>
          <tr className="bg-[#95e5be] text-white">
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Amount (PKR)</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50 text-center">
              <td className="py-3 px-4">{order.id}</td>
              <td className="py-3 px-4">{order.customer}</td>
              <td className="py-3 px-4">{order.amount}</td>
              <td className={`py-3 px-4  text-sm font-semibold ${order.status === "Pending" ? "text-yellow-500" : order.status === "Delivered" ? "text-green-500" : "text-red-500"}`}>
                {order.status}
              </td>
              <td className="py-3 px-4">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
    </div>
  );
};

export default Orders;
