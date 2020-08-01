import ServiceRouter from "./serviceRouter";
import ServiceController from "./serviceController";
import ServiceRepository from "./serviceRepository";
import ServiceModel from "./serviceModel";
import ServiceRequestValidator from "./serviceRequestValidator";
import PhilipsHueLightsService from "../services/lights/providers/philips-hue";

const services = [PhilipsHueLightsService];

const serviceController = new ServiceController(
    services,
    ServiceRepository,
    ServiceModel,
    ServiceRequestValidator
);
serviceController.startServices();

const serviceRouter = new ServiceRouter(serviceController);
serviceRouter.registerRoutes();

export default serviceRouter;
