import {Container, Sprite} from "pixi.js";
import { Engine } from "../engine/Engine";
import {UI_CANVAS_CONFIG} from "../config/globals";
import {handleBuildingPlaceClick} from "../handlers/ClickHandlers";
const {v4 : UUID} = require('uuid');

export const addBuildingPlaceToScene = (row: number, col: number, bpContainer: Container) => {
    const spriteID = UUID();
    const sprite = new Sprite(Engine.getConfigData().tileList[4].texture);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.name = spriteID;
    sprite.width = UI_CANVAS_CONFIG.size * 2;
    sprite.height = UI_CANVAS_CONFIG.size * 2;

    const position = {
        x: col * UI_CANVAS_CONFIG.size,
        y: row * UI_CANVAS_CONFIG.size
    }
    sprite.position = position;
    sprite.on('pointerdown', () => {
        if( Engine.getConfigData().addTowerMode) {
            Engine.removeBuildingPlace(spriteID)
        } else {
            handleBuildingPlaceClick(position);
        }
    })

    bpContainer.addChild(sprite);
}