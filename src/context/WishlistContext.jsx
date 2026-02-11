import React, { createContext, useContext, useState, useEffect } from "react";
import Api from "../api/Api"; // Your custom Axios instance
import { API_ENDPOINTS } from "../api/apiConfig"; // Your endpoint list

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const email = localStorage.getItem("email");

  const fetchCount = async () => {
    const currentEmail = localStorage.getItem("email");
    if (!currentEmail) {
      setWishlistCount(0);
      return;
    }
    try {
      // Using your API_ENDPOINTS.WISHLIST_COUNT instead of hardcoding strings
      const res = await Api.get(API_ENDPOINTS.WISHLIST_COUNT, {
        params: { email: currentEmail },
      });
      setWishlistCount(res.data);
    } catch (err) {
      console.error("Error fetching wishlist count:", err);
    }
  };

  
  useEffect(() => {
    fetchCount();
  }, [email]);

  return (
    <WishlistContext.Provider value={{ wishlistCount, setWishlistCount, fetchCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
