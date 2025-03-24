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

    console.log(event)

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      eventId: event._id || null,
      eventName: event.name || null,
      eventDescription: event.description || null,
      eventTimeline: event.timeline || null,
      eventVenue: event.venue || null,
      eventTheme: event.theme || null,
      maxParticipantsPerTeam: event.maxParticipantsPerTeam || null,
      prizes: event.prizes || null,
      registrationFees: event.registrationFees || null,
      rules: event.rules || null,
      coordinators: event.coordinators || null,
      faqs: event.faqs || null,
      date: event.date || null,
      img: event.img || null
    });
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


//this returns only event details (for now)
router.get('/events', async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset) || 0;
    const events = await Event.find().skip(offset).limit(limit);
      if (events.length === 0) {
      return res.json({ message: 'No events found' });
    }

    console.log(events)

    const allEventDetails = events.map((event) => ({
      eventName: event.name,
      eventDescription: event.description,
      eventTimeline: event.timeline,
      eventTheme: event.theme,
      maxParticipantsPerTeam: event.maxParticipantsPerTeam,
      registrationFees: event.registrationFees,
      id: event._id,
      organiser: event?.organiser ? event?.organiser : "",
      date: event.date || null,
      img: event.img || null
    }));

    res.json(allEventDetails);
  } catch (error) {
    console.error('Error fetching all events:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

router.get('/getFeaturedEvents', async (req, res) => {
  try {
    const featuredEvents = await Event.find({ organiser: 'SB' });

    if (featuredEvents.length === 0) {
      return res.status(404).json({ message: 'No featured events found' });
    }

    const featuredEventDetails = featuredEvents.map((event) => ({
      eventName: event.name,
      eventDescription: event.description,
      eventTimeline: event.timeline,
      eventTheme: event.theme,
      maxParticipantsPerTeam: event.maxParticipantsPerTeam,
      registrationFees: event.registrationFees,
      organiser:event.organiser,
      img: event.img || null
    }));

    res.json(featuredEventDetails);
  } catch (error) {
    console.error('Error fetching featured events:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


module.exports = router;
