// import React, { useState } from 'react'
// import upload_area from '../assets/Assets/Admin_Assets/upload_area.svg';
// import { toast } from 'react-toastify';

// const AddProduct = () => {

//   const [image, setImage] = useState(false)
//   const [selectedSizes, setSelectedSizes] = useState([]);


//   const [etails] = useState({
//     name: '',
//     description: '',
//     image: '',
//     category: 'men',
//     sub_category: '',
//     sizes: selectedSizes,
//     new_price: '',
//     old_price: '',
//     availibility: ''
//   })

//   console.log(selectedSizes)
//   console.log(productDetails.selectedSizes)

//   const imageHandler = (e) => {
//     setImage(e.target.files[0])

//   }

//   const changeHandler = (e) => {
//     setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
//   }


//   const handleSizeChange = (size) => {
//     setSelectedSizes((prevSizes) => {
//       if (prevSizes.includes(size)) {
//         return prevSizes.filter((s) => s !== size);
//       } else {
//         return [...prevSizes, size];
//       }
//     });
//   };



//   const Add_Product = async () => {
//     let responseData
//     let product = productDetails

//     let formData = new FormData()
//     formData.append('product', image)

//     await fetch('http://localhost:3000/upload', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json'
//       },
//       body: formData
//     }).then((res) => res.json()).then((data) => { responseData = data })

//     if (responseData.success) {
//       product.image = responseData.image_url
//       console.log(product)

//       await fetch('http://localhost:3000/addproduct', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(product)

//       }).then((res) => res.json()).then((data) => {
//         data.success ? toast.success("Product Added") : toast.error('Failed')
//       })

//     }
//   }

//   return (
//     <div>
//       <div className='flex gap-5 justify-around bg-white p-10 w-full' style={{ boxShadow: '0px 0 10px rgba(1, 41, 112, 0.1)' }}>
//         <div>
//           <div className='mb-4'>
//             <h1 className='text-xl mb-2'>Product Title</h1>
//             <input value={productDetails.namechangeHandler} className='w-full py-3 px-2 border' type="text" name='name' placeholder='Type Here' />
//           </div>
//           <div className='mb-4'>
//             <h1 className='text-xl mb-2'>Product Description</h1>
//             <textarea value={productDetails.descriptionchangeHandler} className='w-full py-3 px-2 border' name='description' placeholder='Type here'></textarea>
//           </div>

//           <div className='flex gap-5'>
//             <div className='mb-4'>
//               <h1 className='text-xl mb-2'>Price</h1>
//               <input value={productDetails.old_pricechangeHandler} className='w-full py-3 px-2 border' type="number" name='old_price' placeholder='Type Here' />
//             </div>

//             <div className='mb-4'>
//               <h1 className='text-xl mb-2'>Offer Price</h1>
//               <input value={productDetails.new_pricechangeHandler} className='w-full py-3 px-2 border' type="number" name='new_price' placeholder='Type Here' />
//             </div>
//           </div>

//         </div>
//         <hr className='bg-gray-300 h-full w-[1px]' />
//         <div>

//           <div className='mb-4'>
//             <h1 className='text-xl mb-2'>Sizes</h1>
//             <div className='flex flex-wrap gap-2'>
//               {['S', 'M', 'L', 'XL'].map((size) => (
//                 <label key={size} className='flex items-center gap-2'>
//                   <input
//                     type='checkbox'
//                     value={size}
//                     checked={selectedSizes.includes(size)}
//e) => handleSizeChange(e.target.value)}
//                   />
//                   {size}
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div className='flex gap-5'>

//             <div className='mb-4'>
//               <h1 className='text-xl mb-2'>Product Category</h1>
//               <select value={productDetails.categorychangeHandler} className='w-full border py-3 px-2' name="category" id="">
//                 <option value="women">Women</option>
//                 <option value="men">Men</option>
//                 <option value="kids">Kids</option>
//               </select>
//             </div>
//             <div className='mb-4'>
//               <h1 className='text-xl mb-2'>Product Sub-Category</h1>
//               <select value={productDetails.sub_categorychangeHandler} className='w-full border py-3 px-2' name="sub_category" id="">
//                 <option value="watches">watches</option>
//                 <option value="automatic">automatic</option>
//                 <option value="quartz">quartz</option>
//               </select>
//             </div>
//           </div>

//           {/* <div>
//           <label htmlFor="file-input">
//             <img src={image ? URL.createObjectURL(image) : upload_area} alt="" />
//           </label>
//           <imageHandler} type="file" hidden name='image'  />
//         </div> */}
//           <div>

//             <div className='cursor-pointer' onClick={() => document.getElementById('file-input').click()}>
//               <img
//                 src={image ? URL.createObjectURL(image) : upload_area}
//                 alt='Upload Area'
//                 className='w-32 h-32 object-cover border-2 border-dashed border-gray-300 p-2'
//               />
//             </div>
//             <input
//               id='file-input'
//imageHandler}
//               type='file'
//               hidden
//               name='image'
//             />
//           </div>
//           <button className='bg-black text-white py-2 px-5 mt-10' onClick={() => Add_Product()}>ADD</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddProduct


