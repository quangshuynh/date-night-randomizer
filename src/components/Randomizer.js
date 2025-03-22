import React, { useState } from 'react';
import { restaurants, activities, entertainments } from '../data/categories';
import '../styles/randomizer.css';

const Randomizer = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedEntertainment, setSelectedEntertainment] = useState('');

  const randomize = () => {
    setSelectedRestaurant(restaurants[Math.floor(Math.random() * restaurants.length)]);
    setSelectedActivity(activities[Math.floor(Math.random() * activities.length)]);
    setSelectedEntertainment(entertainments[Math.floor(Math.random() * entertainments.length)]);
  };

  return (
    <div className="randomizer-page">
        <div className="randomizer-container">
            <h1>Clicky below!</h1>
            <button className="randomize-btn" onClick={randomize}>Randomize!</button>
            <div className="results">
            {selectedRestaurant && <h2>Restaurant: {selectedRestaurant}</h2>}
            {selectedActivity && <h2>Activity: {selectedActivity}</h2>}
            {selectedEntertainment && <h2>Entertainment: {selectedEntertainment}</h2>}
            </div>
        </div>
    </div>
  );
};

export default Randomizer;
