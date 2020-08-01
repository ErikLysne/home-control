import * as types from "./types";

export const servicesUpdated = (data) => ({
    type: types.SERVICES_UPDATED,
    payload: {
        services: data.services
    }
});
