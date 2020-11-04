import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AuthService from "../services/AuthService";
import Message from "./Message";

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const authContext = useContext(AuthContext);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginResponse = await AuthService.login({ username, password });

    const { isAuthenticated, user } = loginResponse;
    if (isAuthenticated) {
      authContext.setUser(user!);
      authContext.setIsAuthenticated(isAuthenticated);
      history.push("/todos");
    } else {
      setMessage("Błąd logowania.");
    }
  };

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please sign in</h3>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChangeUsername}
          placeholder="Enter username"
        />

        <label htmlFor="username">Password: </label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Enter password"
        />

        <button type="submit">Log in</button>
        {message && <Message message={message} />}
      </form>
    </div>
  );
};

export default Login;
