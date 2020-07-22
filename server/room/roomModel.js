import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    updated: {
        type: Date,
        default: () => {
            const timezoneOffset = new Date().getTimezoneOffset() * 60000;
            return new Date(Date.now() - timezoneOffset).toISOString();
        }
    },
    lights: {
        meta: {
            provider: String,
            group: String
        },
        resource: mongoose.Schema.Types.Mixed
    },
    sensors: mongoose.Schema.Types.Mixed
});

export default mongoose.model("Room", roomsSchema);
