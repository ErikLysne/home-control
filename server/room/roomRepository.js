import RepositoryBase from "../base/repositoryBase";
import RoomModel from "./roomModel";

export default class RoomRepository extends RepositoryBase {
    constructor() {
        super(RoomModel);
    }
}
