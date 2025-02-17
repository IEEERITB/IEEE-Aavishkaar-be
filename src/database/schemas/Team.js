const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  leader: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    usn: { type: String, required: true, unique: true },
  },
  members: [
    {
      name: { type: String, required: true },
      usn: { type: String, required: true, unique: true },
    }
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    }
  ],
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});
const Team = mongoose.model('Team', teamSchema);
module.exports = Team