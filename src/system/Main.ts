import {AssetPaths, ConfigMap} from "../Images";
import {loadAsset} from "../utils/loaders";
import {ConfigUiData, LAYER_NAMES, SpriteSheetConfig, Tile} from "../types/types";
import {Container, Sprite, Texture} from "pixi.js";
import {Engine} from "../engine/Engine";
import {CANVAS_CONFIG, LAYER_INDEX_MAP, UI_CANVAS_CONFIG, UI_POSITION} from "../config/globals";
import {BuildMobTextureMap, BuildSpecialGui, BuildTileMap, getMobSystemConfig} from "../utils/builders";
import {
    handleBuildMenuClick,
    handleTileClick,
    handleTileMouseOver
} from "../handlers/ClickHandlers";
import {GameMap} from "../entities/GameMap";
import {importBuildings, importMapData, importUIData} from "../utils/export.utils";
import {Point} from "../utils/pathfinder";
import {ASSET_NAMES} from "../types/image.types";
import {MobSystem} from "./MobSystem";
import {ANIMATION_CONFIG_RECORD, MOB_ANIMATION, MOB_TYPE} from "../types/mobs.types";
import findPath = Engine.findPath;
import {addBuildingPlaceToScene} from "../utils/buildingPlace.utils";
import {BuildMenuSystem} from "./BuildMenuSystem";

export const INIT_ASSETS = async () => {
    const tileMap: Record<string, Texture> = await loadAsset(AssetPaths.TILE_MAP,
                                                             ConfigMap.TILE_MAP as SpriteSheetConfig);

    const UIMap: Record<string, Texture> = await loadAsset(AssetPaths.UI,
                                                           ConfigMap.UI as SpriteSheetConfig);

    const OgreMap: Record<string, Texture> = await loadAsset(AssetPaths.OGRE,
                                                             ConfigMap.OGRE as SpriteSheetConfig);

    const TowerMap: Record<string, Texture> = await loadAsset(AssetPaths.TOWERS,
                                                              ConfigMap.TOWERS as SpriteSheetConfig);

    const Build_UI: Record<string, Texture> = await loadAsset(AssetPaths.BUILD_UI,
                                                              ConfigMap.BUILD_UI as SpriteSheetConfig);

    Engine.setInTexture(ASSET_NAMES.TILE_MAP, tileMap);
    Engine.setInTexture(ASSET_NAMES.UI, UIMap);
    Engine.setInTexture(ASSET_NAMES.OGRE, OgreMap);
    Engine.setInTexture(ASSET_NAMES.TOWERS, TowerMap);
    Engine.setInTexture(ASSET_NAMES.BUILD_UI, Build_UI);
}

export const BUILD_ENV = () => {
    buildMap();
    buildConfigUI();
    buildMobData();
    buildBuildings();
    buildUI();
}

export const BUILD_SYSTEMS = (): void => {
    Engine.setMobSystem(new MobSystem());
}

 const buildMap = () => {
     const loadedData: Tile[][] = importMapData(Engine.getTextureMap());

     if (loadedData.length > 0) {
         Engine.setGameMap(new GameMap(loadedData));

         const gameMap: GameMap = Engine.getGameMap();

         const mapContainer = new Container();
         mapContainer.name = LAYER_NAMES.MapContainer;

         gameMap.tileMap.map(tileRow => {
             tileRow.map(tile => mapContainer.addChild(tile.sprite));
             return null;
         });

         const containerIndex: number = LAYER_INDEX_MAP.MapContainer;
         Engine.addToGameLayer(mapContainer, containerIndex);

     } else {
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
                 sprite.on('pointerdown', () => {
                     handleTileClick(sprite, {row, col} );
                 })

                 sprite.on('pointerover', () => {
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

         const mapContainer = new Container();
         mapContainer.name = LAYER_NAMES.MapContainer;

         gameMap.tileMap.map(tileRow => {
             tileRow.map(tile => mapContainer.addChild(tile.sprite));
             return null;
         });

         const containerIndex = LAYER_INDEX_MAP.MapContainer;
         Engine.addToGameLayer(mapContainer, containerIndex)
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

        const mapPathContainer: Container = new Container();
        mapPathContainer.name = LAYER_NAMES.MapPathContainer;
        Engine.addToGameLayer(mapPathContainer, LAYER_INDEX_MAP[LAYER_NAMES.MapPathContainer]);
        mapPathContainer?.addChild(Engine.getGameMap().startNode);
        mapPathContainer?.addChild(Engine.getGameMap().endNode);
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
        addTowerMode: false,
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

const buildBuildings = () => {
    const buildingPlaceList: { row: number, col: number }[] | null =  importBuildings();

    if (!buildingPlaceList) {
        return;
    }

    //Create the TowerPlace Container
    const buildingPlaceContainer = new Container();
    buildingPlaceContainer.name = LAYER_NAMES.TowerPlaceContainer;

    buildingPlaceList.map((buildingPlace) => {
        const {row, col} = buildingPlace;
        addBuildingPlaceToScene(row, col,buildingPlaceContainer)
        return null;
    });

    //Add the TowerPlace Container
    Engine.addContainerToStage(buildingPlaceContainer);

}

const buildUI = () => {
    const buildUiContainer = new Container();
    const {position, size} = UI_POSITION.buildMenu;

    buildUiContainer.width = size.width;
    buildUiContainer.height = size.height;
    buildUiContainer.position = position;

    buildUiContainer.name = LAYER_NAMES.BuildUI;

    const textureMap = Engine.getTextureMap();
    const buildMap = textureMap[ASSET_NAMES.BUILD_UI];

    const { buildMenu } = buildMap;

    const buildBackground = Sprite.from(buildMenu);
    buildBackground.interactive = true;
    buildBackground.buttonMode = true;

    // buildBackground.position = position;
    buildBackground.width = size.width;
    buildBackground.height = size.height;
    buildUiContainer.addChild(buildBackground);

    buildBackground.on('pointerdown', () => {
        handleBuildMenuClick({});
    })

    Engine.addContainerToStage(buildUiContainer);

    const bs: BuildMenuSystem = Engine.getBuildMenuSystem();
    bs.buildTowerList();

    // towerList.map((towerTexture: Texture, index: number) => {
    //     const towerImage: Sprite = Sprite.from(towerTexture);
    //     towerImage.position.y = 20 + 150 * index;
    //     towerImage.position.x = 30;
    //     towerImage.width = 100;
    //     towerImage.height = 150;
    //     buildBackground.addChild(towerImage);
    // })
}

