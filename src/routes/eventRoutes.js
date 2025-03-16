const express = require("express");
const Event = require("../database/schemas/Event");
const router = express.Router();

router.post("/event", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/event/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
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
      eventFlow: event.eventFlow,
      image: event.image,
    });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//this returns only event details (for now)
router.get("/events", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const events = await Event.find().skip(offset).limit(limit);
    if (events.length === 0) {
      return res.json({ message: "No events found" });
    }

    const allEventDetails = events.map((event) => ({
      _id: event._id,
      eventName: event.name,
      eventDescription: event.description,
      eventTimeline: event.timeline,
      eventTheme: event.theme,
      maxParticipantsPerTeam: event.maxParticipantsPerTeam,
      registrationFees: event.registrationFees,
      eventVenue: event.venue,
      image: event.image,
    }));

    res.json(allEventDetails);
  } catch (error) {
    console.error("Error fetching all events:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.post("/sample-events", async (req, res) => {
  try {
    const sampleEvents = [
      {
        name: "RoboWars",
        description:
          "Build and battle your robots in this exciting competition. Show off your engineering skills and compete for glory!",
        timeline: {
          dates: ["2025-03-15T10:00:00Z", "2025-03-15T18:00:00Z"],
        },
        venue: "Main Auditorium",
        theme: "Robotics",
        maxParticipantsPerTeam: 4,
        prizes: [
          { position: 1, amount: 10000 },
          { position: 2, amount: 5000 },
          { position: 3, amount: 2500 },
        ],
        registrationFees: {
          standard: 500,
          ieeeMember: 400,
        },
        rules: [
          "Maximum team size: 4 members",
          "Robot must be built from scratch",
          "No pre-built kits allowed",
          "Safety gear mandatory",
          "Maximum robot weight: 15kg",
        ],
        coordinators: [
          { name: "John Doe", contactNumber: "+91 98765 43210" },
          { name: "Jane Smith", contactNumber: "+91 98765 43211" },
        ],
        eventFlow: [
          "Registration and Check-in",
          "Technical Inspection",
          "Preliminary Rounds",
          "Quarter Finals",
          "Semi Finals",
          "Finals",
        ],
        image:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "CodeCraft",
        description:
          "A competitive programming contest that tests your problem-solving skills and coding efficiency. Solve complex algorithmic challenges and win exciting prizes!",
        timeline: {
          dates: ["2025-03-16T09:00:00Z", "2025-03-16T17:00:00Z"],
        },
        venue: "Computer Lab 1",
        theme: "Programming",
        maxParticipantsPerTeam: 2,
        prizes: [
          { position: 1, amount: 8000 },
          { position: 2, amount: 4000 },
          { position: 3, amount: 2000 },
        ],
        registrationFees: {
          standard: 300,
          ieeeMember: 250,
        },
        rules: [
          "Maximum team size: 2 members",
          "No external resources allowed",
          "Internet access will be provided",
          "Time limit: 4 hours",
          "Allowed languages: C++, Java, Python",
        ],
        coordinators: [
          { name: "Alice Johnson", contactNumber: "+91 98765 43212" },
          { name: "Bob Wilson", contactNumber: "+91 98765 43213" },
        ],
        eventFlow: [
          "Registration",
          "Problem Distribution",
          "Coding Phase",
          "Submission",
          "Results Announcement",
        ],
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630be2a?q=80&w=1000&auto=format&fit=crop",
      },
      {
        name: "CircuitMaster",
        description:
          "Design and implement innovative electronic circuits. Showcase your hardware design skills and compete with the best!",
        timeline: {
          dates: ["2025-03-17T10:00:00Z", "2025-03-17T18:00:00Z"],
        },
        venue: "Electronics Lab",
        theme: "Electronics",
        maxParticipantsPerTeam: 3,
        prizes: [
          { position: 1, amount: 12000 },
          { position: 2, amount: 6000 },
          { position: 3, amount: 3000 },
        ],
        registrationFees: {
          standard: 600,
          ieeeMember: 500,
        },
        rules: [
          "Maximum team size: 3 members",
          "Components will be provided",
          "Time limit: 6 hours",
          "No pre-built circuits allowed",
          "Documentation required",
        ],
        coordinators: [
          { name: "Charlie Brown", contactNumber: "+91 98765 43214" },
          { name: "Diana Prince", contactNumber: "+91 98765 43215" },
        ],
        eventFlow: [
          "Registration",
          "Component Distribution",
          "Circuit Design Phase",
          "Implementation",
          "Testing",
          "Presentation",
        ],
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      },
    ];

    for (const event of sampleEvents) {
      const newEvent = new Event(event);
      await newEvent.save();
    }

    res.status(201).json({ message: "Sample events created successfully" });
  } catch (error) {
    console.error("Error creating sample events:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.delete("/event/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
