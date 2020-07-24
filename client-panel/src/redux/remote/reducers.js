import * as types from "./types";

const initialState = {
    activeRequests: 0,
    pending: false,
    error: ""
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.REQUEST_SENT:
            return {
                ...state,
                activeRequests: state.activeRequests + 1,
                pending: true,
                error: ""
            };
        case types.REQUEST_SUCCEEDED:
            return {
                ...state,
                activeRequests: state.activeRequests - 1,
                pending: state.activeRequests - 1 === 0 ? false : true,
                error: ""
            };
        case types.REQUEST_FAILED:
            return {
                ...state,
                activeRequests: state.activeRequests - 1,
                pending: state.activeRequests - 1 === 0 ? false : true,
                error: payload.error
            };

        default:
            return state;
    }
};
