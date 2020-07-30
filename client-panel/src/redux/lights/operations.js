import * as actions from "./actions";
import { get, put } from "../util/requests";

export const getLightsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { target } = state.config;
        const extensions = ["rooms", target, "lights"];
        get(extensions, getState, dispatch, actions.lightsUpdated);
    };
};

export const updateLightsRequested = ({ on }) => {
    return (dispatch, getState) => {
        const state = getState();
        const { target } = state.config;
        const extensions = ["rooms", target, "lights"];
        const data = {
            type: "lights",
            on: on
        };
        put(extensions, data, getState, dispatch, actions.lightsUpdated);
    };
};
