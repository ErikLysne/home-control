import ServiceBase from "../../base/serviceBase";

export default class LightsService extends ServiceBase {
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
