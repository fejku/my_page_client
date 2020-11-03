import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AuthService from "../services/AuthService";
// import Message from "./Message";

interface Props extends RouteComponentProps {
  
};

const Login: React.FC<Props> = ({ history }) => {
  const [user, setUser] = useState({username: "", password: ""})
  const [message, setMessage] = useState<any>(null);

  const authContext = useContext(AuthContext);

  const onSubmit = (e: any) => {
    e.preventDefault();
    AuthService.login(user)
      .then(data => {
        const { isAuthenticated, user, message } = data;
        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          history.push("/todos");
        } else {
          setMessage(message);
        }
      })
  }

  const onChange = (e: any) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username" className="sr-only">Username: </label>
        <input type="text" name="username" onChange={onChange} className="form-control" placeholder="Enter username" />

        <label htmlFor="username" className="sr-only">Password: </label>
        <input type="text" name="password" onChange={onChange} className="form-control" placeholder="Enter password" />
        
        <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
        {/* {message && <Message message={message}/>} */}
      </form>    
    </div>
  );
};

export default Login;
