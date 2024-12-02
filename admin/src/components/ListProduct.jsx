import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../../../frontend/src/assets/assets'
import { backendUrl } from '../App'
import toast from 'react-hot-toast';
import { ShopContext } from '../contexts/ShopContext';
import SearchSortBar from './SearchSortBar';
import { IoMdMore } from 'react-icons/io';
import { IoMdTrash } from "react-icons/io";
import { BiPencil } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import Pagination from './Pagination';
import Drawer from './Drawer';
import ConfirmationModal from './ConfirmationModal';
import AddProductModal from './AddProductModal';
import { FaPlus } from "react-icons/fa6";




const ListProduct = ({ token }) => {

  const [allproducts, setAllProducts] = useState([])

  // const [orders, setOrders] = useState([]); // State to hold orders
  const [selectedItem, setSelectedItem] = useState(null); // Selected order for the drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer visibility
  const [isAnimating, setIsAnimating] = useState(false); // Animation for the drawer
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of products per page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allproducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const columns = ["S.No", "Images", "Name", "Price", "Availability", "Category", "Action"];




  const handleDropdownToggle = (productId) => {
    setActiveDropdown((prev) => (prev === productId ? null : productId));
  };

  const { isLoading, setIsLoading, setPageTitle } = useContext(ShopContext)
  console.log(allproducts)

  const fetchList = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token }
      })
      console.log(response)
      if (response.data.success) {
        setAllProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }

  }

  console.log(selectedItem)


  const removeProduct = async (id) => {
    setIsLoading(true)
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId); // Set the product ID for deletion
    setIsModalVisible(true); // Show the confirmation modal
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await removeProduct(productToDelete);
      setProductToDelete(null); // Clear the stored product ID
      setIsModalVisible(false); // Close the modal
    }
  };

  const handleCancel = () => {
    setProductToDelete(null); // Clear the stored product ID
    setIsModalVisible(false); // Close the modal
  };

  const handleProductClick = (order) => {
    setSelectedItem(order);
    setIsDrawerOpen(true);
    setActiveDropdown(false)
    setTimeout(() => setIsAnimating(true), 10);
  };

  // Close drawer
  const closeDrawer = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setSelectedItem(null);
    }, 300);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp); // Convert the timestamp to a Date object

    const options = {
      weekday: 'long', // Full weekday name (e.g., Monday)
      year: 'numeric', // Full year (e.g., 2024)
      month: 'long', // Full month name (e.g., November)
      day: 'numeric', // Day of the month (e.g., 17)
      hour: '2-digit', // 2-digit hour
      minute: '2-digit', // 2-digit minute
      second: '2-digit', // 2-digit second
      hour12: true, // Display in 12-hour format with AM/PM
    };

    return date.toLocaleString('en-US', options);
  }

  useEffect(()=> {
    // setAllProducts([{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" },{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" },{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" },{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" },{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" },{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" },{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" },{ userId: 1893218, items: [{price : 3400, name : 'Rolex Yatch Master'}], paymentMethod : 'COD', amount: 12000, status: "Pending", address : 'Saddar Karachi', date: "2024-10-01" }])
    // setPageTitle("List Products")
      // return () => setIsLoading(false);
  },[setPageTitle])

  useEffect(() => {
    fetchList()
    setPageTitle("All Products")
    return () => setIsLoading(false);
  }, [setIsLoading])


  return (
    <div>

      <div className='flex gap-5 mb-6'>

        <SearchSortBar placeholder="Search product" options={['recent', 'date']} />
        <button onClick={() => setModalOpen(true)} className='px-4 border-0 bg-primary text-nowrap rounded-md text-white flex items-center justify-center gap-2 text-sm font-medium'><FaPlus />
          Add Product</button>
      </div>
      <div className="mt-1">
        <table className="min-w-full bg-white rounded-md ">
          <thead>
            <tr className="bg-[#f2f2f2af] text-[#5c5c5c] text-sm">
              {columns.map((col) => (
                <th key={col} className={`py-3 px-4 border ${col === "S.No" && 'max-w-7'}`}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-b text-center text-sm"

                >
                  <td className="border  py-2 px-4 border-r">{index + 1}</td>
                  <td className="border  py-2 px-4">
                    <img src={product.image[0]} className='w-12 h-12 m-auto' alt="" />
                  </td>
                  <td className="border  py-2 px-4 text-left">{product.name || 'Rolex Watch'}</td>
                  <td className="border py-2 px-4 ">{product.newPrice || '3,999'}</td>
                  <td className="border py-2 px-4  text-left">{product.availibility ? 'In Stock' : 'Out of stock'}</td>
                  <td className="border py-2 px-4 capitalize">{product.category || "Men's"}</td>
                  <td className="border py-2 px-4 text-xl relative cursor-pointer">
                    <button
                      aria-label={`Open actions for product ${product.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(product._id);
                        setSelectedItem(product)
                      }}
                    >
                      <IoMdMore className="m-auto" />
                    </button>
                    {activeDropdown === product._id && (
                      <div
                        className="absolute text-sm right-4 top-10 bg-white shadow-lg z-20 border rounded-sm p-1 w-36"
                        onClick={(e) => e.stopPropagation()} // Prevent modal click closing
                      >
                        <ul className="text-left ">
                          <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                            <BiPencil className='text-lg' />
                            Edit
                          </li>
                          <li className="px-2 py-2 hover:bg-gray-100 text-[red] cursor-pointer flex items-center gap-2" onClick={() => handleDeleteClick(product._id)}>
                            <IoMdTrash className='text-lg' />
                            Delete
                          </li>
                          <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={() => handleProductClick(product)}>
                            <MdRemoveRedEye className='text-lg' />
                            View Details
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 text-center text-gray-500 font-semibold"
                >
                  No Products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allproducts.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>

      <ConfirmationModal show={isModalVisible} title={'Delete Product'} message={'Are you sure you want to delete this product?'} confirmText={'Delete'} cancelText={'Cancel'} onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        onClose={() => setIsModalVisible(false)} />

      {isDrawerOpen && <Drawer title={'Product Details'} selectedItem={selectedItem} closeDrawer={closeDrawer} isAnimating={isAnimating} />}



      {/* Drawer for Order Details */}
      {/* {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-20"
          onClick={closeDrawer}
        >
          <div
            className={`bg-white w-96 p-6 shadow-lg transform transition-transform duration-300 ${isAnimating ? 'translate-x-0' : 'translate-x-full'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDrawer}
              aria-label="Close drawer"
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <>
              <p className="mb-5 text-gray-600 text-sm">Date: {formatTimestamp(selectedItem.date)}</p>
              <div className="flex items-start gap-5">
                <div className="space-y-2 text-gray-600 text-sm">
                  <p>Product ID:</p>
                  <p>Name:</p>
                  <p>Description:</p>
                  <p>New Price:</p>
                  <p>Old Price:</p>
                  <p>Availibility:</p>
                  <p>Category:</p>
                  <p>Sub-Category:</p>
                  <p>Bestseller:</p>
                  {selectedItem.sizes.length > 0 && <p>Size</p>}
                </div>
                <div className="space-y-2 text-sm">
                  <p>{selectedItem._id}</p>
                  <p>{selectedItem.name}</p>
                  <p>{selectedItem.description}</p>
                  <p>{selectedItem.newPrice}</p>
                  <p>{selectedItem.oldPrice}</p>
                  <p>{selectedItem.availibility ? 'In Stock' : 'Out of Stock'}</p>
                  <p>{selectedItem.category}</p>
                  <p>{selectedItem.subCategory}</p>
                  <p>{selectedItem.bestSeller && 'Bestseller'}</p>

                </div>
              </div>
            </>
          </div>
        </div>
      )} */}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        token={token}
        fetchList={fetchList}
      />
    </div>
  )
}

export default ListProduct