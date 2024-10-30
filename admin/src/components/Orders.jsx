import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Orders = ({token}) => {

  const [orders, setOrders] = useState([]);


  const fetchAllOrders = async ()=> {
    if(!token){
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {headers : {token}})
      if(response.data.success){
          setOrders(response.data.orders.reverse())
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId)=> {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status : event.target.value}, {headers : {token}})
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, []);
  
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order, index) => (
          <div key={index}>

          <li key={index}>
            <p>User ID: {order.userId}</p>
            <p>Items: {JSON.stringify(order.items)}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
            <p>Status: {order.status}</p>
          </li>

          <select onChange={(event)=> statusHandler(event, order._id)} value={order.status}>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>
        ))}
      </ul>
    </div>
  )
}

export default Orders