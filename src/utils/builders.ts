import {getSpriteNames} from "./parser";
import {ConfigMap} from "../Images";
import {Sprite, Texture} from "pixi.js";
import {Engine} from "../engine/Engine";
import {UI_CANVAS_CONFIG} from "../config/globals";
import {SpriteSheetConfig} from "../types/types";
import {ASSET_NAMES} from "../types/image.types";
import {ANIMATION_CONFIG_RECORD, MOB_TYPE} from "../types/mobs.types";
import {MOB_CONFIG} from "../config/mob.config";

export const BuildSpecialGui = (): { specialBoxList: Array<Sprite>, selectedSpecialSprite: Sprite} => {
    const size = UI_CANVAS_CONFIG.size;
    const boxNameList: Array<string> = getSpriteNames(ConfigMap.UI);

    const boxTextureList: Array<Texture> = boxNameList.map((spriteName) => Engine.getTextureMap()['UI'][spriteName]);
    const specialBoxList: Array<Sprite> = boxTextureList.map((texture: Texture) => Sprite.from(texture));
    specialBoxList.pop();

    specialBoxList.map((sprite: Sprite, index: number) => {
        sprite.width = size;
        sprite.height = size;
        sprite.position = {x: size * index + UI_CANVAS_CONFIG.gap * (index + 1), y: size + 3 * UI_CANVAS_CONFIG.gap}
        sprite.interactive = true;
        sprite.buttonMode = true;

        sprite.on('pointerdown', (event) => {
            Engine.changeSpecialFrameIndex(index);
        })
        Engine.getConfigApp().stage.addChild(sprite);
        return sprite;
    })

    const SELECT_TILE_INDEX = 2;
    const uiTextureList: Array<Texture> = boxNameList.map((spriteName) => Engine.getTextureMap()['UI'][spriteName]);
    const selectedSpecialSprite = Sprite.from(uiTextureList[SELECT_TILE_INDEX]);
    selectedSpecialSprite.position = {
        x: UI_CANVAS_CONFIG.gap / 2 ,
        y: size + 5 * UI_CANVAS_CONFIG.gap / 2
    };

    return {
        specialBoxList,
        selectedSpecialSprite,
    };
}

export const BuildTileMap = (): { spriteList: Array<Sprite>, selectSprite: Sprite} => {
    const size = UI_CANVAS_CONFIG.size;
    const spriteNameList: Array<string> = getSpriteNames(ConfigMap.TILE_MAP);
    const textureList: Array<Texture> = spriteNameList.map((spriteName) => Engine.getTextureMap()[ASSET_NAMES.TILE_MAP][spriteName]);
    const spriteList: Array<Sprite> = textureList.map((texture: Texture) => Sprite.from(texture));

    spriteList.map((sprite, index: number) => {
        sprite.width = size;
        sprite.height = size;
        sprite.position = {x: size * index + UI_CANVAS_CONFIG.gap * (index + 1), y: UI_CANVAS_CONFIG.gap}
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on('pointerdown', (event) => {
            Engine.changeFrameIndex(index);
        })

        Engine.getConfigApp().stage.addChild(sprite);
        return sprite;
    })

    const uiNameList: Array<string> = getSpriteNames(ConfigMap.UI);
    const uiTextureList: Array<Texture> = uiNameList.map((spriteName) => Engine.getTextureMap()[ASSET_NAMES.UI][spriteName]);
    const SELECT_TILE_INDEX = 2;
    const selectSprite = Sprite.from(uiTextureList[SELECT_TILE_INDEX]);

    selectSprite.position = {x:UI_CANVAS_CONFIG.gap / 2 , y:UI_CANVAS_CONFIG.gap/2 }

    return {
        spriteList,
        selectSprite
    }
}

export const BuildMobTextureMap = (config: SpriteSheetConfig, name: ASSET_NAMES): Record<string, Array<Texture>> => {
    const keys: Array<string> = Object.keys(config.animations);
    const result: Record<string, Array<any>> = {};

    const textureMap = Engine.getTextureMap()[name];

    keys.map((key) => {
        result[key] = [];
        const animationList: Array<string> = config.animations[key];
        animationList.map((animation: string) => {
            const name = animation.split('.')[0];
            result[key].push(textureMap[name]);
            return null;
        })
        return null
    })

    return result;
}

export const getMobSystemConfig = (type:MOB_TYPE): ANIMATION_CONFIG_RECORD => {
    return MOB_CONFIG[type];
}