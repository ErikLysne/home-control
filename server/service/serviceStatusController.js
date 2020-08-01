import Controller from "../base/controller";

export default class ServiceStatusController extends Controller {
    constructor(ServiceModel, ...args) {
        super(...args);
        this.ServiceModel = ServiceModel;
        this.repository.findAll().then((result) => {
            if (result.length === 0) {
                this.repository.create({ services: [] });
            }
        });
    }

    async getServices(req, res) {
        const type = "services";
        await this.synchronizeServices();
        const services = await this.repository.findAll();
        const { _id, __v, ...servicesObj } = services[0].toObject();
        const servicesParams = servicesObj.services.map((service) => {
            let { _id, __v, ...params } = service;
            return params;
        });
        servicesObj.services = servicesParams;
        servicesObj.type = type;
        super.resoucesRetrieved(res, servicesObj);
    }

    async synchronizeServices() {
        const services = [];
        await Promise.all(
            this.services.map(async (service) => {
                const serviceObj = {
                    type: service.type,
                    displayName: service.displayName,
                    status: "offline",
                    config: {}
                };
                await service
                    .getStatus()
                    .then((config) => {
                        serviceObj.status = "online";
                        serviceObj.config = config;
                    })
                    .catch(() => {
                        serviceObj.status = "offline";
                        serviceObj.config = {};
                    });
                services.push(serviceObj);
            })
        );
        const servicesParams = {};
        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        servicesParams.updated = new Date(
            Date.now() - timezoneOffset
        ).toISOString();
        const serviceModels = services.map(
            (service) => new this.ServiceModel(service)
        );
        servicesParams.services = serviceModels;
        await this.repository.updateAll(servicesParams);
    }
}
