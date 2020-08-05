import Controller from "../base/controller";

export default class HomeController extends Controller {
    constructor(...args) {
        super(...args);
        this.powerService = this.services.filter(
            (service) => service.type === "power-service"
        )[0];
    }

    async getHome(req, res) {
        const type = "home";
        let homes = await this.repository.findAll();
        let synchronizedHomes = [];
        for await (const home of homes) {
            const 
        }
    }
}
