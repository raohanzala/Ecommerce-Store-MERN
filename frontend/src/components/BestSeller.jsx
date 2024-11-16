import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { assets } from '../assets/assets'

const BestSeller = () => {

  const {products} = useContext(ShopContext)
  const [bestSeller, setBestSeller]= useState([])


  useEffect(()=> {
    const bestProduct = products.filter((item)=> item.bestseller === true)
    setBestSeller(bestProduct.slice(0, 5) )

  },[products])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1='BEST' text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, quas.</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestSeller.map((item, index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }

<ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
        <ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
        <ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
        <ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
        <ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
      </div>
    </div>
  )
}

export default BestSeller