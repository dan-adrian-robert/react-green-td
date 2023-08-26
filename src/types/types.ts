import { Sprite } from "pixi.js";

export interface TextureConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    name: string,
}

export type SpriteSheetConfig = {
    frames: Record<string, FrameConfig>,
    animations: Record<string, Array<string>>,
    meta: any,
}

export type FrameConfig = {
    frame: {
        x: number,
        y: number,
        w: number,
        h: number
    },
    rotated: boolean,
    trimmed: boolean,
    spriteSourceSize:{
        x: number,
        y: number,
        w: number,
        h: number
    },
    sourceSize: {
        w: number,
        h: number
    },
    anchor:{
        x: number,
        y: number,
    },
}

export type ConfigUiData = {
    selectedItem : number,
    boxSelectedItem: number,
    tileList: Array<Sprite>,
    specialBoxList: Array<Sprite>,
    selectFrame: Sprite,
    boxSelectFrame: Sprite,
    drawMode: boolean,
    insertMode: boolean,
    addTowerMode: boolean,
    addTowerPlaceMode: boolean,
}

export type Tile = {
    sprite: Sprite,
    walkable: boolean,
    textureIndex: number,
}

export type TileLight = {
    w: number,
    t: number
}

export enum LAYER_NAMES {
    'EnemyContainer' = 'EnemyContainer',
    'MapContainer' = 'MapContainer',
    'MapPathContainer' = 'MapPathContainer',
    'GameContainer' = 'GameContainer',
    'EditContainer' = 'EditContainer',
    'TowerPlaceContainer' = 'TowerPlaceContainer',
    'BuildUI' = 'BuildUI'
}

export type GameLayerMap = {
    [key in LAYER_NAMES]: number
}
