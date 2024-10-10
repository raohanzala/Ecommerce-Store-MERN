import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const { cartItems, navigate } = useContext(ShopContext);

  const handlePlaceOrder = async () => {
    if (!firstName || !lastName || !email || !street || !country || !phone) {
      alert('Please fill out all fields.');
      return;
    }

    const orderData = {
      userId : 'user-id-placeholder', 
      products: cartItems,
      address: `${street}, ${zipcode}, ${country}`,
      phone: phone,
      paymentMethod: method, // Optional: include payment method if needed
    };

    console.log('Placing order with data:', orderData);


    const response = await fetch('http://localhost:3000/placeorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();
    if (result.success) {
      alert('Order placed successfully!');
      navigate('/orders'); // Redirect to orders page
      // Optionally, clear cart here if needed
    } else {
      alert('Failed to place order');
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t max-w-[1280px] mx-auto'>
      {/* --------- Left Side ----------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='First name'
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Last name'
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Email address'
        />
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Street'
        />
        <div className='flex gap-3'>
          <input
            type="number"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Zipcode'
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Country'
          />
        </div>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Phone'
        />
      </div>

      {/* ------------ Right Side ------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ------------ Payment Method Selection ------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Logo" />
            </div>
            <div
              onClick={() => setMethod('razorpay')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay Logo" />
            </div>
            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
