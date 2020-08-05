export default class ResponseHandler {
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
