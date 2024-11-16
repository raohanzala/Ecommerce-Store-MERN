import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../../frontend/src/assets/assets'
import { backendUrl } from '../App'
import toast from 'react-hot-toast';

const ListProduct = ({token}) => {

  const [allproducts, setAllProducts] = useState([])
  console.log(allproducts)

  const fetchList = async () => {

    try {
        const response = axios.get(backendUrl + '/api/product/list')
        if( response.data.success){
          setAllProducts(response.data.products)
        }else{
          toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }

  }

  const removeProduct= async (id)=> {
      try {
          const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}} )

          if( response.data.success){
            toast.success(response.data.message)
            await fetchList
          }else{
            toast.error(response.data.message)
          }

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(() => {
    fetchList()
  }, [])


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
          <img src={product.image[0]} className='w-14 h-14 m-auto object-cover' alt={product.name} />
          <p> {product.name}</p>
          <p> {product.category}</p>
          <p>{product.new_price}</p>
          <h3 onClick={() => removeProduct(product._id)}>Delete</h3>

        </div>
        )
      })}

    </div>
    </div>
  )
}

export default ListProduct