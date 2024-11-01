import React, { createContext, useState, useEffect } from "react";
import { memo } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [countCart, setCountCart] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);
  const updateCartCount = (newCount) => {
    setCountCart(newCount);
  };
  const updateUser = (dataUser) => {
    setUser(dataUser);
    localStorage.setItem("user", JSON.stringify(dataUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, countCart, updateUser, logout, updateCartCount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default memo(UserProvider);
