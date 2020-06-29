import ExpressApp from "./expressApp";
import routers from "./routers";
import connectToDb from "./connectToDb";

connectToDb();

const app = new ExpressApp();

routers.forEach((router) => {
    app.registerRouter(router);
});

app.run();
