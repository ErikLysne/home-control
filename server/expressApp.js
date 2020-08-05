import config from "config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const morgan = require("morgan");

export default class ExpressApp {
    constructor() {
        this.port = config.get("api.port");
        this.host = config.get("api.host");
        this.express = express();
        this.routers = [];

        // Build middleware stack
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(
            morgan(
                `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version :req[content-type]" :status ":referrer"`
            )
        );
    }

    registerRouter(router) {
        this.routers.push(router);
    }

    async run() {
        // Add all registered routes
        const expressRouter = express.Router();
        this.routers.forEach((router) => {
            router.routes.forEach((registeredRoute) => {
                const { route, httpMethod, callback } = registeredRoute;
                expressRouter.route(route)[httpMethod](callback);
                console.log(
                    `Added route: ${httpMethod.toUpperCase()} ${route}`
                );
            });
        });
        this.express.use(expressRouter);

        // Default fallback
        this.express.use((req, res) => {
            res.status(404).send({
                error: `Method ${req.method} not defined for route ${req.originalUrl}`
            });
        });

        // Start controllers
        for await (const router of this.routers) {
            await router.startController();
        }

        // Start server
        this.express.listen(this.port, this.host);
        console.log(`Listening on ${this.host}:${this.port}`);
    }
}
