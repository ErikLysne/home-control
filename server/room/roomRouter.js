import Router from "../base/router";

export default class RoomRouter extends Router {
    registerRoutes() {
        const { registerCallback } = this.controller;
        const registerRoute = super.registerRoute.bind(this);

        registerRoute("/rooms", "get", registerCallback("getRooms"));
        registerRoute("/rooms", "post", registerCallback("postRoom"));
        registerRoute("/rooms", "delete", registerCallback("deleteRooms"));
        registerRoute("/rooms/:roomName", "get", registerCallback("getRoom"));
        registerRoute("/rooms/:roomName", "put", registerCallback("updateRoom"));
        registerRoute("/rooms/:roomName", "delete", registerCallback("deleteRoom"));
        registerRoute("/rooms/:roomName/lights", "get", registerCallback("getLights"));
        registerRoute("/rooms/:roomName/lights", "put", registerCallback("updateLights"));
    }
}
