// src/components/FacilityCard.js

import React, { useState } from 'react';

const FacilityCard = ({ facility, onCardClick }) => {
  const { name, type, capacity, available_spots } = facility;
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    onCardClick(name); // Seçili kartın adını iletmek için callback'i çağır
  };

  // Doluluk oranını hesapla
  const fillRatio = (capacity - available_spots) / capacity;

  // Renkleri belirle
  let fillColor;
  if (fillRatio > 0.75) {
    fillColor = 'red'; // Doluluk oranı yüksekse kırmızı
  } else if (fillRatio > 0.5) {
    fillColor = 'yellow'; // Doluluk oranı orta seviyede ise sarı
  } else {
    fillColor = 'blue'; // Doluluk oranı düşükse mavi
  }

  return (
    <div className={`facility-card ${isClicked ? 'clicked' : ''}`} onClick={() => setIsClicked(!isClicked)}>
      <div className="title">{name}</div>
      <div className="details">
        <p>Type: {type}</p>
        <p>Capacity: {capacity}</p>
        <p>Available Spots: {available_spots}</p>
        <div className="fill-bar-container">
          <div className="fill-bar" style={{ width: `${fillRatio * 100}%`, backgroundColor: fillColor }}></div>
          <div className="bar-border"></div>
        </div>
        <button onClick={handleButtonClick}>Click Me</button>
      </div>
    </div>
  );
};

export default FacilityCard;
