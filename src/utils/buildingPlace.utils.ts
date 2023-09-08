import {Container, Sprite} from "pixi.js";
import { Engine } from "../engine/Engine";
import {UI_CANVAS_CONFIG} from "../config/globals";
import {handleBuildingPlaceClick} from "../handlers/ClickHandlers";
import {BuildPlace} from "../entities/BuildPlace";
import {Point} from "./pathfinder";
const {v4 : UUID} = require('uuid');

export const addBuildingPlaceToScene = (position: Point, bp:BuildPlace, bpContainer: Container) => {
    const sprite = new Sprite(Engine.getConfigData().tileList[4].texture);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.name = bp.id;
    sprite.width = UI_CANVAS_CONFIG.size * 2;
    sprite.height = UI_CANVAS_CONFIG.size * 2;

    sprite.position = position;
    sprite.on('pointerdown', () => {
        if( Engine.getConfigData().addTowerMode) {
            Engine.removeBuildingPlace( bp.id)
        } else {
            handleBuildingPlaceClick({position, id: bp.id});
        }
    })

    bpContainer.addChild(sprite);
}