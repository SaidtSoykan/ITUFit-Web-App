// src/components/TimeSlots.js

import React from 'react';

const TimeSlots = ({ day, handleSlotClick }) => {
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let i = 8; i <= 18; i += 2) {
      timeSlots.push({
        slot: `${i}:00 - ${i + 2}:00`,
        isReserved: false, // Varsa true olarak işaretleyin
      });
    }
    return timeSlots;
  };

  return (
    <div className="time-slots">
      <h4>Time Slots for {day}:</h4>
      <ul>
        {generateTimeSlots().map((timeSlot, index) => (
          <li
            key={index}
            onClick={() => handleSlotClick(day, timeSlot.slot)}
            className={timeSlot.isReserved ? 'reserved' : ''}
          >
            {timeSlot.slot}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlots;
