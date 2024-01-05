// src/components/MainContent.js

import React, { useState, useEffect } from 'react';
import initialFacilitiesData from '../data/facilities';
import FacilityCard from './FacilityCard';
import Calendar from './Calendar'; // Yeni eklenen bileşen
import './MainContent.css';
import users from '../data/users'; 
import UserCard from './UserCard'; // UserCard bileşenini ekleyin
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './NavigationBar'; // Yeni eklenen bileşen
import axios from 'axios';

function MainContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [newFacilityModal, setNewFacilityModal] = useState(false);
  const [facilitiesData, setFacilitiesData] = useState(initialFacilitiesData);
  // const [newFacilityData, setNewFacilityData] = useState({
  //   type: '',
  //   capacity: '',
  //   description: '',
  // });
  const [newFacilityType, setNewFacilityType] = useState(null);
  const [newFacilityCapacity, setNewFacilityCapacity] = useState(null);
  const [newFacilityDescription, setNewFacilityDescription] = useState(null);



  const [selectedCardName, setSelectedCardName] = useState(null);
  const [restrictedUsers, setRestrictedUsers] = useState([]); // Burada tanımlandı
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchFacilityTerm, setSearchFacilityTerm] = useState('');
  
  useEffect(() => {
  
    fetchFacilitiesData();
  }, []);
   
  const fetchFacilitiesData = async () => {
    try {
      const response = await axios.post('https://c4f3-176-42-133-250.ngrok-free.app/facilities/listFacility');
      setFacilitiesData(response.data.data); // Assuming the response contains an arr of facilities
      
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };
   
  
  
  const handleSearch = async () => {
    try {
      const requestData = {
        name: searchTerm
      }
      console.log("searchTerm: ",searchTerm);

      const response = await axios.post('https://c4f3-176-42-133-250.ngrok-free.app/students/search', requestData);
      const foundUser = response.data.data;
      console.log("response.data: ",response.data);
      console.log("response.data.data: ",response.data.data);
      if (response.data) {
        setSearchResult(foundUser);
        console.log("foundUser: ", foundUser);
      } else {
        setSearchResult(null);
        console.log('User not found');
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSearchFacility = async () => {
    try {
      const requestData = {
        facilityType: searchFacilityTerm
      }
      const response = await axios.post('https://c4f3-176-42-133-250.ngrok-free.app/facilities/searchFacility', requestData);
      const foundFacility = response.data.data;
      if (foundFacility) {
        setSelectedFacility(foundFacility);
      } else {
        setSelectedFacility(null);
        console.log('Facility not found');
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error searching facilities:', error);
    }

    // const foundFacility = facilitiesData.find(
    //   (facility) => facility.name.toLowerCase() === searchFacilityTerm.toLowerCase()
    // );

    
  };

  const handleNewFacilityChange = async () => {
    try {
      const requestData = {
        facilityType: newFacilityType,
        capacity: newFacilityCapacity,
        description: newFacilityDescription,
        location: "ITU",
      }
      console.log(requestData);
      const response = await axios.post('https://c4f3-176-42-133-250.ngrok-free.app/facilities/addFacility', requestData);
      if(response.data){
        console.log("Facility added");
        fetchFacilitiesData();
      }else{
        console.log("Facility cant added");
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const handleNewFacilityCancel = () => {
    setNewFacilityModal(false);
  };

  // const handleNewFacilitySave = () => {
  //   console.log('New Facility Data:', newFacilityData);

  //   // Update facilitiesData with the new facility
  //   setFacilitiesData((prevData) => [...prevData, newFacilityData]);

  //   // Reset the form data and close the modal
  //   setNewFacilityData({
  //     name: '',
  //     type: 'Spor Tesisi',
  //     capacity: 0,
  //     available_spots: 0,
  //     dimensions: { width: 0, length: 0 },
  //   });

  //   setNewFacilityModal(false);
  // };

  // Fonksiyon, FacilityCard bileşeninden gelen tıklama olayına yanıt olarak çağrılır
  const handleCardClick = (cardName) => {
    if(!showCalendar){
      setSelectedCardName(cardName);
    }else{
      setSelectedCardName(null); 
    }
    setShowCalendar(!showCalendar);
  };

  const showRestrictedUsersList = async () => {
    try {
      const response = await axios.post('https://c4f3-176-42-133-250.ngrok-free.app/students/listRestricted');
      console.log("response.data is :", response.data);
      const restrictedUsers = response.data.data;
      console.log("restrictedUsers is :", restrictedUsers);
  
      if (restrictedUsers.length > 0) {
        console.log('Restricted Users:', restrictedUsers);
        setRestrictedUsers(restrictedUsers);
      } else {
        console.log('No restricted users can be found.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // const showRestrictedUsersList = () => {
  //   const restrictedUsers = users.filter((user) => user.restricted);
  
  //   if (restrictedUsers.length > 0) {
  //     console.log('Restricted Users:', restrictedUsers);
  //     setRestrictedUsers(restrictedUsers);
  //   } else {
  //     console.log('No restricted users found.');
  //   }
  // };

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
                <UserCard user={{
                                id: searchResult.id,
                                firstName:searchResult.firstName,
                                lastName:searchResult.lastName}} />
              </div>
            )}

            {/* Show Restricted Users Butonu */}
            <button onClick={showRestrictedUsersList}>Show Restricted Users</button>

            {/* Restricted Users Kartları */}
            {restrictedUsers.length > 0 && (
              <div className="restricted-users-list">
                <h3>Restricted Users:</h3>
                {restrictedUsers.map((restrictedUser, index) => (
                  <UserCard key={index} user={{
                                              id: restrictedUser.id,
                                              firstName:restrictedUser.firstName,
                                              lastName:restrictedUser.lastName}} />
                ))}
              </div>
            )}
          </React.Fragment>
        } />

        {/* /homepage Route */}
        <Route path="/" element={
          <div>
            <h2>Welcome to the Admin Panel!</h2>

            {/* Search Facility Butonu ve Giriş Alanı */}
            <div className="search-container">
                  <input
                    type="text"
                    placeholder="Enter facility name..."
                    value={searchFacilityTerm}
                    onChange={(e) => setSearchFacilityTerm(e.target.value)}
                  />
                  <button onClick={handleSearchFacility}>Search Facility</button>
                </div>

                {/* Seçilen Tesis Kartı */}
                {selectedFacility && (
                  <div className="selected-facility-info">
                    <h3>Selected Facility:</h3>
                    <FacilityCard 
                          facility={selectedFacility}
                          onCardClick={handleCardClick}/>
                  </div>
                )}

            {/* Show All Facilities Butonu */}
            <button onClick={() => {
                setShowAllFacilities(!showAllFacilities);
                fetchFacilitiesData();
              }}>
            {showAllFacilities ? 'Hide Facilities' : 'Show All Facilities'}
            </button>


            {/* Tesis Kartları */}
            {showAllFacilities && (
                  <>
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
                  </>
                )}

            {/* Yeni Tesisi Ekleme Butonu */}
            <button onClick={() => setNewFacilityModal(!newFacilityModal)}>{newFacilityModal ? 'Return' : 'Add New Facility'}</button>

            {/* Yeni Tesisi Ekleme Formu */}
            {newFacilityModal && (
              <div className="modal">
                <h3>Add New Facility</h3>
                <form>
                  {/* <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newFacilityData.name}
                    onChange={handleNewFacilityChange}
                  /> */}
                  <label>Type:</label>
                  <select
                    name="type"
                    // value={newFacilityData.type}
                    onChange={(e) => setNewFacilityType(e.target.value)}
                  >
                    <option value="GYM">GYM</option>
                    <option value="POOL">POOL</option>
                    <option value="TENNIS_COURT">TENNIS COURT</option>
                    <option value="TABLE_TENNIS">TABLE TENNIS</option>
                    <option value="BASKETBALL">BASKETBALL</option>
                    <option value="FOOTBALL">FOOTBALL</option>
                    <option value="VOLLEYBALL">VOLLEYBALL</option>
                    {/* Diğer tip seçeneklerini ekleyebilirsiniz */}
                  </select>
                  <label>Capacity:</label>
                  <input
                    type="text"
                    name="capacity"
                    // value={newFacilityData.capacity}
                    onChange={(e) => setNewFacilityCapacity(e.target.value)}
                  />
                  <label>Description:</label>
                  <input
                    type="text"
                    name="description"
                    // value={newFacilityData.description}
                    onChange={(e) => setNewFacilityDescription(e.target.value)}
                  />
                  <button type="button" onClick={handleNewFacilityChange}>
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