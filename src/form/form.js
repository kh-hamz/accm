import React, { useState } from 'react';
import './form.css';
import logo from '../logo.jpg'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleLogin({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div id="header">
            <div id="logo">
                <img src={logo} alt='Meat Masters'></img>
            </div>
        </div>
        <div className='Input-fields'>
        <input
          type="text"
          value={username}
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm