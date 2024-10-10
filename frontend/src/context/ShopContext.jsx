import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()


const ShopContextProvider = ({ children }) => {

  const currency = 'Rs'
  const delivery_fee = 250
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const [category, setCategory] = useState(['Automatic', 'Casual', 'Formal', 'Luxury'])
  const navigate = useNavigate()


  // Fetching all products from databse
  useEffect(() => {
    fetch('http://localhost:3000/allproducts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to Fetch products')
        }

        return response.json()

      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.log('Error fetching products : ', error)
        toast.error('Unable to fetch products')
      })
  }, [])

  console.log(products)


  const addToCart = async (itemId, size, quantity = 1) => {

    let cartData = structuredClone(cartItems);

    console.log('cartItems', cartItems)
    console.log('cartData', cartData)

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += quantity;
      } else {
        cartData[itemId][size] = quantity;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
    toast.success('Product added to cart')
  };


  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) => {
      return total + Object.values(sizes).reduce((count, qty) => count + qty, 0);
    }, 0);
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    } else {
      console.error(`Item ${itemId} with size ${size} does not exist in the cart`);
    }

  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items)
      if (!itemInfo) {
        console.error(`Product with id ${items} not found`);
        continue;
      }
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.new_price * cartItems[items][item]
          }
        } catch (error) {
          console.error(`Error calculating cart amount for item ${item}`, error);
        }
      }
    }
    return totalAmount
  }

  const value = { products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, category, setCategory, getCartAmount, navigate }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider

