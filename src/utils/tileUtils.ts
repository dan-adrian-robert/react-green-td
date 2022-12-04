import {Node} from './pathfinder';

export const getTilePosition = (node: Node, tileSize: number) => {
    const col: number = Math.floor(node.pos.x / tileSize);
    const row: number = Math.floor(node.pos.y / tileSize);

    return {col, row};
}

export const distanceBetweenPoints = (
    nodeA: {x: number, y: number},
    nodeB: {x: number, y: number}) => {
    const dx = Math.abs(nodeA.x - nodeB.x);
    const dy = Math.abs(nodeA.y - nodeB.y);

 return Math.floor(Math.sqrt(dx ^ 2 + dy ^ 2));
}