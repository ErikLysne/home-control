import mongoose from "mongoose";

const homesSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "home",
        required: true
    },
    displayName: {
        type: String,
        default: "Home"
    },
    updated: {
        type: Date,
        default: () => {
            const timezoneOffset = new Date().getTimezoneOffset() * 60000;
            return new Date(Date.now() - timezoneOffset).toISOString();
        }
    },
    power: {
        meta: {
            provider: String
        },
        resource: mongoose.Schema.Types.Mixed
    }
});

export default mongoose.model("Home", homesSchema);
