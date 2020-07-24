import axios from "axios";
import { remoteActions } from "../remote";

export function get(host, extensions, dispatch, callbackAction) {
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

    dispatch(remoteActions.requestSent());
    axios
        .get(uri, config)
        .then((result) => {
            dispatch(remoteActions.requestSucceeded());
            dispatch(callbackAction(result.data.data));
        })
        .catch((err) => dispatch(remoteActions.requestFailed(err)));
}

export function put(host, extensions, data, dispatch, callbackAction) {
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

    dispatch(remoteActions.requestSent());
    axios
        .put(uri, requestData, config)
        .then((result) => {
            dispatch(remoteActions.requestSucceeded());
            dispatch(callbackAction(result.data.data));
        })
        .catch((err) => dispatch(remoteActions.requestFailed(err)));
}
