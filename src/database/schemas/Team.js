const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  leader: {
    name: { type: String, required: true },
    email: { type: String, required: true, },
    contactNumber: { type: String, required: true },
    usn: { type: String, required: false, },
  },
  members: [
    {
      name: { type: String, required: true },
      usn: { type: String, required: false,  },
    }
  ],
  
  event:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Event',
    required:true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});
const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
