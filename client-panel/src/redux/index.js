import { combineReducers } from "redux";
import config from "./config";
import homeScreen from "./homeScreen";
import lights from "./lights";

export default combineReducers({
    config,
    homeScreen,
    lights
});
