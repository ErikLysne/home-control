import ControllerBase from "../base/controllerBase";
import LightsService from "./lights/lightsService";

export default class RoomController extends ControllerBase {
    constructor(...args) {
        super(...args);
        this.lights = this.services.filter(
            (service) => service instanceof LightsService
        )[0];
    }

    async getRooms(req, res) {
        let rooms = await this.repository.findAll();
        for (const room of rooms) {
            if (room.lights && room.lights.group) {
                const lights = await this.lights.getLights(room.lights.group);
                await this.repository.update("name", room.name, {
                    $set: { "lights.resource": lights }
                });
            }
        }
        rooms = await this.repository.findAll();
        super.success(res, rooms);
    }

    async deleteRooms(req, res) {
        const result = await this.repository.deleteAll();
        super.success(res, { success: result });
    }

    async postRoom(req, res) {
        const { body } = req;
        const result = await this.repository.create(body);
        super.success(res, { success: result });
    }

    async getRoom(req, res) {
        const { roomName } = req.params;
        const rooms = await this.repository.find("name", roomName);
        if (rooms.length > 0) {
            super.success(res, rooms[0]);
        } else {
            super.notFound(res, roomName);
        }
    }

    async updateRoom(req, res) {
        const { roomName } = req.params;
        const { body } = req;
        const exists = await this.repository.find("name", roomName);
        if (exists) {
            const result = await this.repository.update("name", roomName, body);
            super.success(res, { success: result });
        } else {
            super.notFound(res, roomName);
        }
    }

    async deleteRoom(req, res) {
        const { roomName } = req.params;
        const exists = await this.repository.find("name", roomName);
        if (exists) {
            const result = await this.repository.delete("name", roomName);
            super.success(res, { success: result });
        } else {
            super.notFound(res, roomName);
        }
    }

    async getLights(req, res) {
        const { roomName } = req.params;
        const rooms = await this.repository.find("name", roomName);

        if (rooms.length > 0) {
            const room = rooms[0];

            if (!(room.lights && room.lights.group)) {
                throw new Error(
                    `Room \`${roomName}\` does not have an assigned light group`
                );
            }

            const lights = await this.lights.getLights(room.lights.group);
            super.success(res, lights);
            await this.repository.update("name", roomName, {
                $set: { "lights.resource": lights }
            });
        } else {
            super.notFound(res, roomName);
        }
    }

    async updateLights(req, res) {
        const { roomName } = req.params;
        const lightParams = req.body;
        const rooms = await this.repository.find("name", roomName);

        if (rooms.length > 0) {
            const room = rooms[0];

            if (!(room.lights && room.lights.group)) {
                throw new Error(
                    `Room \`${roomName}\` does not have an assigned light group`
                );
            }

            await this.lights.updateLights(room.lights.group, lightParams);
            const lights = await this.lights.getLights(room.lights.group);
            super.success(res, lights);
            await this.repository.update("name", roomName, {
                $set: { "lights.resource": lights }
            });
        } else {
            super.notFound(res, roomName);
        }
    }
}
