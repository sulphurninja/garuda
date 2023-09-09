import connectDb from '@/utils/db';
import Suspect from '@/models/Suspect';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { imageUrl, latitude, longitude, userIp, batteryStatus, userName, batteryCharging, osDetails } = req.body;

  try {
      await connectDb();
       
    // Create a new Suspect document
    const newSuspect = new Suspect({
      image: imageUrl, // Cloudinary image URL
      latitude,
      longitude,
      battery: batteryStatus, // You can set this as needed
      userName,
      ip: userIp, // Set the actual IP address here
      charging:batteryCharging,
      osDetails,
    });

    // Save the suspect to the database
    const savedSuspect = await newSuspect.save();

    res.status(200).json(savedSuspect);
  } catch (error) {
    console.error('Error saving suspect:', error);
    res.status(500).json({ message: 'Error saving suspect' });
  }
}