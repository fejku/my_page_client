import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import AuthService from "../services/AuthService";
import Message from "./Message";
// import Message from "./Message";

interface Props extends RouteComponentProps {}

const Register: React.FC<Props> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  let timerID = useRef<any>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID.current);
    };
  }, []);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRole("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerResult = await AuthService.register({
      username,
      password,
      role,
    });

    setMessage(registerResult.message);
    resetForm();

    if (registerResult.success) {
      timerID.current = setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  };

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please register</h3>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChangeUsername}
          placeholder="Enter username"
        />

        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Enter password"
        />

        <label htmlFor="role">Role: </label>
        <input
          type="text"
          name="role"
          value={role}
          onChange={onChangeRole}
          placeholder="Enter role"
        />

        <button type="submit">Register</button>
        {message && <Message message={message} />}
      </form>
    </div>
  );
};

export default Register;
