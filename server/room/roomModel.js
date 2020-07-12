import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: () => {
            const timezoneOffset = new Date().getTimezoneOffset() * 60000;
            return new Date(Date.now() - timezoneOffset).toISOString();
        }
    },
    lights: {
        provider: String,
        group: String,
        resource: mongoose.Schema.Types.Mixed
    },
    sensors: mongoose.Schema.Types.Mixed
});

export default mongoose.model("Room", roomsSchema);
