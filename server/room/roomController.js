import Controller from "../base/controller";

export default class RoomController extends Controller {
    constructor(...args) {
        super(...args);
        this.lightsService = this.services.filter(
            (service) => service.type === "lights-service"
        )[0];
    }

    async getRooms(req, res) {
        await super.getResources("room", req, res);
    }

    async postRoom(req, res) {
        await super.postResource("room", req, res);
    }

    async deleteRooms(req, res) {
        await super.deleteResources("room", req, res);
    }

    async getRoom(req, res) {
        await super.getResource("room", "name", req, res);
    }

    async updateRoom(req, res) {
        await super.updateResource("room", "name", req, res);
    }

    async deleteRoom(req, res) {
        await super.deleteResource("room", "name", req, res);
    }

    async getLights(req, res) {
        const type = "lights";
        const { name } = req.params;
        const rooms = await this.repository.find("name", name);
        if (rooms.length > 0) {
            const roomObj = rooms[0].toObject();
            const group =
                typeof roomObj.lights !== "undefined" &&
                typeof roomObj.lights.meta !== "undefined" &&
                roomObj.lights.meta.group;
            if (group) {
                const result = await super.synchronizeService(
                    roomObj,
                    "name",
                    this.lightsService
                );
                const response = result.lights;
                response.type = type;
                this.responseHandler.resouceRetrieved(res, response);
            } else {
                this.responseHandler.requestProcessingError(
                    res,
                    `Room \`${name}\` does not have an assigned light group`
                );
            }
        } else {
            this.responseHandler.resourceNotFoundError(res, name);
        }
    }

    async updateLights(req, res) {
        const type = "lights";
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        const { name } = req.params;
        const lightParams = req.body;
        const rooms = await this.repository.find("name", name);
        if (rooms.length > 0) {
            const roomObj = rooms[0].toObject();
            const group =
                typeof roomObj.lights !== "undefined" &&
                typeof roomObj.lights.meta !== "undefined" &&
                roomObj.lights.meta.group;
            if (group) {
                await this.lightsService.updateLights(group, lightParams.data);
                const result = await super.synchronizeService(
                    roomObj,
                    "name",
                    this.lightsService
                );
                const response = result.lights;
                response.type = type;
                this.responseHandler.resouceRetrieved(res, response);
            } else {
                this.responseHandler.requestProcessingError(
                    res,
                    `Room \`${name}\` does not have an assigned light group`
                );
            }
        } else {
            this.responseHandler.resourceNotFoundError(res, name);
        }
    }
}
