import {Tile} from "../types/types";
import {Sprite, Texture} from "pixi.js";
import {Point} from "../utils/pathfinder";

export class GameMap {
    tileMap:Tile[][] = [];
    startNode: Sprite;
    endNode: Sprite;
    path: Point[] = [];

    constructor(tileMap: Tile[][]) {
        this.tileMap = tileMap;
        this.startNode = new Sprite();
        this.endNode = new Sprite();
    }

    setMapStart = (node: Sprite): void => {
        this.startNode = node;
    }

    setMapEnd = (node: Sprite): void => {
        this.endNode = node;
    }

    setPath = (newPath: Point[]): void => {
        this.path = newPath;
    }

    changeTile = (row: number, col: number, texture:Texture, walkable: boolean, textureIndex: number): void => {
        this.tileMap[row][col].sprite.texture = texture;
        this.tileMap[row][col].walkable = walkable;
        this.tileMap[row][col].textureIndex = textureIndex;
    }
}

