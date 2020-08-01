import mongoose from "mongoose";

const serviceStatusSchema = new mongoose.Schema({
    services: [mongoose.Schema.Types.Mixed],
    updated: {
        type: Date,
        default: () => {
            const timezoneOffset = new Date().getTimezoneOffset() * 60000;
            return new Date(Date.now() - timezoneOffset).toISOString();
        }
    }
});

export default mongoose.model("ServiceStatus", serviceStatusSchema);
