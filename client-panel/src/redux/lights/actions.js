import * as types from "./types";

export const requestSent = () => ({
    type: types.REQUEST_SENT
});

export const requestSucceeded = (result) => ({
    type: types.REQUEST_SUCCEEDED,
    payload: {
        meta: result.meta,
        resource: result.resource
    }
});

export const requestFailed = (err) => ({
    type: types.REQUEST_FAILED,
    payload: {
        error: err
    }
});
