import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    // Add your MongoDB connection URI here
    const MONGODB_URI = 'mongodb+srv://aditya4sure:garuda@garuda.8wznpts.mongodb.net/?retryWrites=true&w=majority&appName=Garuda';
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return;
  }
};

export default connectDb;
