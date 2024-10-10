import React, { useEffect, useState } from 'react'

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:3000/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);
  
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <p>User ID: {order.userId}</p>
            <p>Items: {JSON.stringify(order.items)}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders