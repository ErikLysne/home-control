import mongoose from "mongoose";

const philipsHueGroupSchema = new mongoose.Schema({
    id: Number,
    name: String,
    lights: [Number],
    type: String,
    state: {
        all_on: Boolean,
        any_on: Boolean
    },
    recycle: Boolean,
    class: String,
    action: {
        on: Boolean,
        bri: {
            type: Number,
            min: 1,
            max: 254
        },
        hue: {
            type: Number,
            min: 0,
            max: 65535
        },
        sat: {
            type: Number,
            min: 0,
            max: 254
        },
        effect: {
            type: String,
            enum: ["none", "colorloop"]
        },
        xy: {
            type: [Number],
            min: 0,
            max: 1
        },
        ct: {
            type: Number,
            min: 153,
            max: 500
        },
        alert: {
            type: String,
            enum: ["none", "select", "lselect"]
        },
        colormode: {
            type: String,
            enum: ["hs", "ct", "xy"]
        }
    }
});

export default mongoose.model("PhilipsHueGroup", philipsHueGroupSchema);
