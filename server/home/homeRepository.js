import Repository from "../base/repository";
import HomeModel from "./homeModel";

export default class HomeRepository extends Repository {
    constructor() {
        super(HomeModel);
    }
}
