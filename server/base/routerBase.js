export default class RouterBase {
    constructor(Controller, Repository, Model) {
        this.controller = new Controller(Repository, Model);
        this.registeredRoutes = [];
    }

    registerRoutes() {
        throw new Error(`Not implemented in derived class`);
    }

    registerRoute(route, httpMethod, callback) {
        this.registeredRoutes.push({
            route: route,
            httpMethod: httpMethod,
            callback: callback.bind(this.controller),
        });
    }

    get routes() {
        return this.registeredRoutes;
    }
}
