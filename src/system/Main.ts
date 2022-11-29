import {AssetPaths, ConfigMap} from "../Images";
import {loadAsset} from "../utils/loaders";
import {ConfigUiData, SpriteSheetConfig, Tile} from "../types/types";
import {Sprite, Texture} from "pixi.js";
import {Engine} from "../engine/Engine";
import {CANVAS_CONFIG, UI_CANVAS_CONFIG} from "../config/globals";
import {BuildMobTextureMap, BuildSpecialGui, BuildTileMap, getMobSystemConfig} from "../utils/builders";
import {handleTileClick, handleTileMouseOver} from "../handlers/ClickHandlers";
import {GameMap} from "../entities/GameMap";
import {importMapData, importUIData} from "../utils/export.utils";
import {Point} from "../utils/pathfinder";
import {ASSET_NAMES} from "../types/image.types";
import {MobSystem} from "./MobSystem";
import {ANIMATION_CONFIG_RECORD, MOB_ANIMATION, MOB_TYPE} from "../types/mobs.types";
import findPath = Engine.findPath;
import {MOB_CONFIG} from "../config/mob.config";

export const INIT_ASSETS = async () => {
    const tileMap: Record<string, Texture> = await loadAsset(AssetPaths.TILE_MAP,
                                                             ConfigMap.TILE_MAP as SpriteSheetConfig);

    const UIMap: Record<string, Texture> = await loadAsset(AssetPaths.UI,
                                                           ConfigMap.UI as SpriteSheetConfig);

    const OgreMap: Record<string, Texture> = await loadAsset(AssetPaths.OGRE,
                                                             ConfigMap.OGRE as SpriteSheetConfig);


    Engine.setInTexture(ASSET_NAMES.TILE_MAP, tileMap);
    Engine.setInTexture(ASSET_NAMES.UI, UIMap);
    Engine.setInTexture(ASSET_NAMES.OGRE, OgreMap);
}

export const BUILD_ENV = () => {
    buildMap();
    buildConfigUI();
    buildMobData();
}

export const BUILD_SYSTEMS = (): void => {
    Engine.setMobSystem(new MobSystem());
}

 const buildMap = () => {
     const loadedData: Tile[][] = importMapData(Engine.getTextureMap());

     if (loadedData.length > 0) {
         Engine.setGameMap(new GameMap(loadedData));

         const gameMap: GameMap = Engine.getGameMap();

         gameMap.tileMap.map(tileRow => {
             tileRow.map(tile => Engine.getApp().stage.addChild(tile.sprite));
             return null;
         });

     } else {
         console.log('did not load data');
         const size = UI_CANVAS_CONFIG.size;
         const texture = Engine.getTextureMap()[ASSET_NAMES.TILE_MAP]['t1'];

         const  numCols =  Math.floor(CANVAS_CONFIG.width / size);
         const  numRows =  Math.floor(CANVAS_CONFIG.height / size);

         const tiles: Tile[][] = [];

         for (let row = 0; row < numRows; row++) {
             const tileRow = [];
             for (let col = 0; col < numCols; col++) {
                 const sprite = Sprite.from(texture);
                 sprite.width = size;
                 sprite.height = size;
                 sprite.position = {x: col * size, y: row * size};
                 sprite.interactive = true;
                 sprite.buttonMode = true;
                 sprite.on('pointerdown', (event) => {
                     handleTileClick(sprite, {row, col} );
                 })

                 sprite.on('pointerover', (event) => {
                     handleTileMouseOver(sprite, {row, col} );
                 })

                 const tile: Tile = {
                     sprite: sprite,
                     walkable: false,
                     textureIndex: 0,
                 }
                 tileRow.push(tile)
             }
             tiles.push(tileRow);
         }

         Engine.setGameMap(new GameMap(tiles));
         const gameMap: GameMap = Engine.getGameMap();

         gameMap.tileMap.map(tileRow => {
             tileRow.map(tile => Engine.getApp().stage.addChild(tile.sprite));
             return null;
         });
     }
}

const buildConfigUI = () => {
    const configUiData = importUIData();
    if (configUiData) {
        const { startNode, endNode} = configUiData
        Engine.getGameMap().startNode = startNode;
        Engine.getGameMap().endNode = endNode;

        if (startNode && endNode) {
            const path: Array<Point> = findPath();
            Engine.getGameMap().path = path;
            Engine.renderPath(path);
        }

        Engine.getApp().stage.addChild(Engine.getGameMap().startNode);
        Engine.getApp().stage.addChild(Engine.getGameMap().endNode);
    }

    const {spriteList, selectSprite} = BuildTileMap();
    const {specialBoxList, selectedSpecialSprite} = BuildSpecialGui();

    const uiData: ConfigUiData = {
        selectedItem: 0,
        boxSelectedItem: 0,
        tileList: spriteList,
        specialBoxList: specialBoxList,
        selectFrame: selectSprite,
        boxSelectFrame: selectedSpecialSprite,
        drawMode: false,
        insertMode: false,
    }

    Engine.setConfigData(uiData);
    Engine.getConfigApp().stage.addChild(uiData.selectFrame);
    Engine.getConfigApp().stage.addChild(selectedSpecialSprite);
}

const buildMobData = () => {
    const result: ANIMATION_CONFIG_RECORD = buildAnimationData(ConfigMap[ASSET_NAMES.OGRE], ASSET_NAMES.OGRE, MOB_TYPE.OGRE);
    Engine.addMobTexture(result, MOB_TYPE.OGRE);
}

const buildAnimationData = (config: SpriteSheetConfig, assetName: ASSET_NAMES, mobType: MOB_TYPE): ANIMATION_CONFIG_RECORD => {
    const textureMap: Record<string, Array<Texture>> = BuildMobTextureMap(config, assetName);
    const mobConfig: ANIMATION_CONFIG_RECORD = getMobSystemConfig(mobType);

    const result: ANIMATION_CONFIG_RECORD = {
        WALK_DOWN: null,
        WALK_LEFT: null,
        WALK_RIGHT: null,
        WALK_UP: null
    }

    for (let mobConfigKey in mobConfig) {
        const keyString = mobConfig[mobConfigKey as MOB_ANIMATION];
        result[mobConfigKey as MOB_ANIMATION] = textureMap[keyString]
    }

    return result;
}
