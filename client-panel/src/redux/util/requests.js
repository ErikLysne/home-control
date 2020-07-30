import axios from "axios";
import { remoteActions } from "../remote";

export function get(extensions, getState, dispatch, callbackAction) {
    const state = getState();
    const { host, loadingTime } = state.config;

    let uri = `http://${host.ipAddr}:${host.port}`;
    extensions.forEach((extension) => {
        uri += `/${extension}`;
    });
    const config = {
        headers: {
            ...host.requestHeaders
        },
        data: {}
    };

    const timer = setTimeout(() => {
        dispatch(remoteActions.requestLoading());
    }, loadingTime);

    dispatch(remoteActions.requestSent());
    axios
        .get(uri, config)
        .then((result) => {
            clearTimeout(timer);
            dispatch(remoteActions.requestSucceeded());
            dispatch(callbackAction(result.data.data));
        })
        .catch((err) => {
            clearTimeout(timer);
            dispatch(remoteActions.requestFailed(err.error || err.message));
        });
}

export function put(extensions, data, getState, dispatch, callbackAction) {
    const state = getState();
    const { host, loadingTime } = state.config;

    let uri = `http://${host.ipAddr}:${host.port}`;
    extensions.forEach((extension) => {
        uri += `/${extension}`;
    });
    const config = {
        headers: {
            ...host.requestHeaders
        }
    };
    const requestData = {
        data: {
            ...data
        }
    };

    const timer = setTimeout(() => {
        dispatch(remoteActions.requestLoading());
    }, loadingTime);

    dispatch(remoteActions.requestSent());
    axios
        .put(uri, requestData, config)
        .then((result) => {
            clearTimeout(timer);
            dispatch(remoteActions.requestSucceeded());
            dispatch(callbackAction(result.data.data));
        })
        .catch((err) => {
            clearTimeout(timer);
            dispatch(remoteActions.requestFailed(err.error || err.message));
        });
}
