import React, { useState } from 'react';
import { restaurants, activities, entertainments } from '../data/categories';
import '../styles/randomizer.css';

const Randomizer = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedEntertainment, setSelectedEntertainment] = useState('');
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  
  const fetchRecommendations = async (cuisine) => {
    const overpassQuery = `
      [out:json];
      area["name"="Rochester, NY"]["boundary"="administrative"]->.searchArea;
      (
        node["amenity"="restaurant"]["cuisine"~"${cuisine}",i](area.searchArea);
        way["amenity"="restaurant"]["cuisine"~"${cuisine}",i](area.searchArea);
        relation["amenity"="restaurant"]["cuisine"~"${cuisine}",i](area.searchArea);
      );
      out center;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      const data = await response.json();
      setRecommendedRestaurants(data.elements);
    } catch (error) {
      console.error("Error fetching recommended restaurants:", error);
    }
  };

  const randomize = () => {
    const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const randomEntertainment = entertainments[Math.floor(Math.random() * entertainments.length)];

    setSelectedRestaurant(randomRestaurant);
    setSelectedActivity(randomActivity);
    setSelectedEntertainment(randomEntertainment);

    fetchRecommendations(randomRestaurant);
  };

  const getAddress = (tags) => {
    if (!tags) return '';
    const { "addr:housenumber": houseNumber, "addr:street": street, "addr:city": city, "addr:state": state, "addr:postcode": postcode } = tags;
    if (!houseNumber && !street && !city && !state && !postcode) return '';
    return `${houseNumber ? houseNumber + ' ' : ''}${street ? street + ', ' : ''}${city ? city + ', ' : ''}${state ? state + ' ' : ''}${postcode ? postcode : ''}`.trim();
  };

  return (
    <div className="randomizer-page">
      <div className="randomizer-container">
        <h1>Clicky below!</h1>
        <button className="randomize-btn" onClick={randomize}>Randomize!</button>
        <div className="results">
          {selectedRestaurant && <h2>Restaurant Cuisine: {selectedRestaurant}</h2>}
          {selectedActivity && <h2>Activity: {selectedActivity}</h2>}
          {selectedEntertainment && <h2>Entertainment: {selectedEntertainment}</h2>}
        </div>

        {recommendedRestaurants.length > 0 && (
          <div className="recommended-section">
            <h2>Recommended {selectedRestaurant} Restaurants in Rochester</h2>
            <div className="restaurant-cards">
              {recommendedRestaurants.map((restaurant) => {
                const address = getAddress(restaurant.tags);
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                const imageUrl = restaurant.tags && restaurant.tags.image ? restaurant.tags.image : null;
                return (
                  <div key={restaurant.id || restaurant.ref} className="restaurant-card">
                    {imageUrl && (
                      <img 
                        src={imageUrl} 
                        alt={restaurant.tags && restaurant.tags.name ? restaurant.tags.name : 'Restaurant'} 
                        className="restaurant-image" 
                      />
                    )}
                    <h3>
                      {restaurant.tags && restaurant.tags.name
                        ? restaurant.tags.name
                        : 'Unnamed Restaurant'}
                    </h3>
                    {address && (
                      <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                        View on Map
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Randomizer;
