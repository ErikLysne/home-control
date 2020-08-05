import Controller from "../base/controller";

export default class HomeController extends Controller {
    constructor(...args) {
        super(...args);
        this.powerService = this.services.filter(
            (service) => service.type === "power-service"
        )[0];
    }

    async getHomes(req, res) {
        await super.getResources("home", req, res);
    }

    async postHome(req, res) {
        await super.postResource("home", req, res);
    }

    async deleteHomes(req, res) {
        await super.deleteResources("home", req, res);
    }

    async getHome(req, res) {
        await super.getResource("home", "name", req, res);
    }

    async updateHome(req, res) {
        await super.updateResource("home", "name", req, res);
    }

    async deleteHome(req, res) {
        await super.deleteResource("home", "name", req, res);
    }

    async getPower(req, res) {
        const type = "power";
        const { name } = req.params;
        const homes = await this.repository.find("name", name);
        if (homes.length > 0) {
            const homeObj = homes[0].toObject();
            if (typeof homeObj.power !== "undefined") {
                const result = await super.synchronizeService(
                    homeObj,
                    "name",
                    this.powerService
                );
                const response = result.power;
                response.type = type;
                this.responseHandler.resouceRetrieved(res, response);
            } else {
                this.responseHandler.requestProcessingError(
                    res,
                    `Home \`${name}\` does not have a power field`
                );
            }
        } else {
            this.responseHandler.resourceNotFoundError(res, name);
        }
    }
}
