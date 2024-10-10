import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Collection = () => {
  const { products = [], search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const { value } = e.target;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const { value } = e.target;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.sub_Category));
    }

    sortProduct(productsCopy);
  };

  const sortProduct = (productsToSort) => {
    let sortedProducts = [...productsToSort];
    
    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.new_price - b.new_price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.new_price - a.new_price);
        break;
      default:
        break;
    }

    setFilterProducts(sortedProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    // Sort only if filterProducts has been set
    if (filterProducts.length > 0) {
      sortProduct(filterProducts);
    }
  }, [sortType]);

  if(!filterProducts){
    return <LoadingSpinner/>
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t max-w-[1280px] mx-auto'>
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(prev => !prev)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="Dropdown Icon" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Men' onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Women' onChange={toggleCategory} /> Women
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Chain' onChange={toggleSubCategory} /> Chain Watches
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Strap' onChange={toggleSubCategory} /> Strap Watches
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Automatic' onChange={toggleSubCategory} /> Automatic Watches
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Quartz' onChange={toggleSubCategory} /> Quartz Watches
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id} 
                name={item.name}
                description={item.description}
                new_price={item.new_price}
                old_price={item.old_price}
                id={item._id}
                image={item.image}
                size={item.sizes}
              />
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
