const express = require('express');
const Team = require('../database/schemas/Team');
const Event = require('../database/schemas/Event'); 
const router = express.Router();

//team registration
router.post('/register', async (req, res) => {
  try {
    const { teamName, leader, members, events } = req.body;

    const eventExists = await Event.find({ _id: { $in: events } });
    if (eventExists.length !== events.length) {
      return res.status(400).json({ message: 'One or more events do not exist' });
    }

    const newTeam = new Team({
      teamName,
      leader,
      members,
      events,
    });

    const savedTeam = await newTeam.save();
    await Event.updateMany(
      { _id: { $in: events } },
      { $push: { registeredTeams: savedTeam._id } }
    );

    res.status(201).json({ message: 'Team registered successfully', team: savedTeam });
  } catch (error) {
    res.status(500).json({ message: 'Error registering team!', error: error.message });
  }
});

module.exports = router;
