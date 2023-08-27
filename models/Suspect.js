// models/Suspect.js
import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

const Suspect = mongoose.models.Suspect || mongoose.model('Suspect', suspectSchema);

export default Suspect;
