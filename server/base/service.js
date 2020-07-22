export default class Service {
    constructor() {
        this.started = false;
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
