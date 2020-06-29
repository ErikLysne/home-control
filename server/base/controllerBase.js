export default class ControllerBase {
    constructor(Repository, Model) {
        this.repository = new Repository(Model);
        this.controller = this;
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
        console.log(err);
        const status = err.statusCode || err.status;
        const statusCode = status || 500;
        res.status(statusCode).send({ error: err.message });
    }

    success(res, data) {
        res.status(200).send(data);
    }

    notFound(res, param) {
        res.status(404).send({
            error: `Did not find resource with parameter '${param}'`,
        });
    }
}
