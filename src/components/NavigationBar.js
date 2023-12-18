import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Stil dosyasını ekleyin

function NavigationBar() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/" className="navbar-link">Anasayfa</Link></li>
            <li className="navbar-item"><Link to="/restricted-user" className="navbar-link">Restricted User</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
  
export default NavigationBar;
