import { createContext, useContext, useState, useEffect } from "react";

export const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("chat-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Check token expiration when the app loads
  useEffect(() => {
    const checkTokenValidity = () => {
      if (authUser?.token) {
        const payload = JSON.parse(atob(authUser.token.split(".")[1])); // Decode JWT payload
        const isTokenExpired = payload.exp * 1000 < Date.now(); // Check if token is expired
        if (isTokenExpired) {
          localStorage.removeItem("chat-user");
          setAuthUser(null);
        }
      }
    };

    checkTokenValidity();
  }, [authUser]);

  return (
    <authContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </authContext.Provider>
  );
};
