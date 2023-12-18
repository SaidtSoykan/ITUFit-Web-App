// src/components/UserCard.js

import React, { useState } from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  const [isRestricted, setIsRestricted] = useState(user.restricted);

  const handleButtonClick = () => {
    // Eğer allow butonuna basılırsa restricted değerini tersine çevir
    setIsRestricted(!isRestricted);
  };
  return (
    <div className="user-card">
      <p className="user-id">ID: {user.id}</p>
      <p className="user-info">Name: {user.name}</p>
      <p className="user-restrict">Restrict: {isRestricted.toString()}</p>
      <button onClick={handleButtonClick}>
        {isRestricted ? 'Allow' : 'Restrict'}
      </button>
    </div>
  );
};

export default UserCard;
