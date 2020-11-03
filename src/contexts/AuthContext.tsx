import React, { createContext, useEffect, useState } from "react";
import IUser from "../interfaces/IUser";
import AuthService from "../services/AuthService";

interface IAuth {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext({} as IAuth);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getContextData();
  }, []);

  const getContextData = async () => {
    try {
      const data = await AuthService.isAuthenticated();  
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      {!isLoaded ? 
        <h1>Loading</h1> : 
        <AuthContext.Provider value={{
          user, 
          setUser, 
          isAuthenticated, 
          setIsAuthenticated
        }}>
          {children}
        </AuthContext.Provider>
      }
    </div>
  )
};

export { AuthContext, AuthProvider };
