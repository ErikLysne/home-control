import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    services: [],
    updated: {
        type: Date,
        default: () => {
            const timezoneOffset = new Date().getTimezoneOffset() * 60000;
            return new Date(Date.now() - timezoneOffset).toISOString();
        }
    }
});

export default mongoose.model("Service", serviceSchema);
