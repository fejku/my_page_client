import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AuthService from "../services/AuthService";
// import Message from "./Message";

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = ({ history }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  // const [message, setMessage] = useState<any>(null);

  const authContext = useContext(AuthContext);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const data = await AuthService.login(user);

    // const { isAuthenticated, user, message } = data;
    // if (isAuthenticated) {
    //   authContext.setUser(user);
    //   authContext.setIsAuthenticated(isAuthenticated);
    //   history.push("/todos");
    // } else {
    //   // setMessage(message);
    // }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          onChange={onChange}
          placeholder="Enter username"
        />

        <label htmlFor="username">Password: </label>
        <input
          type="text"
          name="password"
          onChange={onChange}
          placeholder="Enter password"
        />

        <button type="submit">Log in</button>
        {/* {message && <Message message={message}/>} */}
      </form>
    </div>
  );
};

export default Login;
