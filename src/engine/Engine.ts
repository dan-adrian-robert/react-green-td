import * as PIXI from 'pixi.js'
import {Container, Sprite} from 'pixi.js'
import {ConfigUiData, LAYER_NAMES} from "../types/types";
import {CANVAS_CONFIG, COLORS, DEBUG_POINTS, LAYER_INDEX_MAP, UI_CANVAS_CONFIG} from "../config/globals";
import {GameMap} from "../entities/GameMap";
import {AStar, mapPointToSmallGrid, mapTileMapToGrid, Point} from "../utils/pathfinder";
import {Mob} from "../entities/Mob";
import {ANIMATION_CONFIG_RECORD, MOB_TEXTURE_MAP, MOB_TYPE} from "../types/mobs.types";
import {MobSystem} from "../system/MobSystem";
import {MOB_CONTAINER_NAME} from "../config/mob.config";
import { Text } from 'pixi.js';
import {ITextStyle} from "@pixi/text";
import { getPointCenter } from "../utils/tileUtils";
import {BuildPlace} from "../entities/BuildPlace";
import {BuildSystem} from "../system/BuildSystem";
import {exportBuildingsToJson} from "../utils/export.utils";
import {addBuildingPlaceToScene} from "../utils/buildingPlace.utils";
import {BuildMenuSystem} from "../system/BuildMenuSystem";

export namespace Engine {
    let enemyContainer: Container;
    let globalTicker: number = 0;
    let loader: PIXI.Loader;
    let app: PIXI.Application;
    let configApp: PIXI.Application;

    let textureMap: any = {};

    let configData: ConfigUiData = {
        selectedItem : 0,
        boxSelectedItem: 0,
        tileList: [],
        specialBoxList: [],
        selectFrame: new PIXI.Sprite(),
        boxSelectFrame: new PIXI.Sprite(),
        drawMode: false,
        insertMode: false,
        addTowerMode: false,
        addTowerPlaceMode: false,
    }

    let gameMap: GameMap = new GameMap([]);
    let mobList: Array<Mob> = [];

     let buildPlaceList: Array<BuildPlace> = [];

    let mobTextureMap: MOB_TEXTURE_MAP = {
        OGRE: {
            WALK_DOWN: [],
            WALK_UP: [],
            WALK_LEFT: [],
            WALK_RIGHT: [],
        }
    }

    let mobsSystem: MobSystem;
    let buildSystem: BuildSystem = new BuildSystem();
    let buildMenuSystem: BuildMenuSystem = new BuildMenuSystem();

    let menuOpened = false;

    export const buildBuildMenuSystem = (newBuildMenuSystem: BuildMenuSystem): void => {
        buildMenuSystem = newBuildMenuSystem;
    }

    export const getBuildMenuSystem = (): BuildMenuSystem => {
        return buildMenuSystem;
    }

    export const getBuildMenuContainer = (): Container => {
        return Engine.getGameLayer(LAYER_NAMES.BuildUI);
    }

    export const toggleMenuState = () => {
        return menuOpened = !menuOpened;
    }

    export const getMenuState = () => {
        return menuOpened;
    }

    export const addContainerToStage = (bpContainer: Container) => {
        app.stage.addChild(bpContainer);
    }

    export const getBuildSystem = (): BuildSystem => {
        return buildSystem;
    }

    export const getBuildPlaceList = (): Array<BuildPlace> => {
        return buildPlaceList;
    }

    export const addBuildPlace = (buildPlace: BuildPlace): void => {
        buildPlaceList.push(buildPlace);
    }

    export const removeBuildPlace = (itemIndex: number): void => {
        buildPlaceList.splice(itemIndex, 1);
    }

    export const getMobSystem = (): MobSystem => {
        return  mobsSystem;
    }

    export const setMobSystem = (newSystem: MobSystem): void => {
        mobsSystem = newSystem;
    }

    export const updateTicker = () => {
        globalTicker += 1;
    }

    export const getTicker = () => {
        return globalTicker;
    }

    export const getMobList = () => {
        return mobList;
    }

    export const removeMob = (index: number): void => {
        mobList.splice(index, 1);
    }

    export const getMobTextureMap = () => {
        return mobTextureMap;
    }

    export const addMobTexture = (value: ANIMATION_CONFIG_RECORD, mob: MOB_TYPE) => {
        mobTextureMap[mob] = value;
    }

