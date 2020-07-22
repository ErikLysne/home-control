export default class RequestValidator {
    constructor() {
        this.res = null;
    }

    validate({ headers, path, method, params, body }, res) {
        this.res = res;
        const contentType = headers["content-type"];

        if (contentType !== "application/json") {
            return this.sendError(
                415,
                `Unsupported media type \`${contentType}\``
            );
        }

        if (method === "POST" || method === "PUT" || method === "DELETE") {
            if (!body.hasOwnProperty("data")) {
                return this.sendError(
                    403,
                    `Request method \`${method}\` requires field \`data\``
                );
            }

            if (!body.data.hasOwnProperty("type")) {
                return this.sendError(
                    403,
                    `Request method \`${method}\` must specify a \`type\``
                );
            }
        }

        return true;
    }

    validateType(req, resourceType) {
        let requestType = req.body.data.type;
        if (requestType !== resourceType) {
            return this.sendError(
                403,
                `Type \`${requestType}\` does not match resource type \`${resourceType}\``
            );
        }
        return true;
    }

    sendError(status, error) {
        this.res.status(status).send({
            error: error
        });
        return false;
    }
}
