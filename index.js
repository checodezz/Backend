const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./model/event.model")

const app = express();
app.use(express.json())

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
