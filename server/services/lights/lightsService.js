import Service from "../../base/service";

export default class LightsService extends Service {
    constructor(Model) {
        super("lights-service", "Lights Service");
        this.Model = Model;
    }

    getLights() {
        throw new Error(`Not implemented in derived class`);
    }

    updateLights() {
        throw new Error(`Not implemented in derived class`);
    }
}
