import connectDB from '../../utils/db';
import Suspect from '../../models/Suspect';

// Connect to MongoDB
connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userName } = req.query;
      const suspects = await Suspect.find({ userName });
      res.status(200).json({ success: true, data: suspects });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(404).json({ message: 'Not found' });
  }
}
