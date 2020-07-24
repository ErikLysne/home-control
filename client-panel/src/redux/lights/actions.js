import * as types from "./types";

export const lightsUpdated = (data) => ({
    type: types.LIGHTS_UPDATED,
    payload: {
        meta: data.meta,
        resource: data.resource
    }
});
