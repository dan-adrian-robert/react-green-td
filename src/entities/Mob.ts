import {Sprite} from "pixi.js";
import {Point} from "../utils/pathfinder";
import {MOB_ANIMATION, MOB_TYPE} from "../types/mobs.types";

export class Mob {
    sprite: Sprite;
    nextCheckPoint: Point;
    checkpointIndex: number;
    animationIndex: number;
    activeAnimation: MOB_ANIMATION;
    type: MOB_TYPE;

    speed: number;

    constructor(sprite: Sprite, checkPoint: Point, type: MOB_TYPE, checkpointIndex: number) {
        this.sprite = sprite
        this.nextCheckPoint = checkPoint;
        this.checkpointIndex = checkpointIndex;
        this.animationIndex = 0;
        this.activeAnimation = MOB_ANIMATION.WALK_RIGHT;
        this.type = type;

        this.speed = 2;
    }

}

