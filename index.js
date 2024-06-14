const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./model/event.model")
const cors = require("cors")

const app = express();
app.use(express.json())

const corsOption = {
    origin: "*",
    credentials: true
}

app.use(cors(corsOption));

initializeDatabase();

app.get("/", (req, res) => {
    res.send("Hello")
});


async function createNewEvent(newEvent) {
    try {
        const event = new Event(newEvent);
        const savedEvent = await event.save();
        return savedEvent
    } catch (error) {
        throw error;
    }
}

app.post("/event", async (req, res) => {
    try {
        const event = await createNewEvent(req.body)
        if (event) {
            res.status(201).json({ message: "Event Added Successfully.", event: event })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to add Event." })
    }
})

async function getAllEvents() {
    try {
        const events = await Event.find();
        return events
    } catch (error) {
        throw error
    }
}

app.get("/event", async (req, res) => {
    try {
        const events = await getAllEvents();
        if (events.length !== 0) {
            res.status(200).json({ message: "List of Events", events: events });
        } else {
            res.status(404).json({ error: "Events not Found." });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch Events." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
