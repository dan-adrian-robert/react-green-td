import * as PIXI from 'pixi.js'
import {SpriteSheetConfig, TextureConfig} from "../types/types";

export const getSpriteSheetConfig = (config: any): Array<TextureConfig> => {
    if (!config.frames) {
        console.log('Invalid config');
        return [];
    }

    const keys = Object.keys(config.frames);
    const result: Array<any> = [];

    keys.map((key: string) => {
        const spriteConfig = config.frames[key];
        const {frame} = spriteConfig;
        if (!frame) {
            console.log('Invalid config');
            return null;
        }

        const {x,y,w,h} = frame;
        result.push({
            name: key.split('.')[0],
            x,
            y,
            width: w,
            height: h,
        })

        return null;
    })
    return result;
}

export const getTexture = (resource: PIXI.Resource, config: TextureConfig): PIXI.Texture => {
    const {x, y, width, height} = config;

    const rect = new PIXI.Rectangle(x,y,width,height);
    return new PIXI.Texture(resource as any, rect);
}

export const getSpriteNames = (config: SpriteSheetConfig): Array<string> => {
    const nameList = Object.keys(config.frames);
    return  nameList.map(name => name.split('.')[0]);
}

export const getAnimationNames = (config: SpriteSheetConfig) => {

}