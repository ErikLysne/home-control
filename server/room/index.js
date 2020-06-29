import RoomRouter from "./roomRouter";
import RoomController from "./roomController";
import RoomRepository from "./roomRepository";
import RoomModel from "./roomModel";

const roomRouter = new RoomRouter(RoomController, RoomRepository, RoomModel);
roomRouter.registerRoutes();

export default roomRouter;
