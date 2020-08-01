import Repository from "../base/repository";
import ServiceModel from "./serviceModel";

export default class ServiceRepository extends Repository {
    constructor() {
        super(ServiceModel);
    }
}
