import React, { createContext, useEffect, useState } from "react";
import IUser from "../interfaces/IUser";
import AuthService from "../Services/AuthService";

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
    AuthService.isAuthenticated().then(data => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    })
  }, []);

  return (
    <div>
      {!isLoaded ? 
        <h1>Loading</h1> : 
        <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
          {children}
        </AuthContext.Provider>
      }
    </div>
  )
};

export { AuthContext, AuthProvider };
