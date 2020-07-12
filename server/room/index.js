import RoomRouter from "./roomRouter";
import RoomController from "./roomController";
import RoomRepository from "./roomRepository";
import RoomModel from "./roomModel";

import PhilipsHueLightsService from "./lights/philipsHueLightsService";
import PhilipsHueGroupModel from "./lights/philipsHueGroupModel";

const services = [
    new PhilipsHueLightsService(
        "10.0.0.37",
        "BhCIqVJN4vkhlx6LKnSa8KD-1LnbKwKaNJNYxyt7",
        PhilipsHueGroupModel
    )
];

const roomController = new RoomController(services, RoomRepository, RoomModel);
roomController.startServices();

const roomRouter = new RoomRouter(roomController);
roomRouter.registerRoutes();

export default roomRouter;
