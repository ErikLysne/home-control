import * as types from "./types";

const initialState = {
    online: false,
    activeRequests: 0,
    pending: false,
    loading: false,
    error: "",
    previousSuccessful: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.REQUEST_SENT:
            return {
                ...state,
                activeRequests: state.activeRequests + 1,
                pending: true,
                loading: false,
                error: ""
            };
        case types.REQUEST_LOADING:
            return {
                ...state,
                loading: true
            };
        case types.REQUEST_SUCCEEDED:
            return {
                ...state,
                activeRequests: state.activeRequests - 1,
                pending: state.activeRequests - 1 === 0 ? false : true,
                loading: state.activeRequests - 1 === 0 ? false : true,
                error: "",
                previousSuccessful: true
            };
        case types.REQUEST_FAILED:
            return {
                ...state,
                activeRequests: state.activeRequests - 1,
                pending: state.activeRequests - 1 === 0 ? false : true,
                loading: state.activeRequests - 1 === 0 ? false : true,
                error: payload.error,
                previousSuccessful: false
            };
        case types.SERVER_PING_SUCCEEDED:
            return {
                ...state,
                online: true
            };
        case types.SERVER_PING_FAILED:
            return {
                ...state,
                online: false
            };
        default:
            return state;
    }
};
