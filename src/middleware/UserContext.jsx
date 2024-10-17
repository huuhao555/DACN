// src/middleware/UserContext.js
import React, { createContext, useState } from "react";
import { memo } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (dataUser) => {
    setUser(dataUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default memo(UserProvider);
