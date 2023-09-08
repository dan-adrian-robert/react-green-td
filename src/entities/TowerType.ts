import {Container} from "pixi.js";
import {TowerTypes} from "../config/tower.config";
const {v4 : UUID} = require('uuid');

export class TowerType {
    container: Container;
    type: TowerTypes;
    name: string;
    price: number;
    containerId: string;

    constructor(config: any) {
        const { data } = config;
        const {price, name, type, container} = data;

        this.containerId = UUID();
        this.type = type;
        this.name = name;
        this.price = price;
        this.container = container;
        this.container.name = this.containerId;
    }
}