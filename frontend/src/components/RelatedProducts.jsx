import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, sub_category }) => {


  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  console.log(products)
  console.log(related)

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()

      productsCopy = productsCopy.filter((item) => category === item.category)
      productsCopy = productsCopy.filter((item) => sub_category === item.sub_category)

      setRelated(productsCopy.slice(0, 5))
    }
  }, [])

  return (
    <div className='my-24'>
      <div className="text-center text-3xl  py-2" >
        <Title text1={'RELATED'} text2={'PRODUCTS'} />

      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          related.map((item, index) => {
            console.log(item)
            return <ProductItem key={item._id} id={item._id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image} description={item.description} />
          })
        }
      </div>
    </div>
  )
}

export default RelatedProducts