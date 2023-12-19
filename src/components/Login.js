// src/components/Login.js
import React, { useState } from 'react';
import  './Login.css'; 

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Burada gerçek bir kimlik doğrulama yapılmalıdır.
    // Örnek olarak, hardcoded bir kullanıcı adı ve şifre kontrolü yapalım.
    if (username === 'admin' && password === 'admin123') {
      onLogin(); // Giriş başarılıysa onLogin callback'ini çağır
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
