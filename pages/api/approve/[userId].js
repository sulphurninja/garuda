// pages/api/approve/[userId].js
import connectDb from '../../../utils/db';
import User from '../../../models/User';

connectDb();

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'PUT') {
    return res.status(405).end();
  }

  const userId = req.query.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { approved } = req.body;

    user.approved = approved;
    await user.save();

    return res.status(200).json({ message: 'Approval status updated' });
  } catch (error) {
    console.error('Error updating approval status:', error);
    return res.status(500).json({ error: 'Error updating approval status' });
  }
}
