import * as actions from "./actions";
import { get, put } from "../util/requests";

export const getLightsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { host, target } = state.config;
        const extensions = ["rooms", target, "lights"];
        get(host, extensions, dispatch, actions.lightsUpdated);
    };
};

export const updateLightsRequested = ({ on }) => {
    return (dispatch, getState) => {
        const state = getState();
        const { host, target } = state.config;
        const extensions = ["rooms", target, "lights"];
        const data = {
            type: "lights",
            on: on
        };
        put(host, extensions, data, dispatch, actions.lightsUpdated);
    };
};
