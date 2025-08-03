import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);