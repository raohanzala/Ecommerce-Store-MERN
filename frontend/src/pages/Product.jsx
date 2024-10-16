import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import LoadingSpinner from '../components/LoadingSpinner'

const Product = () => {

  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1) // Added quantity state


  console.log(productData)

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  // Handle quantity increment
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  // Handle quantity decrement
  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  if (!productData) {
    return <LoadingSpinner />;
  }

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacit-100 max-w-[1280px] mx-auto'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-start sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className='w-[24%] sm:w-full sm:h-24 h-20 sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border border-gray-200 hover:opacity-80 transition-opacity'
                  alt={`Thumbnail ${index + 1}`}
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] h-[620px]'>
            <img className='w-full h-full object-cover rounded-md shadow-md' src={image} alt="Product Image" />
          </div>
        </div>

        {/* ---------- Product Info ------------ */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {Array.from({ length: 4 }).map((_, index) => (
              <img key={index} src={assets.star_icon} className='w-3.5' alt="Star Icon" />
            ))}
            <img src={assets.star_dull_icon} className='w-3 5' alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <div className='flex gap-5'>

          <p className='mt-5 text-xl text-gray-400 line-through'>{currency} {productData.new_price}</p>
          <p className='mt-5 text-lg font-medium text-[primary]'>{currency}{productData.old_price}</p>
          </div>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>


          {productData.sizes.length > 0 && (
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData?.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>)}

          {/* Quantity Selector */}
          <div className='flex flex-col gap-4 my-8'>
            <p className='text-lg font-semibold text-gray-700'>Select Quantity</p>
            <div className='flex items-center border border-gray-300 rounded-md overflow-hidden w-max'>
              <button
                onClick={decrementQuantity}
                className='bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold p-2 transition duration-200 ease-in-out'
              >
                -
              </button>
              <input
                type='text'
                value={quantity}
                readOnly
                className='w-12 text-center text-lg font-medium bg-white border-x border-gray-300 py-2 px-4'
              />
              <button
                onClick={incrementQuantity}
                className='bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold p-2 transition duration-200 ease-in-out'
              >
                +
              </button>
            </div>
          </div>




          <button onClick={() => (addToCart(productData._id, size, quantity))} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 ' />
          <div className='tedxt-sm text-gray-500 mt-5  flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>


        </div>

      </div>

      <div className='mt-20'>
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat minus temporibus est, eveniet molestiae optio sint vitae aperiam consectetur aut, excepturi inventore. Ipsa, rem?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque adipisci veritatis nobis soluta nostrum cum magnam molestiae quibusdam deleniti odit.</p>
        </div>
      </div>

      {/* -------- Related Prodcucts ----------- */}

      <RelatedProducts category={productData.category} sub_Category={productData.sub_category} />
    </div>
  ) : <div className='opacity-0'> </div>
}

export default Product