import * as themes from "../themes";

const initialState = {
    active: "deepBlue",
    theme: themes["deepBlue"]
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
};
