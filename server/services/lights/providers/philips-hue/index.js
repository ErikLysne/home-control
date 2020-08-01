import PhilipsHueLightsService from "./philipsHueLightsService";
import PhilipsHueGroupModel from "./philipsHueGroupModel";

const lightsService = new PhilipsHueLightsService(
    "10.0.0.37",
    "BhCIqVJN4vkhlx6LKnSa8KD-1LnbKwKaNJNYxyt7",
    PhilipsHueGroupModel
);

export { PhilipsHueGroupModel };
export default lightsService;
