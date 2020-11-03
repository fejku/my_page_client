import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import AuthService from "../services/AuthService";
// import Message from "./Message";

interface Props extends RouteComponentProps {
  
};

const Register: React.FC<Props> = ({ history }) => {
  const [user, setUser] = useState({username: "", password: "", role: ""})
  const [message, setMessage] = useState<any>(null);

  let timerID = useRef<any>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID.current);
    }
  }, [])

  const resetForm = () => {
    setUser({username: "", password: "", role: ""})
  }
  

  const onSubmit = (e: any) => {
    e.preventDefault();
    AuthService.register(user)
      .then(data => {
        const {message} = data;
        setMessage(message);
        resetForm();
        if (!message.msgError) {
          timerID.current = setTimeout(() => {
            history.push("/login");
          }, 2000);
        }
      })
  }

  const onChange = (e: any) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please register</h3>
        <label htmlFor="username" className="sr-only">Username: </label>
        <input 
          type="text" 
          name="username" 
          value={user.username}
          onChange={onChange} 
          className="form-control" 
          placeholder="Enter username" 
        />

        <label htmlFor="password" className="sr-only">Password: </label>
        <input 
          type="text" 
          name="password" 
          value={user.password} 
          onChange={onChange} 
          className="form-control" 
          placeholder="Enter password" 
        />
        
        <label htmlFor="role" className="sr-only">Role: </label>
        <input 
          type="text" 
          name="role" 
          value={user.role}
          onChange={onChange} 
          className="form-control" 
          placeholder="Enter role"
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        {/* {message && <Message message={message}/>} */}
      </form>    
    </div>
  );
};

export default Register;
