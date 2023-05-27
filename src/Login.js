import React, { useState } from 'react';
import "./styles/Login.css";

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
      <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        {error && <div className="error">{error}</div>}
        <br/>
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
  );
};

export default Login;