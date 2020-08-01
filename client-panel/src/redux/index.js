import { combineReducers } from "redux";
import config from "./config";
import remote from "./remote";
import services from "./services";
import rooms from "./rooms";
import lights from "./lights";
import theme from "./theme";

export default combineReducers({
    config,
    remote,
    services,
    rooms,
    lights,
    theme
});
