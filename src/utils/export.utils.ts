import {GameMap} from "../entities/GameMap";
import {Point} from "./pathfinder";
import {Tile, TileLight} from "../types/types";
import {Sprite} from "pixi.js";
import {UI_CANVAS_CONFIG} from "../config/globals";
import {handleTileClick, handleTileMouseOver} from "../handlers/ClickHandlers";
import {BuildSpecialGui} from "./builders";
import {ASSET_NAMES} from "../types/image.types";
import {getTilePosition} from "./tileUtils";

export enum STORAGE_KEYS {
    'level1'='level1',
    'buildings'='buildings',
}

export const exportMapToJson = (gameMap: GameMap) => {
    if (!gameMap.startNode || !gameMap.endNode) {
       return;
    }
    const start: Point = {x: gameMap.startNode.position.x, y: gameMap.startNode.position.y};
    const end: Point = {x: gameMap.endNode.position.x, y: gameMap.endNode.position.y};

    const tileMap = gameMap.tileMap.map((tileRow: Tile[]) => {
        return tileRow.map((tile: Tile) => {
            return {
                t: tile.textureIndex,
                w: tile.walkable ? 1 : 0,
            }
        } )
    });

    const storage = {
        start,
        end,
        tileMap
    }

    localStorage.setItem(STORAGE_KEYS.level1, JSON.stringify(storage))
}

export const exportBuildingsToJson = (buildingPlaceList: Point[] ) => {
    const storage = {
        buildingPlaceList: buildingPlaceList,
    }

    localStorage.setItem(STORAGE_KEYS.buildings, JSON.stringify(storage))
}

export const importMapData = (textureMap: any): Tile[][] => {
    const storageString = localStorage.getItem(STORAGE_KEYS.level1);

    if (!storageString) {
        return [];
    }

    try {
        const storage = JSON.parse(storageString);
        const { tileMap } = storage;
        const tileResult: Tile[][] = [];
        const size = UI_CANVAS_CONFIG.size;

        tileMap.map((tileRow: TileLight[], rowIndex: number) => {
            const list : Tile[] = tileRow.map((tileLight:TileLight, colIndex: number) => {
                const { w, t } = tileLight;
                const tileName = `t${t === 0 ? 1 : t}`

                const sprite = Sprite.from(textureMap[ASSET_NAMES.TILE_MAP][tileName])
                sprite.width = size;
                sprite.height = size;
                sprite.interactive = true;
                sprite.buttonMode = true;
                sprite.position = {x: colIndex * size, y: rowIndex * size};
                sprite.on('pointerdown', (event) => {
                    handleTileClick(sprite, {row: rowIndex, col: colIndex} );
                })

                sprite.on('pointerover', (event) => {
                    handleTileMouseOver(sprite, {row: rowIndex, col: colIndex} );
                })

                const tile: Tile = {
                    sprite,
                    walkable: w > 0,
                    textureIndex: t,
                }
                return tile;
            })
            tileResult.push(list);
            return null;
        })

        return tileResult
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const importUIData = (): {startNode: Sprite, endNode: Sprite} | null => {

    const storageString = localStorage.getItem(STORAGE_KEYS.level1);

    if (!storageString) {
        return null;
    }
    const storage = JSON.parse(storageString);
    const {start, end} = storage;
    const {specialBoxList} = BuildSpecialGui();

    const startTexture = specialBoxList[1].texture;
    const endTexture = specialBoxList[0].texture;

    const startNode: Sprite = new Sprite(startTexture);
    startNode.position = start;
    startNode.width = UI_CANVAS_CONFIG.size;
    startNode.height = UI_CANVAS_CONFIG.size;

    const endNode: Sprite = new Sprite(endTexture);
    endNode.position = end;
    endNode.width = UI_CANVAS_CONFIG.size;
    endNode.height = UI_CANVAS_CONFIG.size;

    return {
        startNode,
        endNode
    };
}

export const importBuildings = (): { row: number, col: number }[] | null => {
    const storageString = localStorage.getItem(STORAGE_KEYS.buildings);

    if (!storageString) {
        return null;
    }

    const storage = JSON.parse(storageString);

    const { buildingPlaceList } = storage;

    return buildingPlaceList.map((pos: Point) => {
        return getTilePosition({pos} ,UI_CANVAS_CONFIG.size);
    })
}