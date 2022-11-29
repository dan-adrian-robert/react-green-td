import * as Loader from "@pixi/assets";
import * as PIXI from "pixi.js";
import { SpriteSheetConfig, TextureConfig} from "../types/types";
import {getSpriteSheetConfig, getTexture} from "./parser";
import {Texture} from "pixi.js";
import {ASSET_NAMES} from "../types/image.types";

export const loadAsset = (imagePath:ASSET_NAMES, config: SpriteSheetConfig): Promise<Record<string, Texture>> => {
    const textureMap: Record<string, Texture> = {};
    return Loader.Assets.load(imagePath).then((result: PIXI.Resource) => {
        const textureConfigList: Array<TextureConfig> = getSpriteSheetConfig(config);
        textureConfigList.map((config) => {
            textureMap[config.name] = getTexture(result, config);
            return null;
        });

        return textureMap;
    });
}