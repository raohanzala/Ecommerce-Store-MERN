import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { assets } from '../../../frontend/src/assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { ShopContext } from '../contexts/ShopContext';

const AddProductModal = ({ token, isOpen, onClose, fetchList }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [category, setCategory] = useState('men');
  const [subCategory, setSubcategory] = useState('quartz');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [availability, setAvailability] = useState('in_stock');

  const { setIsLoading,isLoading, setPageTitle } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!oldPrice || isNaN(Number(oldPrice))) {
      toast.error("Please enter a valid Old Price");
      return;
    }
    if (!newPrice || isNaN(Number(newPrice))) {
      toast.error("Please enter a valid New Price");
      return;
    }
    if (!subCategory) {
      toast.error("Please select a Sub-Category");
      return;
    }
    if (!availability) {
      toast.error("Please select Availability");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("oldPrice", oldPrice);
      formData.append("newPrice", newPrice);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("availibility", availability === "in_stock");
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      console.log(response)

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setOldPrice("");
        setNewPrice("");
        setCategory("");
        setSubcategory("");
        setAvailability("in_stock");
        setBestSeller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        fetchList()
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPageTitle('Add Product');
    return () => setIsLoading(false);
  }, [setIsLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
        >
          &times;
        </button>

        <h2 className="text-2xl mb-6 text-center font-semibold">Add Product</h2>

        <form onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-1 text-sm lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <label className="block mb-4">
                <span className="text-base">Product Title</span>
                <input
                  type="text"
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="block mb-4">
                <span className="text-base">Product Description</span>
                <textarea
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring"
                  placeholder="Enter product description"
                  value={'Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.'}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-base">Price</span>
                  <input
                    type="number"
                    className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring"
                    placeholder="Regular price"
                    min="0"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-base">Offer Price</span>
                  <input
                    type="number"
                    className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring"
                    placeholder="Discounted price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </label>
              </div>

              <label className="block mt-4">
                <span className="text-base">Availability</span>
                <select
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </label>
            </div>

            {/* Right Column */}
            <div>
              <label className="block mb-4">
                <span className="text-base">Sizes</span>
                <div className="flex gap-2 mt-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <span
                      key={size}
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                        )
                      }
                      className={`px-3 py-1 text-sm cursor-pointer rounded ${
                        sizes.includes(size) ? 'bg-black text-white' : 'bg-gray-200'
                      }`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </label>

              <label className="block mb-4">
                <span className="text-base">Upload Images</span>
                <div className="flex gap-2 mt-2">
                  {[image1, image2, image3, image4].map((image, index) => (
                    <label key={index} className="cursor-pointer">
                      <img
                        src={!image ? assets.upload_area : URL.createObjectURL(image)}
                        alt=""
                        className="w-24 h-24 object-cover border rounded"
                      />
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])
                        }
                      />
                    </label>
                  ))}
                </div>
              </label>

              <label className="block mb-4">
                <span className="text-base">Category</span>
                <select
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-base">Sub Category</span>
                <select
                  className="w-full mt-1 text-sm p-2 border rounded focus:outline-none focus:ring"
                  value={subCategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value="automatic">Automatic</option>
                  <option value="quartz">Quartz</option>
                  <option value="chain">Chain</option>
                  <option value="strap">Strap</option>
                </select>
              </label>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={bestSeller}
                  onChange={(e) => setBestSeller(e.target.checked)}
                  name='bestseller'
                />
                <span className="text-base" id='bestseller'>Best Seller</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`text-lg px-6 py-2 rounded mt-6 w-full ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
              }`}
          >
            {isLoading ? "Adding..." : "Add Here"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
