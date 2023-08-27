// pages/api/check-approved.js
import connectDb from '../../utils/db';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const username = req.query.username;

  try {
    // Connect to the database
    await connectDb();

    // Find the user by the provided username and check the approval status
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.status(500).json({ error: 'Error checking admin status' });
  }
}
