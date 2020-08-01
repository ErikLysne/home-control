import Controller from "../base/controller";

export default class ServiceController extends Controller {
    constructor(...args) {
        super(...args);

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
        const servicesObj = services[0].toObject();
        servicesObj.type = type;
        super.resoucesRetrieved(res, servicesObj);
    }

    async synchronizeServices() {
        const services = [];
        await Promise.all(
            this.services.map(async (service) => {
                const serviceObj = {
                    type: service.type,
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
        servicesParams.services = services;
        await this.repository.updateAll(servicesParams);
    }
}
