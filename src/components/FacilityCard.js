// src/components/FacilityCard.js

import React, { useState } from 'react';

const FacilityCard = ({ facility, onCardClick }) => {
  const { facilityId, facilityType } = facility;
  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState('Select');

  const handleButtonClick = () => {
    setIsClicked(true);
    onCardClick(facilityId); // Seçili kartın adını iletmek için callback'i çağır
    setButtonText(isClicked ? 'Select' : 'Deselect');
  };

  // Doluluk oranını hesapla

  // Renkleri belirle
  // let fillColor;
  // if (fillRatio > 0.75) {
  //   fillColor = 'red'; // Doluluk oranı yüksekse kırmızı
  // } else if (fillRatio > 0.5) {
  //   fillColor = 'yellow'; // Doluluk oranı orta seviyede ise sarı
  // } else {
  //   fillColor = 'blue'; // Doluluk oranı düşükse mavi
  // }

  return (
    <div className={`facility-card ${isClicked ? 'clicked' : ''}`} onClick={() => setIsClicked(!isClicked)}>
      <div className="title">{facilityType}</div>
      <div className="details">
        <p>Facility Id: {facilityId}</p> 
        {/* <p>Facility Name: {facilityType}</p> */}
        {/* <div className="fill-bar-container">
          <div className="fill-bar" style={{ width: `${fillRatio * 100}%`, backgroundColor: fillColor }}></div>
          <div className="bar-border"></div>
        </div> */}
        <button onClick={handleButtonClick}>{buttonText}</button>
      </div>
    </div>
  );
};

export default FacilityCard;
