export default class Service {
    constructor(type, displayName, provider) {
        this.serviceType = type;
        this.displayName = displayName;
        this.provider = provider;
        this.started = false;
    }

    get type() {
        return this.serviceType;
    }

    checkIfStarted() {
        if (!this.started) {
            throw new Error(
                "start was not called successfully. Did you call start on this service before attempting to call this function?"
            );
        }
    }

    async start(init) {
        if (!this.started) {
            return new Promise(async (resolve, reject) => {
                await init()
                    .then((result) => {
                        this.started = true;
                        return resolve(result);
                    })
                    .catch((err) => reject(err));
            });
        }
    }

    getStatus() {
        throw new Error(`Not implemented in derived class`);
    }

    synchronize() {
        throw new Error(`Not implemented in derived class`);
    }
}
