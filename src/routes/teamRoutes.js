const express = require("express");
const Team = require("../database/schemas/Team");
const Event = require("../database/schemas/Event");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { teamName, leader, members, event } = req.body;
    console.log(teamName);
    const eventExists = await Event.findById(event);
    if (!eventExists) {
      return res.status(400).json({ message: " event does not exist" });
    }

    const leaderExist = await Team.findOne({
      "leader.email": leader.email,
      event: event,
    });

    if (leaderExist) {
      return res.status(400).json({ message: "Leader exist for the event " });
    }

    const newTeam = new Team({
      teamName,
      leader,
      members,
      event,
    });

    const savedTeam = await newTeam.save();

    res
      .status(201)
      .json({ message: "Team registered successfully", team: savedTeam });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering team!", error: error.message });
  }
});

module.exports = router;