import React, { useState } from 'react'
import upload_area from '../assets/Assets/Admin_Assets/upload_area.svg';
import { toast } from 'react-toastify';
import { assets } from '../../../frontend/src/assets/assets';

const AddProduct = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [oldPrice, setOldPrice] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubcategory] = useState('')
  const [bestSeller, setBestSeller] = useState(false)
  const [size, setSize] = useState([])

  const onSubmitHandler = async ()=> {

  }


  return (
    <form onSubmit={onSubmitHandler}>
      <div className='flex gap-5 justify-around bg-white p-10 w-full' style={{ boxShadow: '0px 0 10px rgba(1, 41, 112, 0.1)' }}>
        <div>
          <div className='mb-4'>
            <h1 className='text-xl mb-2'>Product Title</h1>
            <input className='w-full py-3 px-2 border'
              type='text'
              name='name'
              placeholder='Type Here'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className='mb-4'>
            <h1 className='text-xl mb-2'>Product Description</h1>
            <textarea
              className='w-full py-3 px-2 border'
              name='description'
              placeholder='Type here'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          <div className='flex gap-5'>
            <div className='mb-4'>
              <h1 className='text-xl mb-2'>Price</h1>
              <input className='w-full py-3 px-2 border'
                type='number'
                name='old_price'
                placeholder='Type Here'
                onChange={(e) => setOldPrice(e.target.value)}
                value={oldPrice}
              />
            </div>

            <div className='mb-4'>
              <h1 className='text-xl mb-2'>Offer Price</h1>
              <input className='w-full py-3 px-2 border'
                type='number'
                name='new_price'
                placeholder='Type Here'
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
              />
            </div>
          </div>
          <div className='mb-4 bg-slate-200'>
            <h1 className='text-xl mb-2'>Availibility</h1>
            <select name="availibility"  disabled  className='w-full border py-3 px-2'>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
        <hr className='bg-gray-300 h-full w-[1px]' />
        <div>
          <div className='mb-4'>
            <h1 className='text-xl mb-2'>Sizes</h1>
            <div className='flex gap-3'>
              <div onClick={() => setSize(prev => prev.includes("S") ? prev.filter(item => item !== 'S') : [...prev, "S"])}>
                <p className={` ${size.includes("S") ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
              </div>
              <div onClick={() => setSize(prev => prev.includes("M") ? prev.filter(item => item !== 'M') : [...prev, "M"])}>

                <p className={` ${size.includes("M") ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
              </div>
              <div onClick={() => setSize(prev => prev.includes("L") ? prev.filter(item => item !== 'L') : [...prev, "L"])}>

                <p className={` ${size.includes("L") ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
              </div>
              <div onClick={() => setSize(prev => prev.includes("XL") ? prev.filter(item => item !== 'XL') : [...prev, "XL"])}>
                <p className={` ${size.includes("XL") ? 'bg-black text-white' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XL</p>
              </div>
              <div onClick={() => setSize(prev => prev.includes("XXL") ? prev.filter(item => item !== 'XXL') : [...prev, "XXL"])}>
                <p className={` ${size.includes("XXL") ? 'bg-black text-white' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XXL</p>
              </div>


            </div>

          </div>



          {/* Uplpoad Images */}

          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input type="file" id='image1' onChange={(e) => setImage1(e.target.files[0])} hidden />
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input type="file" id='image2' onChange={(e) => setImage2(e.target.files[0])} hidden />
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input type="file" id='image3' onChange={(e) => setImage3(e.target.files[0])} hidden />
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input type="file" id='image4' onChange={(e) => setImage4(e.target.files[0])} hidden />
            </label>

          </div>


          <div className='flex gap-5'>
            <div className='mb-4'>
              <h1 className='text-xl mb-2'>Product Category</h1>
              <select className='w-full border py-3 px-2'
                name='category'
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='women'>Women</option>
                <option value='men'>Men</option>
              </select>
            </div>
            <div className='mb-4'>
              <h1 className='text-xl mb-2'>Product Sub-Category</h1>
              <select
                className='w-full border py-3 px-2'
                name='sub_category'
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option value='automatic'>Automatic</option>
                <option value='quartz'>Quartz</option>
                <option value='chain'>Chain</option>
                <option value='strap'>Strap</option>
              </select>
            </div>
          </div>

          <div className='flex gap-5 items-center mb-5'>
            <input onChange={()=> setBestSeller(prev=> !prev)} checked={bestSeller} type="checkbox" id='bestseller' />
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
          </div>
          <button className='bg-black text-white py-2 px-5 mt-10 uppercase'>ADD Product</button>
        </div>
      </div>
    </form>
  );
}

export default AddProduct;
