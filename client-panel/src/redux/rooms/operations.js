import * as actions from "./actions";
import { get } from "../util/requests";

export const getRoomsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { host } = state.config;
        const extensions = ["rooms"];
        get(host, extensions, dispatch, actions.roomsUpdated);
    };
};
