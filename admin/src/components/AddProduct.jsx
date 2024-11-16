import { useState } from 'react';
import toast from 'react-hot-toast';
import { assets } from '../../../frontend/src/assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';

const AddProduct = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubcategory] = useState('');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [availability, setAvailability] = useState('');


  console.log(name, description, oldPrice, newPrice, category, subCategory, bestSeller, sizes, availability)
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("oldPrice", oldPrice);
      formData.append("newPrice", newPrice);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller ? "true" : "false");
      formData.append("availability", availability);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // console.log(formData);
      
      

      const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form state
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setOldPrice('');
        setNewPrice('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-screen-lg bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <label className="block mb-6">
            <span className="text-lg">Product Title</span>
            <input type="text" className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-green-200" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="block mb-6">
            <span className="text-lg">Product Description</span>
            <textarea className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-green-200" placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </label>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <label>
              <span className="text-lg">Price</span>
              <input type="number" className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-green-200" placeholder="Regular price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
            </label>
            <label>
              <span className="text-lg">Offer Price</span>
              <input type="number" className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-green-200" placeholder="Discounted price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            </label>
          </div>

          <label className="block mb-6">
            <span className="text-lg">Availability</span>
            <select className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-green-200" value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </label>
        </div>

        {/* Right Column */}
        <div>
          <label className="block mb-6">
            <span className="text-lg">Sizes</span>
            <div className="flex gap-3 mt-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <span
                  key={size}
                  onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                  className={`px-3 py-1 cursor-pointer rounded ${sizes.includes(size) ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  {size}
                </span>
              ))}
            </div>
          </label>

<div className='mb-6'>
<span className="text-lg">Upload Images</span>
          <div className="flex gap-2 mb-6 mt-2">
            
            {[image1, image2, image3, image4].map((image, idx) => (
              <label key={idx} className="cursor-pointer">
                <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className="w-24 h-24 object-cover border rounded" />
                <input type="file" hidden onChange={(e) => [setImage1, setImage2, setImage3, setImage4][idx](e.target.files[0])} />
              </label>
            ))}
          </div>
            </div>

          <label className="block mb-6">
            <span className="text-lg">Category</span>
            <select className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-green-200" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="women">Women</option>
              <option value="men">Men</option>
            </select>
          </label>

          <label className="block mb-6">
            <span className="text-lg">Sub-Category</span>
            <select className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-green-200" value={subCategory} onChange={(e) => setSubcategory(e.target.value)}>
              <option value="automatic">Automatic</option>
              <option value="quartz">Quartz</option>
              <option value="chain">Chain</option>
              <option value="strap">Strap</option>
            </select>
          </label>

          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-200" checked={bestSeller} onChange={() => setBestSeller(!bestSeller)} />
            <span className="text-lg">Add to Bestseller</span>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full mt-8 py-3 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800 transition">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
