const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  minParticipants:{type:Number,required:true},
  maxParticipants: { type: Number, required: true },

  
  // Usefull to get all the teams registered for the event
  registeredTeams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    }
  ],
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
