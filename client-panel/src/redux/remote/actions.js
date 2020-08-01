import * as types from "./types";

export const requestSent = () => ({
    type: types.REQUEST_SENT,
    payload: {}
});

export const requestLoading = () => ({
    type: types.REQUEST_LOADING,
    payload: {}
});

export const requestSucceeded = () => ({
    type: types.REQUEST_SUCCEEDED,
    payload: {}
});

export const requestFailed = (err) => ({
    type: types.REQUEST_FAILED,
    payload: {
        error: err
    }
});

export const serverPingSucceeded = () => ({
    type: types.SERVER_PING_SUCCEEDED,
    payload: {}
});

export const serverPingFailed = () => ({
    type: types.SERVER_PING_FAILED,
    payload: {}
});
