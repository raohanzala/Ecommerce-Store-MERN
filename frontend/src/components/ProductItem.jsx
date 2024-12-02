import React, { useContext, memo, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = memo(({ id, description, size, image, name, newPrice, oldPrice }) => {
  const { currency } = useContext(ShopContext);

  // UseMemo to precompute offer percentage
  const offer = useMemo(() => Math.floor(((oldPrice - newPrice) / oldPrice) * 100), [oldPrice, newPrice]);

  // Precompute truncated text
  const shortDescription = useMemo(
    () => (description.length > 60 ? description.slice(0, 60) + '...' : description),
    [description]
  );
  const productName = useMemo(
    () => (name.length > 20 ? name.slice(0, 23) + '...' : name),
    [name]
  );

  return (
    <Link to={`/product/${id}`}>
      <div className="flex relative w-full h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all duration-500 hover:shadow-md rounded">
        {/* Offer Label */}
        {offer > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white w-10 h-10 text-xs font-bold z-10 rounded-full">
            -{offer}%
          </div>
        )}

        {/* Image Section */}
        <div className="relative aspect-w-1 aspect-h-1 w-full">
          {/* Default Image */}
          <LazyLoadImage
            src={image[0]}
            effect="blur"
            className="w-full h-full object-cover transition-opacity rounded-md duration-500 ease-in-out hover:opacity-0"
            alt={name}
          />
          {/* Hover Image */}
          <LazyLoadImage
            src={image[1]}
            effect="blur"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100 hover:scale-105"
            alt={name}
          />
        </div>

        {/* Product Details */}
        <div className="text-center py-3 px-2">
          <p className="text-sm tracking-wide font-semibold uppercase mb-1 text-gray-800">{productName}</p>
          <p className="text-xs text-gray-500">{shortDescription}</p>
          <div className="flex gap-2 justify-center items-center mt-2">
            {oldPrice && (
              <p className="text-sm text-gray-400 line-through">
                {currency} {oldPrice}
              </p>
            )}
            <p className="text-lg font-semibold text-yellow-500">
              {currency} {newPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ProductItem;
