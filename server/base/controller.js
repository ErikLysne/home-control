import ResponseHandler from "./responseHandler";
import config from "config";
import chalk from "chalk";

export default class Controller {
    constructor(services, Repository, Model, RequestValidator) {
        this.type = null;
        this.services = services;
        this.repository = new Repository(Model);
        this.requestValidator = new RequestValidator();
        this.responseHandler = new ResponseHandler();
    }

    async startServices() {
        return new Promise(async (resolve, reject) => {
            Promise.all(
                this.services.map((service) =>
                    service
                        .start()
                        .then(() => {
                            console.log(
                                `Started service \`${getClassName(
                                    service
                                )}\` for controller \`${getClassName(this)}\``
                            );
                        })
                        .catch(() =>
                            console.log(
                                `Failed to start service \`${getClassName(
                                    service
                                )}\` for controller \`${getClassName(this)}\``
                            )
                        )
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
                    if (config.get("development.enableRequestErrorLogging")) {
                        console.log(chalk.red("Request error"));
                        console.error(err);
                    }
                    this.responseHandler.internalServerError(res, err);
                }
            }
        };
    }

    async getResources(type, req, res) {
        let resources = await this.repository.findAll();
        let synchronizedResources = [];
        for await (const resource of resources) {
            const resourceObj = resource.toObject();
            resourceObj.type = type;
            synchronizedResources.push(
                await this.synchronizeServices(resourceObj)
            );
        }
        this.responseHandler.resoucesRetrieved(res, synchronizedResources);
    }

    async postResource(type, req, res) {
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        const { data } = req.body;
        const resource = await this.repository.create(data);
        const resourceObj = resource.toObject();
        const result = await this.synchronizeServices(resourceObj);
        result.type = type;
        this.responseHandler.resourceCreated(res, result);
    }

    async deleteResources(type, req, res) {
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        let resources = await this.repository.findAll();
        let synchronizedResources = [];
        for await (const resource of resources) {
            const resourceObj = resource.toObject();
            const result = await this.synchronizeServices(resourceObj);
            result.type = type;
            synchronizedResources.push(result);
        }
        await this.repository.deleteAll();
        this.responseHandler.resourcesDeleted(res, synchronizedResources);
    }

    async getResource(type, criteria, req, res) {
        const resourceId = req.params[criteria];
        console.log(req.params);
        const resources = await this.repository.find(criteria, resourceId);
        if (resources.length > 0) {
            const resourceObj = resources[0].toObject();
            const result = await this.synchronizeServices(resourceObj);
            result.type = type;
            this.responseHandler.resouceRetrieved(res, result);
        } else {
            this.responseHandler.resourceNotFoundError(res, resourceId);
        }
    }

    async updateResource(type, criteria, req, res) {
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        const resourceId = req.params[criteria];
        const { body } = req;
        const resources = await this.repository.find(criteria, resourceId);
        if (resources.length > 0) {
            const resourceObj = resources[0].toObject();
            const updatedResource = { ...resourceObj, ...body.data };
            await this.repository.update(criteria, resourceId, updatedResource);
            const result = await this.synchronizeServices(updatedResource);
            result.type = type;
            this.responseHandler.resourceUpdated(res, result);
        } else {
            this.responseHandler.resourceNotFoundError(res, resourceId);
        }
    }

    async deleteResource(type, criteria, req, res) {
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        const resourceId = req.params[criteria];
        const resources = await this.repository.find(criteria, resourceId);
        if (resources.length > 0) {
            const resourceObj = resources[0].toObject();
            const result = await this.synchronizeServices(resourceObj);
            result.type = type;
            await this.repository.delete(criteria, resourceId);
            this.responseHandler.resourceDeleted(res, result);
        } else {
            this.responseHandler.resourceNotFoundError(res, resourceId);
        }
    }

    async synchronizeServices(resource, criteria) {
        let { _id, __v, updated, ...params } = resource;
        for await (const service of this.services) {
            await service.synchronize(params);
        }

        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        params.updated = new Date(Date.now() - timezoneOffset).toISOString();
        await this.repository.update(criteria, resource[criteria], params);

        return params;
    }

    async synchronizeService(resource, criteria, service) {
        let { _id, __v, updated, ...params } = resource;
        await service.synchronize(params);

        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        params.updated = new Date(Date.now() - timezoneOffset).toISOString();
        await this.repository.update(criteria, resource[criteria], params);

        return params;
    }
}

function getClassName(object) {
    const objContent = object.constructor.toString();
    const parsed = objContent.split("class");
    return parsed.length > 1 ? parsed[1].split(" ")[1] : "unknown";
}
