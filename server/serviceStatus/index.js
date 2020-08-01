import ServiceStatusRouter from "./serviceStatusRouter";
import ServiceStatusController from "./serviceStatusController";
import ServiceStatusRepository from "./serviceStatusRepository";
import ServiceModel from "./serviceModel";
import ServiceStatusModel from "./serviceStatusModel";
import ServiceStatusRequestValidator from "./serviceStatusRequestValidator";
import PhilipsHueLightsService from "../services/lights/providers/philips-hue";

const services = [PhilipsHueLightsService];

const serviceStatusController = new ServiceStatusController(
    ServiceModel,
    services,
    ServiceStatusRepository,
    ServiceStatusModel,
    ServiceStatusRequestValidator
);
serviceStatusController.startServices();

const serviceStatusRouter = new ServiceStatusRouter(serviceStatusController);
serviceStatusRouter.registerRoutes();

export default serviceStatusRouter;