    export const addMob = () => {
        const checkPoint: Point = {x: 0, y: 32};
        const {x, y} = checkPoint;
        const textureMap: ANIMATION_CONFIG_RECORD = mobTextureMap[MOB_TYPE.OGRE];
        const mobSize = 64;

        const enemyContainer = new Container();
        enemyContainer.position = checkPoint;
        enemyContainer.name = MOB_CONTAINER_NAME.Enemy;

        const enemySprite: Sprite = new Sprite(textureMap.WALK_RIGHT[0]);
        enemySprite.width = mobSize;
        enemySprite.height = mobSize;
        enemySprite.name = MOB_CONTAINER_NAME.EnemySprite;

        const centerPos = new PIXI.Graphics();
        centerPos.beginFill(COLORS.RED);
        centerPos.lineStyle(5, COLORS.RED);
        centerPos.drawRect(x, y, DEBUG_POINTS.pointSize, DEBUG_POINTS.pointSize);
        centerPos.name = MOB_CONTAINER_NAME.Center;

        const textOption: Partial<ITextStyle> = {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
        }
        const text = new Text('0');
        text.style = textOption;
        text.name = MOB_CONTAINER_NAME.CheckPoint;

        enemyContainer.addChild(enemySprite);
        enemyContainer.addChild(centerPos);
        enemyContainer.addChild(text);

        const mob: Mob = new Mob(enemyContainer, MOB_TYPE.OGRE, 0);
        mobList.push(mob);

        const mobContainer: Container = getGameLayer(LAYER_NAMES.EnemyContainer);
        mobContainer.addChild(enemyContainer);
    }

    export const saveBuildingPlaceList = () => {
        const result = getGameLayer(LAYER_NAMES.TowerPlaceContainer).children;

        const pointList = result ? result.map((item) => {
            const {x, y} = item.position;
            return {x, y};
        }) : [];

        exportBuildingsToJson(pointList);
    }

    export const logTowerPlace = () => {
        console.log(Engine.getBuildPlaceList());
    }

    export const logMobs = () => {
        console.log(Engine.getMobList());
    }

    export const toggleEditMode = (): void => {
        configData.drawMode = !configData.drawMode;
        console.log(`edit mode is not ${configData.drawMode}`)
    }

    export const toggleInsertMode = (): void => {
        configData.insertMode = !configData.insertMode;
        console.log(`insertMode mode is not ${configData.insertMode}`)
    }

    export const toggleAddTowerMode = (): void => {
        configData.addTowerMode = !configData.addTowerMode;
    }

    export const toggleAddTowerPlaceMode = (): void => {
        configData.addTowerPlaceMode = !configData.addTowerPlaceMode;
    }

    export const getGameMap = (): GameMap => {
        return gameMap;
    };

    export const setGameMap = (newGameMap: GameMap) => {
        gameMap = newGameMap;
    };

    export const changeSpriteTexture = (sprite: Sprite, metadata: any) => {
        if (getConfigData().drawMode) {
            const {row, col} = metadata;
            const selectedSprite: Sprite = configData.tileList[configData.selectedItem];
            gameMap.changeTile(row, col, selectedSprite.texture, true, configData.selectedItem);
        }
    }

    export const addTowerPlace = (metadata: any) => {
        const {row, col} = metadata;

        const maxRows = CANVAS_CONFIG.height/UI_CANVAS_CONFIG.size;
        const maxCols = CANVAS_CONFIG.width/UI_CANVAS_CONFIG.size;

        if (row + 1 >= maxRows || col + 1 >= maxCols) {
            return;
        }
        const point: Point = {x: col * UI_CANVAS_CONFIG.size, y: row * UI_CANVAS_CONFIG.size}
        const buildPlaceClickedIndex: number = Engine.getBuildSystem().getBuildPlaceClicked(point);

        if (buildPlaceClickedIndex === -1) {
            addBuildingPlaceToScene(row,col, getGameLayer(LAYER_NAMES.TowerPlaceContainer))
        }
    }

