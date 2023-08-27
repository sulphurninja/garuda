import connectDb from '../../utils/db';
import User from '../../models/User';

connectDb();

export default async (req, res) => {
  try {
    const pendingRequests = await User.find({ approved: false });
    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
