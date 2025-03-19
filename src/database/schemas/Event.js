const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  timeline: [{
    activity: { type: String, required: true },
    time: { type: String, required: true }
  }],
  venue: { type: String, required: true },
  theme: { type: String, required: true },
  maxParticipantsPerTeam: { type: Number, required: true },
  prizes: [{
    position: { type: Number, required: true },
    amount: { type: Number, required: true }
  }],
  registrationFees: {
    standard: { type: Number, required: true },
    ieeeMember: { type: Number, required: true }
  },
  rules: { type: [String], required: true },
  coordinators: [{
    name: { type: String, required: true },
    contactNumber: { type: String, required: true }
  }],
  organiser: { type: String },
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
});

module.exports = mongoose.model('Event', eventSchema);
