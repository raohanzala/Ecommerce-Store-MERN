// import React, { useState } from 'react'
// import upload_area from '../assets/Assets/Admin_Assets/upload_area.svg';
// import { toast } from 'react-toastify';

// const AddProduct = () => {

//   const [image, setImage] = useState(false)
//   const [selectedSizes, setSelectedSizes] = useState([]);


//   const [productDetails, setProductDetails] = useState({
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
//             <input value={productDetails.name} onChange={changeHandler} className='w-full py-3 px-2 border' type="text" name='name' placeholder='Type Here' />
//           </div>
//           <div className='mb-4'>
//             <h1 className='text-xl mb-2'>Product Description</h1>
//             <textarea value={productDetails.description} onChange={changeHandler} className='w-full py-3 px-2 border' name='description' placeholder='Type here'></textarea>
//           </div>

//           <div className='flex gap-5'>
//             <div className='mb-4'>
//               <h1 className='text-xl mb-2'>Price</h1>
//               <input value={productDetails.old_price} onChange={changeHandler} className='w-full py-3 px-2 border' type="number" name='old_price' placeholder='Type Here' />
//             </div>

//             <div className='mb-4'>
//               <h1 className='text-xl mb-2'>Offer Price</h1>
//               <input value={productDetails.new_price} onChange={changeHandler} className='w-full py-3 px-2 border' type="number" name='new_price' placeholder='Type Here' />
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
//                     onChange={(e) => handleSizeChange(e.target.value)}
//                   />
//                   {size}
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div className='flex gap-5'>

//             <div className='mb-4'>
//               <h1 className='text-xl mb-2'>Product Category</h1>
//               <select value={productDetails.category} onChange={changeHandler} className='w-full border py-3 px-2' name="category" id="">
//                 <option value="women">Women</option>
//                 <option value="men">Men</option>
//                 <option value="kids">Kids</option>
//               </select>
//             </div>
//             <div className='mb-4'>
//               <h1 className='text-xl mb-2'>Product Sub-Category</h1>
//               <select value={productDetails.sub_category} onChange={changeHandler} className='w-full border py-3 px-2' name="sub_category" id="">
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
//           <input onChange={imageHandler} type="file" hidden name='image'  />
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
//               onChange={imageHandler}
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

const AddProduct = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubcategory] = useState('')
  const [bestSeller, setBestSeller] = useState(false)
  const [size, setSize] = useState([])


  console.log(productDetails)

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (size) => {
    setProductDetails((prevDetails) => {
      const sizes = prevDetails.sizes.includes(size)
        ? prevDetails.sizes.filter((s) => s !== size)
        : [...prevDetails.sizes, size];
      return { ...prevDetails, sizes };
    });
  };

  const Add_Product = async () => {
    let responseData;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      const product = { ...productDetails, image: responseData.image_url };

      await fetch('http://localhost:3000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? toast.success('Product Added')  : toast.error('Failed');
        });
    }
  };

  return (
    <div>
      <div className='flex gap-5 justify-around bg-white p-10 w-full' style={{ boxShadow: '0px 0 10px rgba(1, 41, 112, 0.1)' }}>
        <div>
          <div className='mb-4'>
            <h1 className='text-xl mb-2'>Product Title</h1>
            <input
              value={productDetails.name}
              onChange={()=> set}
              className='w-full py-3 px-2 border'
              type='text'
              name='name'
              placeholder='Type Here'
            />
          </div>
          <div className='mb-4'>
            <h1 className='text-xl mb-2'>Product Description</h1>
            <textarea
              value={productDetails.description}
              onChange={()=> set}
              className='w-full py-3 px-2 border'
              name='description'
              placeholder='Type here'
            ></textarea>
          </div>

          <div className='flex gap-5'>
            <div className='mb-4'>
              <h1 className='text-xl mb-2'>Price</h1>
              <input
                value={productDetails.old_price}
                onChange={()=> set}
                className='w-full py-3 px-2 border'
                type='number'
                name='old_price'
                placeholder='Type Here'
              />
            </div>

            <div className='mb-4'>
              <h1 className='text-xl mb-2'>Offer Price</h1>
              <input
                value={productDetails.new_price}
                onChange={()=> set}
                className='w-full py-3 px-2 border'
                type='number'
                name='new_price'
                placeholder='Type Here'
              />
            </div>
          </div>
          <div className='mb-4'>
            <h1 className='text-xl mb-2'>Availibility</h1>
            <select name="availibility" value={productDetails.availibility}
              onChange={()=> set} className='w-full border py-3 px-2'>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
        <hr className='bg-gray-300 h-full w-[1px]' />
        <div>
          <div className='mb-4'>
            <h1 className='text-xl mb-2'>Sizes</h1>
            <div className='flex flex-wrap gap-2'>
              {['S', 'M', 'L', 'XL'].map((size) => (
                <label key={size} className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    value={size}
                    checked={productDetails.sizes.includes(size)}
                    onChange={() => ()=> setizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
          <div className='flex gap-5'>
            <div className='mb-4'>
              <h1 className='text-xl mb-2'>Product Category</h1>
              <select
                value={productDetails.category}
                onChange={()=> set}
                className='w-full border py-3 px-2'
                name='category'
              >
                <option value='women'>Women</option>
                <option value='men'>Men</option>
              </select>
            </div>
            <div className='mb-4'>
              <h1 className='text-xl mb-2'>Product Sub-Category</h1>
              <select
                value={productDetails.sub_category}
                onChange={()=> set}
                className='w-full border py-3 px-2'
                name='sub_category'
              >
                <option value='automatic'>Automatic</option>
                <option value='quartz'>Quartz</option>
                <option value='chain'>Chain</option>
                <option value='strap'>Strap</option>
              </select>
            </div>
          </div>

              <div className='flex gap-5 items-center mb-5'>
                <input type="checkbox" id='bestseller' />
              <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
              </div>

          <div className='cursor-pointer justify-start w-fit' onClick={() => document.getElementById('file-input').click()}>
            <label htmlFor="image">

            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt='Upload Area'
              className='w-32 h-32 object-cover border-2 border-dashed border-gray-300 p-2'
              />
              </label>
          </div>
          <input
            id='file-input'
            onChange={imageHandler()=> set
            type='file'
            hidden
            name='image'
          />
          <button className='bg-black text-white py-2 px-5 mt-10 uppercase' onClick={Add_Product}>ADD Product</button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
