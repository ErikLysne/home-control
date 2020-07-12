export default class ControllerBase {
    constructor(services, Repository, Model) {
        this.services = services;
        this.repository = new Repository(Model);
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

    makeCallback(callback) {
        return async function (req, res) {
            try {
                await this[callback](req, res);
            } catch (err) {
                this.error(res, err);
            }
        };
    }

    error(res, err) {
        const status = err.statusCode || err.status;
        const statusCode = status || 500;
        res.status(statusCode).send({ error: err.message });
    }

    success(res, data) {
        res.status(200).send(data);
    }

    notFound(res, param) {
        res.status(404).send({
            error: `Did not find resource with parameter \`${param}\``
        });
    }
}

function getClassName(object) {
    const objContent = object.constructor.toString();
    const parsed = objContent.split("class");
    return parsed.length > 1 ? parsed[1].split(" ")[1] : "unknown";
}
