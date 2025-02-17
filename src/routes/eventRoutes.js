const express = require('express');
const Event = require('../database/schemas/Event');
const router = express.Router();


router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).populate({
      path: 'registeredTeams.teamId',
      select: 'teamName leader members', 
      model: 'Team', 
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      eventName: event.name,
      eventDescription: event.description,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventCategory: event.category,
      maxParticipantsPerTeam: event.maxParticipantsPerTeam,
      registeredTeams: event.registeredTeams.map((teamRegistration) => ({
        teamName: teamRegistration.teamId ? teamRegistration.teamId.teamName : 'Unknown',
        leader: teamRegistration.teamId ? teamRegistration.teamId.leader : 'Unknown',
        members: teamRegistration.members, 
      })),
    });
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

//this returns only event details (for now)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().select('-registeredTeams'); 

    if (events.length === 0) {
      return res.json({ message: 'No events found' });
    }
    const allEventDetails = events.map((event) => ({
      eventName: event.name,
      eventDescription: event.description,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventCategory: event.category,
      maxParticipantsPerTeam: event.maxParticipantsPerTeam,
    }));
    res.json(allEventDetails);
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});
router.get('/event/:eventId/teams', async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).populate({
      path: 'registeredTeams.teamId', 
      select: 'teamName leader members', 
      model: 'Team',
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.registeredTeams.length === 0) {
      return res.json({ message: 'No teams registered for this event' });
    }

    
    const teams = event.registeredTeams.map((teamRegistration) => {
      return {
        teamName: teamRegistration.teamId ? teamRegistration.teamId.teamName : 'Unknown', 
        leader: teamRegistration.teamId ? teamRegistration.teamId.leader : 'Unknown', 
        members: teamRegistration.members, 
      };
    });
    res.json({
    eventName: event.name,
    eventDate: event.date,
    teams: teams, 
    });
  } catch (error) {
    console.error('Error fetching event teams:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
