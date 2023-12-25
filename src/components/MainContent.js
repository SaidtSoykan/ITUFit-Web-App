// src/components/MainContent.js

import React, { useState } from 'react';
import initialFacilitiesData from '../data/facilities';
import FacilityCard from './FacilityCard';
import Calendar from './Calendar'; // Yeni eklenen bileşen
import './MainContent.css';
import users from '../data/users'; 
import UserCard from './UserCard'; // UserCard bileşenini ekleyin
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './NavigationBar'; // Yeni eklenen bileşen

function MainContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [newFacilityModal, setNewFacilityModal] = useState(false);
  const [facilitiesData, setFacilitiesData] = useState(initialFacilitiesData);
  const [newFacilityData, setNewFacilityData] = useState({
    name: '',
    type: '',
    capacity: 0,
    available_spots: 0,
    dimensions: { width: 0, length: 0 },
  });
  const [selectedCardName, setSelectedCardName] = useState(null);
  const [restrictedUsers, setRestrictedUsers] = useState([]); // Burada tanımlandı
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSearch = () => {
    const result = users.find(
      (user) => user.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (result) {
      setSearchResult(result);
      console.log('User Data:', result);
    } else {
      setSearchResult(null);
      console.log('User not found');
    }
  };

  const handleNewFacilityChange = (e) => {
    const { name, value } = e.target;
    setNewFacilityData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNewFacilityCancel = () => {
    setNewFacilityModal(false);
  };

  const handleNewFacilitySave = () => {
    console.log('New Facility Data:', newFacilityData);

    // Update facilitiesData with the new facility
    setFacilitiesData((prevData) => [...prevData, newFacilityData]);

    // Reset the form data and close the modal
    setNewFacilityData({
      name: '',
      type: 'Spor Tesisi',
      capacity: 0,
      available_spots: 0,
      dimensions: { width: 0, length: 0 },
    });

    setNewFacilityModal(false);
  };

  // Fonksiyon, FacilityCard bileşeninden gelen tıklama olayına yanıt olarak çağrılır
  const handleCardClick = (cardName) => {
    if(!showCalendar){
      setSelectedCardName(cardName);
    }else{
      setSelectedCardName(null); 
    }
    setShowCalendar(!showCalendar);
  };
  const showRestrictedUsersList = () => {
    const restrictedUsers = users.filter((user) => user.restricted);
  
    if (restrictedUsers.length > 0) {
      console.log('Restricted Users:', restrictedUsers);
      setRestrictedUsers(restrictedUsers);
    } else {
      console.log('No restricted users found.');
    }
  };

  return (
    
      <Router>
        <NavigationBar />
        <div> 
        <main> 
        <Routes>
        {/* /restricted-user Route */}            
        <Route path="/restricted-user" element={
          <React.Fragment>
            {/* Kullanıcı Arama */}
            <div className="search-container">
              <h2>Please enter student name for arrange restriction state!</h2>
              <br/>
              <input
                type="text"
                placeholder="Enter a name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            {searchResult && (
              <div className="search-result">
                <h3>Search Result:</h3>
                <UserCard user={searchResult} />
              </div>
            )}

            {/* Show Restricted Users Butonu */}
            <button onClick={showRestrictedUsersList}>Show Restricted Users</button>

            {/* Restricted Users Kartları */}
            {restrictedUsers.length > 0 && (
              <div className="restricted-users-list">
                <h3>Restricted Users:</h3>
                {restrictedUsers.map((restrictedUser, index) => (
                  <UserCard key={index} user={restrictedUser} />
                ))}
              </div>
            )}
          </React.Fragment>
        } />

        {/* /homepage Route */}
        <Route path="/" element={
          <div>
            <h2>Welcome to the Admin Panel!</h2>

            {/* Tesis Kartları */}
            <h3>Facilities:</h3>
            <div className="facility-list">
              {facilitiesData.map((facility, index) => (
                <FacilityCard
                  key={index}
                  facility={facility}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>

            {/* Yeni Tesisi Ekleme Butonu */}
            <button onClick={() => setNewFacilityModal(!newFacilityModal)}>{newFacilityModal ? 'Return' : 'Add New Facility'}</button>

            {/* Yeni Tesisi Ekleme Formu */}
            {newFacilityModal && (
              <div className="modal">
                <h3>Add New Facility</h3>
                <form>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newFacilityData.name}
                    onChange={handleNewFacilityChange}
                  />
                  <label>Type:</label>
                  <select
                    name="type"
                    value={newFacilityData.type}
                    onChange={handleNewFacilityChange}
                  >
                    <option value="Spor Tesisi">Spor Tesisi</option>
                    {/* Diğer tip seçeneklerini ekleyebilirsiniz */}
                  </select>
                  <label>Capacity:</label>
                  <input
                    type="number"
                    name="capacity"
                    value={newFacilityData.capacity}
                    onChange={handleNewFacilityChange}
                  />
                  <label>Available Spots:</label>
                  <input
                    type="number"
                    name="available_spots"
                    value={newFacilityData.available_spots}
                    onChange={handleNewFacilityChange}
                  />
                  <button type="button" onClick={handleNewFacilitySave}>
                    Save
                  </button>
                  <button type="button" onClick={handleNewFacilityCancel}>
                    Cancel
                  </button>
                </form>
              </div>
            )}

            {/* Seçilen Kartın Adını Gösterme */}
            {selectedCardName && (
              <div className="selected-card-info">
                <p>Selected Card Name: {selectedCardName}</p>
              </div>
            )}

            {/* Takvim */}
            {showCalendar && <Calendar />}
          </div>
        } />
                </Routes>
         </main>
         </div>
      </Router>
  );
}

export default MainContent;