import connectDb from '../../../utils/db';
import User from '../../../models/User';

connectDb();

export default async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;
  const { approved } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.approved = approved;
    await user.save();

    res.status(200).json({ message: 'User approval updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
