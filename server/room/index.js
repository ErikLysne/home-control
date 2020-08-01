import RoomRouter from "./roomRouter";
import RoomController from "./roomController";
import RoomRepository from "./roomRepository";
import RoomModel from "./roomModel";
import RoomRequestValidator from "./roomRequestValidator";
import PhilipsHueLightsService from "../services/lights/providers/philips-hue";

const services = [PhilipsHueLightsService];

const roomController = new RoomController(
    services,
    RoomRepository,
    RoomModel,
    RoomRequestValidator
);
roomController.startServices();

const roomRouter = new RoomRouter(roomController);
roomRouter.registerRoutes();

export default roomRouter;
