import {UI_CANVAS_CONFIG} from "../config/globals";
import {Sprite} from "pixi.js";
import {getTilePosition} from "./tileUtils";

export const AStar = {
    init: (grid: Matrix) => {
        const result = [];
        for (let x = 0; x < grid.length; x++) {
            const row = [];
            for (let y = 0; y < grid[x].length; y++) {
                const node: any = {};
                node.f = 0;
                node.g = 0;
                node.h = 0;
                node.parent = null;
                node.walkable = grid[x][y].walkable;
                const position = grid[x][y].sprite.position;
                node.pos = {
                    x: position.x,
                    y: position.y
                }
                node.ap = getTilePosition(node,UI_CANVAS_CONFIG.size * 2)
                row.push(node);
            }
            result.push(row);
        }
        return result;
    },
    search: (grid: Matrix, start: Node, end: Node) => {
        let openList: any[] = [];
        let closedList: any[] = [];
        openList.push(start);

        while(openList.length > 0) {

            // Grab the lowest f(x) to process next
            let lowInd: number = 0 ;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].f < openList[lowInd].f) {
                    lowInd = i;
                }
            }
            const currentNode: any = openList[lowInd];

            // End case -- result has been found, return the traced path
            if(AStar.equals(currentNode, end)) {
                let curr = currentNode;
                let ret = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return ret.reverse();
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors
            openList.splice(lowInd, 1);

            closedList.push(currentNode);
            let neighbors = AStar.neighbors(grid, currentNode);

            // gaseste un nod intr-o lista;
            // findGraphNode

            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                if (AStar.findGraphNode(closedList, neighbor) || !neighbor.walkable) {
                    // not a valid node to process, skip to next neighbor
                    continue;
                }

                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                let gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
                let gScoreIsBest = false;


                if( !AStar.findGraphNode(openList, neighbor)) {
                    // This the the first time we have arrived at this node, it must be the best
                    // Also, we need to take the h (heuristic) score since we haven't done so yet

                    gScoreIsBest = true;
                    neighbor.h = AStar.heuristic(neighbor.pos, end.pos);

                    openList.push(neighbor);
                }
                else if(gScore < neighbor.g) {
                    // We have already seen the node, but last time it had a worse g (distance from start)
                    gScoreIsBest = true;
                }

                if(gScoreIsBest) {
                    // Found an optimal (so far) path to this node.   Store info on how we got here and
                    //  just how good it really is...

                    neighbor.parent = currentNode;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.debug = `F: ${neighbor.f} G: ${neighbor.g} H: ${neighbor.h}`;
                }
            }
        }

        // No result was found -- empty array signifies failure to find path
        return [];
    },
    heuristic: (pos0: Point, pos1: Point) => {
        // This is the Manhattan distance
        let d1 = Math.abs (pos1.x - pos0.x);
        let d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
    },
    neighbors: (grid: Matrix, node: Node) => {
        const ret: any[] = [];
        const size = UI_CANVAS_CONFIG.size * 2;
        const col: number = Math.floor(node.pos.x / size);
        const row: number = Math.floor(node.pos.y / size);

        const maxRows = grid.length;
        const maxCols = grid[0].length;

        const neighbours: {row: number, col: number}[] = [
            // {row: row-1, col: col-1},
            {row: row, col: col-1},
            // {row: row+1, col: col-1},

            {row: row-1, col: col},
            {row: row+1, col: col},

            // {row: row-1, col: col+1},
            {row: row, col: col+1},
            // {row: row+1, col: col+1},
        ]

        neighbours.map((point, pointIndex: number) => {
            if (point.row >= 0 && point.row < maxRows &&
                point.col >= 0 && point.col < maxCols) {
                if (grid[point.row][point.col].walkable) {
                    ret.push(grid[point.row][point.col]);
                }
            }
            return null;
        })
        return ret;
    },
    findGraphNode: (list: Node[], node: Node) => {
        let found: boolean = false;
        list.map(listNode => {
            if (AStar.equals(listNode, node)) {
                found = true;
            }
            return null;
        })

        return found;
    },
    equals : (nodeA: Node, nodeB: Node) => {
        return nodeA.pos.x === nodeB.pos.x &&
               nodeA.pos.y === nodeB.pos.y;
    }
};

export type Matrix = any[][];

export type Point = {
    x: number
    y: number
}
export type Node = {
    pos: Point,
}

export const mapTileMapToGrid = (tileMap: any) => {
    const rows = tileMap.length / 2;
    const cols = tileMap[0].length / 2;
    const result = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j <cols; j++) {
            const bi = i * 2;
            const bj = j * 2;

            const c1 = tileMap[bi][bj];
            const c2 = tileMap[bi][bj+1];
            const c3 = tileMap[bi+1][bj+1];
            const c4 = tileMap[bi+1][bj+1];

            const {x, y} = tileMap[i][j].sprite.position
            const mergedCell = {
                walkable: c1.walkable && c2.walkable && c3.walkable && c4.walkable,
                sprite: {
                    position: {
                        x: x * 2,
                        y: y * 2,
                    }
                }
            }

            row.push(mergedCell)
        }
        result.push(row);
    }

    return result;
}

export const mapPointToSmallGrid = (node: Sprite): Node | null => {
    if (!node) {
        return null;
    }
    const size = UI_CANVAS_CONFIG.size;
    const col: number = Math.floor(node.position.x / (size * 2));
    const row: number = Math.floor(node.position.y / (size * 2));

    return {
        pos: {
            x: col * size * 2,
            y: row * size * 2
        }
    };
}