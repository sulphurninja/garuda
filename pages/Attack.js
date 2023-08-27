import React, { useContext, useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Coordinates from '../components/Coordinates';

export default function Attack() {

  const [locationAccess, setLocationAccess] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Location:', latitude, longitude);
          setLocationAccess(true);
          setLatitude(latitude);
          setLongitude(longitude);
          saveSuspectCoordinates(latitude, longitude); // Save the coordinates here
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }, []);

  const saveSuspectCoordinates = async (lat, long) => {
    try {
      await fetch('/api/save-suspect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: lat, longitude: long }),
      });
      console.log('Suspect coordinates saved successfully');
    } catch (error) {
      console.error('Error saving suspect coordinates:', error);
    }
  };


  return (
    <>
      <div className='ml-[25%] text-white'>
        <Hero />
        {/* {locationAccess ? (
          <Coordinates longitude={longitude} latitude={latitude}/>
        ) : (
          <p>Requesting location access...</p>
        )} */}
      </div>
    </>
  );
}
