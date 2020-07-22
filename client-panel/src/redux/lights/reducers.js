import * as types from "./types";

const initialState = {
    remote: {
        pending: false,
        error: ""
    },
    meta: {
        provider: "",
        group: ""
    },
    resource: {
        action: {
            xy: [0, 0],
            on: false,
            hue: 0,
            saturation: 0,
            brightness: 0,
            colorTemp: 0,
            effect: "",
            alert: ""
        },
        lights: [],
        id: 1,
        name: "",
        state: {
            allOn: false,
            anyOn: false
        }
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.REQUEST_SENT:
            return {
                ...state,
                remote: {
                    pending: true,
                    error: ""
                }
            };
        case types.REQUEST_SUCCEEDED:
            return {
                ...state,
                remote: {
                    pending: false,
                    error: ""
                },
                meta: {
                    provider: payload.meta.provider,
                    group: payload.meta.group
                },
                resource: {
                    action: {
                        xy: payload.resource.action.xy,
                        on: payload.resource.action.on,
                        hue: payload.resource.action.hue,
                        saturation: payload.resource.action.sat,
                        brightness: payload.resource.action.bri,
                        colorTemp: payload.resource.action.ct,
                        effect: payload.resource.action.effect,
                        alert: payload.resource.action.alert
                    },
                    lights: payload.resource.lights,
                    id: payload.resource.id,
                    name: payload.resource.name,
                    state: {
                        allOn: payload.resource.state.all_on,
                        anyOn: payload.resource.state.any_on
                    }
                }
            };
        case types.REQUEST_FAILED:
            return {
                ...state,
                remote: {
                    pending: false,
                    error: payload.error
                }
            };
        default:
            return state;
    }
};
