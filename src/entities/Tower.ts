import {Container} from "pixi.js";
import {TowerTypes} from "../config/tower.config";
const {v4 : UUID} = require('uuid');

export class Tower {
    // container: Container;
    type: TowerTypes;
    id: string;

    constructor(container: Container, type: TowerTypes) {
        this.type = type;
        this.id = UUID();
    }

}

