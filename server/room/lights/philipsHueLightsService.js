import LightsService from "./lightsService";
import hueApi from "node-hue-api";

export default class PhilipsHueLightsService extends LightsService {
    constructor(host, username, ...args) {
        super(...args);
        this.host = host;
        this.username = username;
        this.hue = hueApi.v3;
        this.user = undefined;
        this.LightState = this.hue.model.lightStates.GroupLightState;
    }

    async start() {
        return new Promise(async (resolve, reject) => {
            await this.hue.api
                .createLocal(this.host)
                .connect(this.username)
                .then((user) => {
                    super.started();
                    this.user = user;
                    resolve(true);
                })
                .catch((err) => reject(err));
        });
    }

    async getLights(name) {
        super.checkIfStarted();
        return new Promise(async (resolve, reject) => {
            await this.user.groups
                .getGroupByName(name)
                .then((lights) => {
                    if (lights.length > 0) {
                        return resolve(
                            new this.Model(lights[0].getHuePayload())
                        );
                    } else {
                        throw new Error(
                            `Light group \`${name}\` was not found`
                        );
                    }
                })
                .catch((err) => reject(err));
        });
    }

    async updateLights(name, params) {
        super.checkIfStarted();
        const state = new this.LightState();
        params.on !== undefined && state.on(params.on);
        params.bri !== undefined && state.bri(params.bri);
        params.hue !== undefined && state.hue(params.hue);
        params.sat !== undefined && state.sat(params.sat);
        params.effect !== undefined && state.effect(params.effect);
        params.ct !== undefined && state.ct(params.ct);
        params.alert !== undefined && state.alert(params.alert);

        return new Promise(async (resolve, reject) => {
            await this.getLights(name)
                .then(async (lights) => {
                    const { id } = lights;
                    return await this.user.groups.setGroupState(id, state);
                })
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
}
