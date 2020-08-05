import Router from "../base/router";

export default class HomeRouter extends Router {
    registerRoutes() {
        const { registerCallback } = this.controller;
        const registerRoute = super.registerRoute.bind(this);

        registerRoute("/homes", "get", registerCallback("getHomes"));
        registerRoute("/homes", "post", registerCallback("postHome"));
        registerRoute("/homes", "delete", registerCallback("deleteHomes"));
        registerRoute("/homes/:name", "get", registerCallback("getHome"));
        registerRoute("/homes/:name", "put", registerCallback("updateHome"));
        registerRoute("/homes/:name", "delete", registerCallback("deleteHome"));
        registerRoute("/homes/:name/power", "get", registerCallback("getPower"));
        registerRoute("/homes/:name/power", "put", registerCallback("updatePower"));
    }
}
