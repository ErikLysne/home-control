import Service from "../../base/service";

export default class LightsService extends Service {
    constructor(Model) {
        super();
        this.Model = Model;
    }

    start() {
        throw new Error(`Not implemented in derived class`);
    }

    getLights() {
        throw new Error(`Not implemented in derived class`);
    }

    updateLights() {
        throw new Error(`Not implemented in derived class`);
    }
}
