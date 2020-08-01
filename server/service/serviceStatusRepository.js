import Repository from "../base/repository";
import ServiceStatusModel from "./serviceStatusModel";

export default class ServiceStatusRepository extends Repository {
    constructor() {
        super(ServiceStatusModel);
    }
}
