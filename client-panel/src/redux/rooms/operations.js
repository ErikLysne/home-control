import * as actions from "./actions";
import { get } from "../util/requests";

export const getRoomsRequested = () => {
    return (dispatch, getState) => {
        const extensions = ["rooms"];
        get(extensions, getState, dispatch, actions.roomsUpdated);
    };
};
