import ControllerBase from "../base/controllerBase";

export default class RoomController extends ControllerBase {
    async getRooms(req, res) {
        const rooms = await this.repository.findAll();
        super.success(res, rooms);
    }

    async postRoom(req, res) {
        const { body } = req;
        const result = await this.repository.createOne(body);
        super.success(res, { success: result });
    }

    async deleteRooms(req, res) {
        const result = await this.repository.deleteAll();
        super.success(res, { success: result });
    }

    async getRoom(req, res) {
        const { roomName } = req.params;
        const room = await this.repository.findByProp("name", roomName);
        if (room.length > 0) {
            super.success(res, room[0]);
        } else {
            super.notFound(res, roomName);
        }
    }

    async deleteRoom(req, res) {
        const { roomName } = req.params;
        const exists = await this.repository.findByProp("name", roomName);
        if (exists) {
            const result = await this.repository.deleteByProp("name", roomName);
            super.success(res, { success: result });
        } else {
            super.notFound(res, roomName);
        }
    }
}
