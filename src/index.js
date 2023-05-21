import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './styles/index.css';
import './styles/Typography.css';
import App from './App';
import Login from './Login';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from "react-toastify";
import { login } from './redux/authSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogin = (username, password) => {
    dispatch(login({ username, password }));
  };

  return (
    <>
      {isLoggedIn ? <App /> : <Login handleLogin={handleLogin} />}
      <ToastContainer />
    </>
  );
};

root.render(<Provider store={store}><Main /></Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
