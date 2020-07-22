import Repository from "../base/repository";
import RoomModel from "./roomModel";

export default class RoomRepository extends Repository {
    constructor() {
        super(RoomModel);
    }
}
