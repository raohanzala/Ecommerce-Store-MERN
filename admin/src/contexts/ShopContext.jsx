import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext()


const ShopContextProvider = ({ children }) => {
  

  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pageTitle, setPageTitle] = useState('')
  

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp); // Convert the timestamp to a Date object

    const options = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit', 
      hour12: true, 
    };
    return date.toLocaleString('en-US', options);
  }

  function timestampToShortDate(timestamp) {
    const date = new Date(timestamp);  // Convert the timestamp to a Date object
    const options = { 
      year: 'numeric',
      month: 'short',  // Shortened month (e.g., "Nov")
      day: 'numeric'
    };
    
    return date.toLocaleDateString('en-US', options);  // Convert to short date format
  }

  // Fetching all products from databse
  

  

  const value = { isLoading, setIsLoading, token, setToken, pageTitle, setPageTitle, formatTimestamp, timestampToShortDate }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider

