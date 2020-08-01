import * as actions from "./actions";
import { get } from "../util/requests";

export const serverPingRequested = () => {
    return (dispatch, getState) => {
        const extensions = ["services"];
        get(
            extensions,
            getState,
            dispatch,
            actions.serverPingSucceeded,
            actions.serverPingFailed
        );
    };
};
