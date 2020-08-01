import Router from "../base/router";

export default class ServiceRouter extends Router {
    registerRoutes() {
        const { registerCallback } = this.controller;
        const registerRoute = super.registerRoute.bind(this);

        registerRoute("/services", "get", registerCallback("getServices"));
    }
}
