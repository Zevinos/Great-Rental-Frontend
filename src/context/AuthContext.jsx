import { createContext, useState, useEffect } from "react";
import myApi from "../api/myApi";

export const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await myApi.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsLoggedIn(true);
      setIsLoading(false);
      // console.log(response)
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      // console.log(error)
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticateUser, handleLogout, isLoggedIn, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;
