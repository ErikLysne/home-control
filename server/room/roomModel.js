import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    lights: mongoose.Schema.Types.Mixed,
    sensors: mongoose.Schema.Types.Mixed,
});

const Room = mongoose.model("Room", roomsSchema);

export default Room;
