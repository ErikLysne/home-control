export default class Service {
    constructor(type) {
        this.serviceType = type;
        this.started = false;
    }

    get type() {
        return this.serviceType;
    }

    started() {
        this.started = true;
    }

    checkIfStarted() {
        if (!this.started) {
            throw new Error(
                "start was not called successfully. Did you call start on this service before attempting to call this function?"
            );
        }
    }

    synchronize() {}
}
