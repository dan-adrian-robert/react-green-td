import {Point} from "../utils/pathfinder";
const {v4 : UUID} = require('uuid');

export class BuildPlace {
    pos: Point;
    id: string;

    constructor(pos: Point) {
        this.pos = pos;
        this.id = UUID();
    }
}

