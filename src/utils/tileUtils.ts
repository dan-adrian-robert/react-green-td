import {Node, Point} from './pathfinder';
import {UI_CANVAS_CONFIG} from "../config/globals";

export const getTilePosition = (node: Node, tileSize: number) => {
    const col: number = Math.floor(node.pos.x / tileSize);
    const row: number = Math.floor(node.pos.y / tileSize);

    return {col, row};
}

export const getPointFromTilePosition = (pos:{row: number, col: number}): Point => {
    return {
        x: pos.col * UI_CANVAS_CONFIG.size,
        y: pos.row * UI_CANVAS_CONFIG.size,
    }
}

export const distanceBetweenPoints = (
    nodeA: {x: number, y: number},
    nodeB: {x: number, y: number}) => {
    const dx = Math.abs(nodeA.x - nodeB.x);
    const dy = Math.abs(nodeA.y - nodeB.y);

    return Math.floor(Math.sqrt(dx ^ 2 + dy ^ 2));
}

export const getDeltaDistance = (nodeA: Point, nodeB: Point): Point => {
    return {
        x: Math.abs(nodeA.x - nodeB.x),
        y: Math.abs(nodeA.y - nodeB.y),
    }
}

export const getPointCenter = (checkpoint: Point, halfSize: number):Point => {
    const {x, y} = checkpoint;

    return {
        x: x + halfSize,
        y: y + halfSize,
    }
}