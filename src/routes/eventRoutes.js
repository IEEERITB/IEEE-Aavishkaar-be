const express = require('express');
const Event = require('../database/schemas/Event'); 
const router = express.Router();

router.get('/:eventId/teams', async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate({
      path: 'registeredTeams',
      select: 'teamName -_id', 
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const teamNames = event.registeredTeams.map(team => team.teamName);

    if (teamNames.length === 0) {
      return res.json({ message: 'No teams registered for this event' });
    }

    res.json({ eventName: event.name, teamNames });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// event registeration for admins only
router.post('/register',async(req,res)=>{
  const { name, description, date, time, venue, minParticipants, maxParticipants } = req.body;

  try {
    if (!name || !description || !date || !time || !venue || !minParticipants || !maxParticipants) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new event instance
    const newEvent = new Events({
      name,
      description,
      date,
      time,
      venue,
      minParticipants,
      maxParticipants
    });

   
    await newEvent.save();

    
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
)

module.exports = router;
