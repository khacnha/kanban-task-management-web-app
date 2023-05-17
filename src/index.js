import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/index.css';
import './styles/Typography.css';
import App from './App';
import Login from './Login';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import { auth } from './core/api';
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogin = (username, password) => {
    auth.login(username, password)
      .then((response) => {
        console.log("login", response);
        localStorage.setItem('token', response.token);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("login err", error);
        setError("Unable to log in with provided credentials!");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <>
      <Provider store={store}>
        <App />
        <ToastContainer/>
      </Provider>
    </>
  ) : (
    <Login handleLogin={handleLogin} error={error} />
  );
};

root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
