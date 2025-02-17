const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  maxParticipantsPerTeam: { type: Number, required: true },
  registeredTeams: [
    {
      teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, 
      members: [{ name: String, usn: String }],
      registeredAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Event', eventSchema);
