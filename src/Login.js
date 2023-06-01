import React, { useState } from 'react';
import "./styles/Login.css";
import logo from "./assets/logo.jpg";
import laptop from "./assets/laptop.jpg";

const Login = ({ handleLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="bg-login">
      <div className="container">
        <div className="logo">
          <img height={100} className="logo" src={logo} alt="logo" />
        </div>
        <div className="body">
          <img className="laptop" src={laptop} alt="laptop" />

          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <h3>Welcome back!</h3>
              {error && <div className="error">{error}</div>}
              <br />
              <div>
                <label>Username:</label>
                <input type="text" placeholder="Your username" value={username} onChange={handleUsernameChange} />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" placeholder="Your password" value={password} onChange={handlePasswordChange} />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;