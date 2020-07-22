export default class Controller {
    constructor(services, Repository, Model, RequestValidator) {
        this.services = services;
        this.repository = new Repository(Model);
        this.requestValidator = new RequestValidator();
        this.type = null;
    }

    async startServices() {
        return new Promise(async (resolve, reject) => {
            Promise.all(
                this.services.map((service) =>
                    service.start().then(() => {
                        console.log(
                            `Started service \`${getClassName(
                                service
                            )}\` for controller \`${getClassName(this)}\``
                        );
                    })
                )
            )
                .then(() => {
                    resolve(true);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    registerCallback(callback) {
        return async function (req, res) {
            if (this.requestValidator.validate(req, res)) {
                try {
                    await this[callback](req, res);
                } catch (err) {
                    this.internalServerError(res, err);
                }
            }
        };
    }

    internalServerError(res, err) {
        const status = err.statusCode || err.status;
        const statusCode = status || 500;
        res.status(statusCode).send({ error: err.message });
    }

    requestProcessingError(res, err) {
        res.status(400).send({
            error: err
        });
    }

    resourceNotFoundError(res, param) {
        res.status(404).send({
            error: `Did not find resource with parameter \`${param}\``
        });
    }

    resoucesRetrieved(res, data) {
        res.status(200).send({
            data: data
        });
    }

    resourcesDeleted(res, data) {
        res.status(200).send({
            data: data
        });
    }

    resourceCreated(res, data) {
        res.status(201).send({
            data: data
        });
    }

    resouceRetrieved(res, data) {
        res.status(200).send({
            data: data
        });
    }

    resourceUpdated(res, data) {
        res.status(200).send({
            data: data
        });
    }

    resourceDeleted(res, data) {
        res.status(200).send({
            data: data
        });
    }

    success(res, data) {
        res.status(200).send({ data: data });
    }
}

function getClassName(object) {
    const objContent = object.constructor.toString();
    const parsed = objContent.split("class");
    return parsed.length > 1 ? parsed[1].split(" ")[1] : "unknown";
}
