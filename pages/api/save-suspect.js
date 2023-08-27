// pages/api/save-suspect.js
import connectDb from '../../utils/db';
import Suspect from '../../models/Suspect';

connectDb();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { latitude, longitude } = req.body;

  try {
    const newSuspect = new Suspect({ latitude, longitude });
    await newSuspect.save();
    res.status(201).json({ message: 'Suspect saved successfully' });
  } catch (error) {
    console.error('Error saving suspect:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
