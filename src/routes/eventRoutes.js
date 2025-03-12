const express = require('express');
const Event = require('../database/schemas/Event');
const router = express.Router();


router.post("/event", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
})

router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      eventName: event.name,
      eventDescription: event.description,
      eventTimeline: event.timeline,
      eventVenue: event.venue,
      eventTheme: event.theme,
      maxParticipantsPerTeam: event.maxParticipantsPerTeam,
      prizes: event.prizes,
      registrationFees: event.registrationFees,
      rules: event.rules,
      coordinators: event.coordinators,
      eventFlow: event.eventFlow
    });
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


//this returns only event details (for now)
router.get('/events', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const events = await Event.find().skip(offset).limit(limit);
      if (events.length === 0) {
      return res.json({ message: 'No events found' });
    }

    const allEventDetails = events.map((event) => ({
      eventName: event.name,
      eventDescription: event.description,
      eventTimeline: event.timeline,
      eventTheme: event.theme,
      maxParticipantsPerTeam: event.maxParticipantsPerTeam,
      registrationFees: event.registrationFees
    }));

    res.json(allEventDetails);
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


module.exports = router;
