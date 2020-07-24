import * as types from "./types";

export const roomsUpdated = (data) => ({
    type: types.ROOMS_UPDATED,
    payload: {
        rooms: data
    }
});
