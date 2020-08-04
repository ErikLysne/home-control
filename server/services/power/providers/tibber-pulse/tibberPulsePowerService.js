import PowerService from "../../powerService";
import Tibber from "tibber-pulse-connector";
import ws from "ws";

export default class TibberPulsePowerService extends PowerService {
    constructor(token, homeId, ...args) {
        super(...args, "Tibber Pulse");
        this.token = token;
        this.homeId = homeId;
        this.tibber = undefined;
        this.lastReading = null;
        this.lastError = null;
        this.isConnected = false;
    }

    async start() {
        await super.start(() => {
            return new Promise(async (resolve, reject) => {
                this.tibber = new Tibber({
                    token: this.token,
                    homeId: this.homeId,
                    ws,
                    onData: (data) => {
                        this.isConnected = true;
                        const powerModel = new this.Model(
                            data.data.liveMeasurement
                        );
                        const { _id, ...powerParams } = powerModel.toObject();
                        this.lastReading = powerParams;
                    },
                    onError: (err) => {
                        this.lastError = err;
                        this.isConnected = false;
                    }
                });
                try {
                    this.tibber.start();
                    resolve(true);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    getPower() {
        super.checkIfStarted();
        return this.lastReading;
    }

    async getStatus() {
        super.checkIfStarted();
        return new Promise((resolve, reject) =>
            this.isConnected ? resolve({}) : reject(this.lastError)
        );
    }
}
