import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const ProductItem = ({ id, description, size, image, name, newPrice, oldPrice }) => {
  const { currency, addToCart } = useContext(ShopContext);

  console.log(oldPrice, newPrice);
  

  const offer = Math.floor(((oldPrice - newPrice) / oldPrice) * 100);

  // function formatPriceInPKR(price) {
  //   console.log(price, typeof price);
    
  //   // const priceString = price.toString();
  //   const afterPoint = price.indexOf('.') > 0 ? price.substring(price.indexOf('.')) : '';
  //   let beforePoint = price.indexOf('.') > 0 ? price.substring(0, price.indexOf('.')) : price;
    
  //   const lastThree = beforePoint.substring(beforePoint.length - 3);
  //   const otherNumbers = beforePoint.substring(0, beforePoint.length - 3);
    
  //   const formattedPrice = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + ',' + lastThree;
    
  //   return formattedPrice + afterPoint;
  // }
  
  const shortDescription = description.length > 60 ? description.slice(0, 60) + '...' : description;

  return (
    <Link to={`/product/${id}`}>
      <div className='flex relative w-full h-auto flex-col text-gray-700 border cursor-pointer rounded-md bg-white overflow-hidden transform transition-all duration-500 hover:shadow-md'>

        <div className='absolute top-2 left-2 bg-[red] flex items-center justify-center shadow-md text-white w-10 h-10 text-xs font-bold z-10 rounded-full'>
          {offer}%
        </div>

        <div className='relative w-full h-48 md:h-56 overflow-hidden'>
          {/* Default image */}
          <img
            src={image[0]}
            className='w-full h-full object-cover transition-opacity duration-500 ease-in-out hover:opacity-0'
            alt={name}
          />
          {/* Hover image */}
          <img
            src={image[1]}
            className='absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100'
            alt={name}
          />
        </div>

        <div className='text-center py-3 px-2'>
          <p className='text-sm tracking-wide font-semibold uppercase mb-1'>{name}</p>
          <p className='text-xs text-gray-500'>{shortDescription}</p>
          <div className='flex gap-2 justify-center items-center mt-2'>
            <p className='text-sm text-gray-400 line-through'>{currency} {oldPrice}</p>
            <p className='text-lg font-semibold text-[#e6bf5d]'>{currency} {newPrice}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
