import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'

const Drawer = ({ title, selectedItem, closeDrawer, isAnimating }) => {

  const {formatTimestamp} = useContext(ShopContext)


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-20"
      onClick={closeDrawer}
    >
      <div
        className={`bg-white w-2/5 p-6 shadow-lg transform transition-transform duration-300 ${isAnimating ? 'translate-x-0' : 'translate-x-full'
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
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <>
          <p className="mb-5 text-gray-600 text-sm">Date: {formatTimestamp(selectedItem?.date)}</p>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <tbody>
                <tr className="bg-[#f2f2f2af]">
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">Product ID</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{selectedItem._id}</td>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">Name</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{selectedItem.name}</td>
                </tr>
                <tr className="bg-[#f2f2f2af]">
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">Description</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{selectedItem.description}</td>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">New Price</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{selectedItem.newPrice}</td>
                </tr>
                <tr className="bg-[#f2f2f2af]">
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">Old Price</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{selectedItem.oldPrice}</td>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">Availability</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {selectedItem.availibility ? "In Stock" : "Out of Stock"}
                  </td>
                </tr>
                <tr className="bg-[#f2f2f2af]">
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">Category</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{selectedItem.category}</td>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm text-nowrap">Sub-Category</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{selectedItem.subCategory}</td>
                </tr>
                <tr className="bg-[#f2f2f2af]">
                  <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">Bestseller</th>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {selectedItem.bestSeller ? "Bestseller" : "No"}
                  </td>
                </tr>
                {selectedItem.sizes.length > 0 && (
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">Size</th>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{selectedItem.sizes.join(", ")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </>
      </div>
    </div>
  )
}

export default Drawer