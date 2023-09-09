// models/Suspect.js
import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema({
  image: String,
  latitude: Number,
  longitude: Number,
  battery: String,
  charging: Boolean,
  osDetails: String,
  userName : String,
  ip: String,
  timestamp: { type: Date, default: Date.now },
});

const Suspect = mongoose.models.Suspect || mongoose.model('Suspect', suspectSchema);

export default Suspect;
