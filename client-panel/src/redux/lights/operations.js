import * as actions from "./actions";
import axios from "axios";

export const getLightsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { host, target } = state.config;

        dispatch(actions.requestSent());

        const config = {
            headers: {
                ...host.requestHeaders
            },
            data: {}
        };

        axios
            .get(
                `http://${host.ipAddr}:${host.port}/rooms/${target}/lights`,
                config
            )
            .then((result) =>
                dispatch(actions.requestSucceeded(result.data.data))
            )
            .catch((err) => dispatch(actions.requestFailed(err)));
    };
};

export const updateLightsRequested = ({ on }) => {
    return (dispatch, getState) => {
        const state = getState();
        const { host, target } = state.config;

        dispatch(actions.requestSent());

        const config = {
            headers: {
                ...host.requestHeaders
            }
        };

        const data = {
            data: {
                type: "lights",
                on: on
            }
        };

        axios
            .put(
                `http://${host.ipAddr}:${host.port}/rooms/${target}/lights`,
                data,
                config
            )
            .then((result) =>
                dispatch(actions.requestSucceeded(result.data.data))
            )
            .catch((err) => dispatch(actions.requestFailed(err)));
    };
};
