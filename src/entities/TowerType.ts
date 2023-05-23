import {Container} from "pixi.js";
const {v4 : UUID} = require('uuid');

export class TowerType {
    container: Container;
    type: TowerType;
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