import Service from "../../base/service";

export default class LightsService extends Service {
    constructor(Model, provider) {
        super("lights-service", "Lights service", provider);
        this.Model = Model;
    }

    getLights() {
        throw new Error(`Not implemented in derived class`);
    }

    updateLights() {
        throw new Error(`Not implemented in derived class`);
    }
}
