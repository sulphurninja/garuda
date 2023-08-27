// pages/api/pending-requests.js
import connectDb from '../../utils/db';
import User from '../../models/User';

connectDb();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const pendingRequests = await User.find({ approved: false });
    return res.status(200).json(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    return res.status(500).json({ error: 'Error fetching pending requests' });
  }
}
