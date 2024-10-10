import React, { useEffect, useState } from 'react'
import { assets } from '../../../frontend/src/assets/assets'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([])
  console.log(allproducts)

  const fetchInfo = async () => {
    await fetch('http://localhost:3000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) })
  }

  useEffect(() => {
    fetchInfo()
  }, [])


  const remove_product = async (id) => {
    await fetch('http://localhost:3000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    await fetchInfo()
  }
  return (
    <div className=' bg-white shadow-lg p-5 max-w-[800px]'>
      <h1 className='mb-7 text-2xl text-gray-600 uppercase '>All Product</h1>
      <div>

        <div className='grid p-2 grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr_0.5fr] bg-gray-100 border-b-0 items-center text-center gap-3 border'>

          <p>No</p>
          <p>Images</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        <hr />

      {allproducts.map((product, index) => {
        return (
        <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr_0.5fr] p-3 w-full items-center text-center gap-10 border'>
          <p>{index + 1}</p>
          <img src={product.image} className='w-14 h-14 m-auto object-cover' alt={'omega'} />
          <p> {product.name}</p>
          <p> {product.category}</p>
          <p>{product.new_price}</p>
          <h3 onClick={() => remove_product(product._id)}>Delete</h3>

        </div>
        )
      })}

    </div>
    </div>
  )
}

export default ListProduct