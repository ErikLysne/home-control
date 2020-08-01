import Controller from "../base/controller";

export default class RoomController extends Controller {
    constructor(...args) {
        super(...args);
        this.lightsService = this.services.filter(
            (service) => service.type === "lights-service"
        )[0];
    }

    async getRooms(req, res) {
        const type = "room";
        let rooms = await this.repository.findAll();
        let synchronizedRooms = [];
        for await (const room of rooms) {
            const roomObj = room.toObject();
            roomObj.type = type;
            synchronizedRooms.push(await this.synchronizeServices(roomObj));
        }
        super.resoucesRetrieved(res, synchronizedRooms);
    }

    async deleteRooms(req, res) {
        const type = "room";
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        let rooms = await this.repository.findAll();
        let synchronizedRooms = [];
        for await (const room of rooms) {
            const roomObj = room.toObject();
            const result = await this.synchronizeServices(roomObj);
            result.type = type;
            synchronizedRooms.push(result);
        }
        await this.repository.deleteAll();
        super.resourcesDeleted(res, synchronizedRooms);
    }

    async postRoom(req, res) {
        const type = "room";
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        const { data } = req.body;
        const room = await this.repository.create(data);
        const roomObj = room.toObject();
        const result = await this.synchronizeServices(roomObj);
        result.type = type;
        super.resourceCreated(res, result);
    }

    async getRoom(req, res) {
        const type = "room";
        const { roomName } = req.params;
        const rooms = await this.repository.find("name", roomName);
        if (rooms.length > 0) {
            const roomObj = rooms[0].toObject();
            const result = await this.synchronizeServices(roomObj);
            result.type = type;
            super.resouceRetrieved(res, result);
        } else {
            super.resourceNotFoundError(res, roomName);
        }
    }

    async updateRoom(req, res) {
        const type = "room";
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        const { roomName } = req.params;
        const { body } = req;
        const rooms = await this.repository.find("name", roomName);
        if (rooms.length > 0) {
            const roomObj = rooms[0].toObject();
            const updatedRoom = { ...roomObj, ...body.data };
            await this.repository.update("name", roomName, updatedRoom);
            const result = await this.synchronizeServices(updatedRoom);
            result.type = type;
            super.resourceUpdated(res, result);
        } else {
            super.resourceNotFoundError(res, roomName);
        }
    }

    async deleteRoom(req, res) {
        const type = "room";
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        const { roomName } = req.params;
        const rooms = await this.repository.find("name", roomName);
        if (rooms.length > 0) {
            const roomObj = rooms[0].toObject();
            const result = await this.synchronizeServices(roomObj);
            result.type = type;
            await this.repository.delete("name", roomName);
            super.resourceDeleted(res, result);
        } else {
            super.resourceNotFoundError(res, roomName);
        }
    }

    async getLights(req, res) {
        const type = "lights";
        const { roomName } = req.params;
        const rooms = await this.repository.find("name", roomName);
        if (rooms.length > 0) {
            const roomObj = rooms[0].toObject();
            const group =
                roomObj.lights !== "undefined" &&
                roomObj.lights.meta !== "undefined" &&
                roomObj.lights.meta.group;
            if (typeof group !== "undefined") {
                const result = await this.synchronizeService(
                    roomObj,
                    this.lightsService
                );
                const response = result.lights;
                response.type = type;
                super.resouceRetrieved(res, response);
            } else {
                super.requestProcessingError(
                    res,
                    `Room \`${roomName}\` does not have an assigned light group`
                );
            }
        } else {
            super.resourceNotFoundError(res, roomName);
        }
    }

    async updateLights(req, res) {
        const type = "lights";
        if (!this.requestValidator.validateType(req, type)) {
            return;
        }

        const { roomName } = req.params;
        const lightParams = req.body;
        const rooms = await this.repository.find("name", roomName);
        if (rooms.length > 0) {
            const roomObj = rooms[0].toObject();
            const group =
                roomObj.lights !== "undefined" &&
                roomObj.lights.meta !== "undefined" &&
                roomObj.lights.meta.group;
            if (typeof group !== "undefined") {
                await this.lightsService.updateLights(group, lightParams.data);
                const result = await this.synchronizeService(
                    roomObj,
                    this.lightsService
                );
                const response = result.lights;
                response.type = type;
                super.resouceRetrieved(res, response);
            } else {
                super.requestProcessingError(
                    res,
                    `Room \`${roomName}\` does not have an assigned light group`
                );
            }
        } else {
            super.resourceNotFoundError(res, roomName);
        }
    }

    async synchronizeServices(room) {
        let { _id, __v, updated, ...roomParams } = room;
        for await (const service of this.services) {
            await service.synchronize(roomParams);
        }

        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        roomParams.updated = new Date(
            Date.now() - timezoneOffset
        ).toISOString();
        await this.repository.update("name", room.name, roomParams);

        return roomParams;
    }

    async synchronizeService(room, service) {
        let { _id, __v, updated, ...roomParams } = room;
        await service.synchronize(roomParams);

        const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        roomParams.updated = new Date(
            Date.now() - timezoneOffset
        ).toISOString();
        await this.repository.update("name", room.name, roomParams);

        return roomParams;
    }
}
