import * as actions from "./actions";
import { get, put } from "../util/requests";

// FIX THIS
export const getLightsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { host } = state.config;
        const extensions = ["status"];
        get(host, extensions, dispatch, actions.lightsUpdated);
    };
};
