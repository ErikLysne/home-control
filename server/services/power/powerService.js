import Service from "../../base/service";

export default class PowerService extends Service {
    constructor(Model, provider) {
        super("power-service", "Power service", provider);
        this.Model = Model;
    }

    getPower() {
        throw new Error(`Not implemented in derived class`);
    }
}
