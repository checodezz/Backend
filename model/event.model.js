const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    eventStartTime: {
        type: Date,
        required: true
    },
    eventEndTime: {
        type: Date,
        required: "true"
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    eventThumbnail: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    hostedBy: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        enum: ["online", "offline"],
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    eventTags: {
        type: [String],
        required: true
    },
    speakers: [{
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        }
    }],
    price: {
        type: String,
        required: true
    },
    additionalInformation: {
        dressCode: {
            type: "String",
            required: true
        },
        ageRestrictions: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;