    export const setNodes = (position: any, metadata: any) => {
       const selectedSprite: Sprite = configData.specialBoxList[configData.boxSelectedItem];

        const newSprite: Sprite = new Sprite(selectedSprite.texture);
        newSprite.position = position;
        newSprite.width = UI_CANVAS_CONFIG.size;
        newSprite.height = UI_CANVAS_CONFIG.size;

        if (configData.boxSelectedItem === 0) {
            app.stage.removeChild(gameMap.endNode);
            gameMap.setMapEnd(newSprite);
            app.stage.addChild(gameMap.endNode);
        } else {
            app.stage.removeChild(gameMap.startNode);
            gameMap.setMapStart(newSprite)
            app.stage.addChild(gameMap.startNode);
        }
    }

    export const changeFrameIndex = (index: number) => {
        configData.selectedItem = index;
        configData.selectFrame.position = {
            x: configData.tileList[index].position.x - UI_CANVAS_CONFIG.gap / 2,
            y: configData.tileList[index].position.y - UI_CANVAS_CONFIG.gap / 2
        };
    }

    export const changeSpecialFrameIndex = (index: number) => {
        configData.boxSelectedItem = index;
        configData.boxSelectFrame.position = {
            x: configData.specialBoxList[index].position.x - UI_CANVAS_CONFIG.gap / 2,
            y: configData.specialBoxList[index].position.y - UI_CANVAS_CONFIG.gap / 2
        };
    }

    export const setConfigData = (newConfigData: any) => {
        configData = newConfigData;
    }

    export const getConfigData = (): ConfigUiData => {
        return configData;
    }

    export const addInScene= (sprite: any): void => {
        app.stage.addChild(sprite);
    }

    export const setLoader = (newLoader: PIXI.Loader): void => {
        loader = newLoader;
    }

    export const getLoader = (newLoader: PIXI.Loader): PIXI.Loader => {
        return loader;
    }

    export const setApp = (newApp: PIXI.Application): void => {
        app = newApp;
        enemyContainer = new Container();
        enemyContainer.name = LAYER_NAMES.EnemyContainer;

        const containerIndex = LAYER_INDEX_MAP[LAYER_NAMES.EnemyContainer];
        addToGameLayer(enemyContainer, containerIndex);
    }

    export const getApp = (): PIXI.Application => {
        return app;
    }

    export const setInTexture = (key: string, value: any): void => {
        textureMap[key] = value;
    }

    export const getTextureMap = (): any => {
        return textureMap;
    }

    export const setConfigApp = (newApp: PIXI.Application): void => {
        configApp = newApp;
    }

    export const getConfigApp = (): PIXI.Application => {
        return configApp;
    }

    export const findPath = (): Array<Point> => {
        const grid = AStar.init(mapTileMapToGrid(Engine.getGameMap().tileMap));

        const startNode =  mapPointToSmallGrid(Engine.getGameMap().startNode);
        const endNode =  mapPointToSmallGrid(Engine.getGameMap().endNode);

        if( !startNode  || !endNode) {
            return [];
        }


        const result = AStar.search(grid, startNode, endNode);

        return result.map(item => item.pos);
    }

    export const renderPath = (path: Array<Point>) => {
        const pathContainer = new Container();
        pathContainer.name = LAYER_NAMES.MapPathContainer;

        path.map((item) => {
            const graphics = new PIXI.Graphics();
            const {x, y} = item;

            const checkPoint: Point = getPointCenter({x,y}, UI_CANVAS_CONFIG.size);

            graphics.beginFill(COLORS.YELLOW);
            graphics.lineStyle(5, COLORS.YELLOW);
            graphics.drawRect(checkPoint.x, checkPoint.y , 4, 4);
            pathContainer.addChild(graphics);

            return null;
        })

        app.stage.addChild(pathContainer);
    }

    export const spawnMob = () => {
        addMob();
    }

    export const addToGameLayer = (child: Container, childIndex: number) => {
        const containerList = Engine.getApp().stage.children;
        const index = containerList.findIndex((container) => container.name === child.name);

        if( index > -1) {
            return;
        }

        if (childIndex >  containerList.length) {
            while ( containerList.length < childIndex) {
                Engine.getApp().stage.addChild(new Container());
            }
        }

        Engine.getApp().stage.addChildAt(child, childIndex);
    }

    export const getGameLayer = (name: LAYER_NAMES): Container => {
        return Engine.getApp().stage.getChildByName(name) as Container;
    }

    export const removeBuildingPlace = (id : string): void => {
        const towerPlaceContainer: Container = Engine.getGameLayer(LAYER_NAMES.TowerPlaceContainer);
        towerPlaceContainer.removeChild(towerPlaceContainer.getChildByName(id));

    }
}