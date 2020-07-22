import * as types from "./types";

const initialState = {
    activationButtonState: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.ACTIVATION_BUTTON_PRESSED:
            return { ...state, activationButtonState: payload.state };
        default:
            return state;
    }
};
