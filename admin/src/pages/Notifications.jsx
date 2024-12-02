import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { io } from 'socket.io-client';
import { ShopContext } from '../contexts/ShopContext';

const socket = io('http://localhost:3001'); // Replace with your backend URL

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const {isLoading, setIsLoading, setPageTitle} = useContext(ShopContext)

  console.log('Notification', notifications)

  useEffect(() => {
    // Listen for notifications
    socket.on('notification', (data) => {
      console.log('Notification received:', data);
      setNotifications((prev) => [...prev, data]);
    });

    setPageTitle("Notifications")

    // Cleanup listener on unmount
    return () => socket.off('notification');
  }, []);

  return (
    <div>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index} className='py-4 px-3 bg-white rounded-sm'>{`${notif.fullDocument.address.firstName} order's a ${notif.items[0].name}`}</li>
        ))}
        <li className='py-4 px-3 bg-white rounded-sm'>I am notification for my clients and orders that you want to hear.</li>
      </ul>
    </div>
  );
};

export default Notifications;
