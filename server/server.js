import ExpressApp from "./expressApp";
import routers from "./routers";
import connectToDb from "./connectToDb";

async function start() {
    await connectToDb();

    const app = new ExpressApp();

    routers.forEach((router) => {
        app.registerRouter(router);
    });

    app.run();
}

start();
