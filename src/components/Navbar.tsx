import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AuthService from "../services/AuthService";

interface Props {
  
};

const Navbar: React.FC<Props> = (props) => {
  const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(AuthContext);

  const onClickLogout = async () => {
    try {
      const data = await AuthService.logout();  

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }      
    } catch (error) {
      
    }
  }
  
  const unauthenticatedNavbar = () => {
    return (
      <>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>                
      </>
    )
  }

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/todos">
          <li>Todos</li>
        </Link>
        { (user.role === "admin") &&        
          <Link to="/admin">
            <li>Admin</li>
          </Link>   
        }
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>             
      </>
    )    
  }

  return (
    <nav>
      <Link to="/">
        <div>Krystian</div>
      </Link>
      <div>
        <ul>
          {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
