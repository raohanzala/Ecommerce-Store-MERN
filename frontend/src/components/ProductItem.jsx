// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'

// const ProductItem = ({id, description, image, name, new_price, old_price}) => {

//   console.log(image)

//   const {currency} = useContext(ShopContext)

//   return (
//     <Link className='text-gray-700 cursor-pointer'  to={`/product/${id}`}>
//       <div className='overflow-hidden'>
//         <img src={image} className='hover:scale-110  hover:brightness-[0.8] ease-in-out' style={{transition: '0.5s'}} alt={name} />
//       </div>
//       <div className='text-center'>

//       <p className='pt-3 pb-1 text-sm border-t-4 border-[#cba135]'>{name}</p>
//       <p className='text-sm font-medium'>{currency} {new_price}</p>
//       <p className='text-xs font-medium'>{description}</p>
//       <p className='text-2xl font-extrabold'>{currency} {old_price}</p>
//       </div>
//     </Link>
//   )
// }

// export default ProductItem

import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, description, size, image, name, new_price, old_price }) => {
  const { currency, addToCart } = useContext(ShopContext);

  // console.log(new_price, old_price)
  const offer = Math.floor(((old_price - new_price) / old_price) * 100);  // console.log(offer)

  function formatPriceInPKR(price) {
    const priceString = price.toString();
    const afterPoint = priceString.indexOf('.') > 0 ? priceString.substring(priceString.indexOf('.')) : '';
    let beforePoint = priceString.indexOf('.') > 0 ? priceString.substring(0, priceString.indexOf('.')) : priceString;
    
    const lastThree = beforePoint.substring(beforePoint.length - 3);
    const otherNumbers = beforePoint.substring(0, beforePoint.length - 3);
    
    const formattedPrice = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + ',' + lastThree;
    
    return formattedPrice + afterPoint;
  }


  return (
    <div className='flex relative flex-col text-gray-700 cursor-pointer border rounded-lg bg-white overflow-hidden transform transition-transform duration-500 '>

      <Link
        to={`/product/${id}`}
      >
        <div className='absolute top-2 left-2 bg-[#e6bf5d] flex items-center justify-center shadow-md text-white w-10 h-10 text-xs font-bold z-10 rounded-full'>
          {offer}%
        </div>

        <div className='overflow-hidden'>
          <img
            src={image}
            className='w-full h-48 md:h-56 object-cover transition-transform duration-500 ease-in-out hover:scale-110 hover:brightness-90'
            alt={name}
          />
        </div>
        <div className='text-center py-3 px-2'>
          <p className='text-sm tracking-wide font-semibold uppercase  mb-1'>{name}</p>
          <p className='text-xs text-gray-500'>{description}</p>
          <div className='flex gap-2 justify-center items-center mt-2' >
            <p className='text-sm font-medium text-gray-500 line-through'>{currency} {formatPriceInPKR(old_price)}</p>
            <p className='text-lg font-semibold  text-[red]'>{currency} {formatPriceInPKR(new_price)}</p>
          </div>
        </div>
      </Link>
      {/* <button className='bg- py-2 text-xs bg-[#cba135] font-semibold text-gray-50' onClick={() => (addToCart(id, size))}>ADD TO CART</button> */}
    </div>
  );
}

export default ProductItem;
