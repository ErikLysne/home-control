import RouterBase from "../base/routerBase";

export default class RoomRouter extends RouterBase {
    registerRoutes() {
        const { makeCallback } = this.controller;
        const registerRoute = super.registerRoute.bind(this);

        registerRoute("/rooms", "get", makeCallback("getRooms"));
        registerRoute("/rooms", "post", makeCallback("postRoom"));
        registerRoute("/rooms", "delete", makeCallback("deleteRooms"));
        registerRoute("/rooms/:roomName", "get", makeCallback("getRoom"));
        registerRoute("/rooms/:roomName", "delete", makeCallback("deleteRoom"));
    }
}
