import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const accessToken = sessionStorage.getItem("access_token");
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(accessToken));

  useEffect(() => {
    if(accessToken){
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("Pendings");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider 
    value={{ 
      isAuthenticated,
      setIsAuthenticated,
      logout
      }}>
      {children}
    </AuthContext.Provider>
  )
  }

  const useAuthContext = () => useContext(AuthContext);

  export { 
    AuthContextProvider,
    useAuthContext, 
    AuthContext 
  };