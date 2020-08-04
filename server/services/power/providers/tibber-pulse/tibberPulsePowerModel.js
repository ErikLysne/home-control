import mongoose from "mongoose";

const tibberPulsePowerSchema = new mongoose.Schema({
    timestamp: Date,
    power: Number,
    powerProduction: Number,
    accumulatedConsumption: Number,
    accumulatedProduction: Number,
    accumulatedCost: Number,
    accumulatedReward: Number,
    currency: Number,
    minPower: Number,
    averagePower: Number,
    maxPower: Number,
    minPowerProduction: Number,
    maxPowerProduction: Number,
    lastMeterConsumption: Number,
    lastMeterProduction: Number,
    voltagePhase1: Number,
    voltagePhase2: Number,
    voltagePhase3: Number,
    currentPhase1: Number,
    currentPhase2: Number,
    currentPhase3: Number
});

export default mongoose.model("TibberPulsePower", tibberPulsePowerSchema);
