import * as types from "./types";

const initialState = {
    services: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SERVICES_UPDATED:
            return {
                ...state,
                services: payload.services
            };
        default:
            return state;
    }
};
