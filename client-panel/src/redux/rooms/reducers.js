import * as types from "./types";

const initialState = {
    rooms: [
        {
            name: "",
            displayName: "",
            lights: {}
        }
    ]
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.ROOMS_UPDATED:
            return {
                ...state,
                rooms: payload.rooms.map((room) => ({
                    name: room.name,
                    displayName: room.displayName,
                    lights: room.lights
                }))
            };
        default:
            return state;
    }
};
