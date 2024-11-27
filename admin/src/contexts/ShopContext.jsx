import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext()


const ShopContextProvider = ({ children }) => {
  

  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pageTitle, setPageTitle] = useState('')
  


  // Fetching all products from databse
  

  

  const value = { isLoading, setIsLoading, token, setToken, pageTitle, setPageTitle }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider

