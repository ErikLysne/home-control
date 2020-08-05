import Router from "../base/router";

export default class RoomRouter extends Router {
    registerRoutes() {
        const { registerCallback } = this.controller;
        const registerRoute = super.registerRoute.bind(this);

        registerRoute("/rooms", "get", registerCallback("getRooms"));
        registerRoute("/rooms", "post", registerCallback("postRoom"));
        registerRoute("/rooms", "delete", registerCallback("deleteRooms"));
        registerRoute("/rooms/:name", "get", registerCallback("getRoom"));
        registerRoute("/rooms/:name", "put", registerCallback("updateRoom"));
        registerRoute("/rooms/:name", "delete", registerCallback("deleteRoom"));
        registerRoute("/rooms/:name/lights", "get", registerCallback("getLights"));
        registerRoute("/rooms/:name/lights", "put", registerCallback("updateLights"));
    }
}
