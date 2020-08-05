import HomeRouter from "./homeRouter";
import HomeController from "./homeController";
import HomeRepository from "./homeRepository";
import HomeModel from "./homeModel";
import HomeRequestValidator from "./homeRequestValidator";
import TibberPulsePowerService from "../services/power/providers/tibber-pulse";

const services = [TibberPulsePowerService];

const homeController = new HomeController(
    services,
    HomeRepository,
    HomeModel,
    HomeRequestValidator
);

const homeRouter = new HomeRouter(homeController);
homeRouter.registerRoutes();

export default homeRouter;
