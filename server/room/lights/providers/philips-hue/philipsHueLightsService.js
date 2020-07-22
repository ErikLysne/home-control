import LightsService from "../../lightsService";
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

    async getLights(group) {
        super.checkIfStarted();
        return new Promise(async (resolve, reject) => {
            await this.user.groups
                .getGroupByName(group)
                .then((lights) => {
                    if (lights.length > 0) {
                        const lightsModel = new this.Model(
                            lights[0].getHuePayload()
                        );
                        const { _id, ...lightParams } = lightsModel.toObject();
                        return resolve(lightParams);
                    } else {
                        throw new Error(
                            `Light group \`${group}\` was not found`
                        );
                    }
                })
                .catch((err) => reject(err));
        });
    }

    async updateLights(group, params) {
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
            await this.getLights(group)
                .then(async (lights) => {
                    const { id } = lights;
                    return await this.user.groups.setGroupState(id, state);
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => reject(err));
        });
    }

    async synchronize(room) {
        const group =
            room.lights !== "undefined" &&
            room.lights.meta !== "undefined" &&
            room.lights.meta.group;
        if (typeof group !== "undefined") {
            const lights = await this.getLights(room.lights.meta.group);
            const { _id, ...lightParams } = lights;
            room.lights.resource = lightParams;
        }
    }
}
