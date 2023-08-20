import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("rn-user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedInUser(parsedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
