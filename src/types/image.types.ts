import {Texture} from "pixi.js";
import {SpriteSheetConfig} from "./types";

export enum ASSET_NAMES {
    TILE_MAP='TILE_MAP',
    UI='UI',
    OGRE='OGRE',
    TOWERS = 'TOWERS',
    BUILD_UI = 'BUILD_UI'
}

export type ImageMap = Record <ASSET_NAMES, any>
export type JSONConfig = Record <ASSET_NAMES, SpriteSheetConfig>
export type TextureMap = Record <ASSET_NAMES, Texture>