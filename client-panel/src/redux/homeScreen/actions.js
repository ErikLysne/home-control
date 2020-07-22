import * as types from "./types";

export const activationButtonPressed = (state) => ({
    type: types.ACTIVATION_BUTTON_PRESSED,
    payload: {
        state: state
    }
});
