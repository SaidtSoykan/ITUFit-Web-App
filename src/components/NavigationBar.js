import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Stil dosyasını ekleyin

function NavigationBar() {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can clear user authentication state or token
    console.log("Logout clicked");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-list">
          <li className="navbar-item"><Link to="/" className="navbar-link">Anasayfa</Link></li>
          <li className="navbar-item"><Link to="/restricted-user" className="navbar-link">Restricted User</Link></li>
        </ul>
        <ul className="navbar-list navbar-right">
          <li className="navbar-item"><button onClick={handleLogout} className="navbar-link">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
