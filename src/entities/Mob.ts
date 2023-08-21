import {Container, Sprite} from "pixi.js";
import {Point} from "../utils/pathfinder";
import {MOB_ANIMATION, MOB_TYPE} from "../types/mobs.types";
import {MOB_CONTAINER_NAME} from "../config/mob.config";
const {v4 : UUID} = require('uuid');

export class Mob {
    container: Container;
    checkpointIndex: number;
    animationIndex: number;
    activeAnimation: MOB_ANIMATION;
    type: MOB_TYPE;
    walking: boolean;
    speed: number;
    id: string;

    constructor(container: Container, type: MOB_TYPE, checkpointIndex: number) {
        this.container = container

        this.checkpointIndex = checkpointIndex;

        this.animationIndex = 0;
        this.activeAnimation = MOB_ANIMATION.WALK_RIGHT;
        this.type = type;

        this.walking = true;
        this.speed = 4;
        this.id = UUID();
    }

    getMobSprite():Sprite {
        return this.container.getChildByName(MOB_CONTAINER_NAME.EnemySprite);
    }

    getContainer(): Container {
        return this.container;
    }

    getSize(): {width: number, height: number} {
        const {width, height} = this.getMobSprite();
        return {
            width,
            height
        }
    }

    getCenter(): Point {
        const size = this.getSize();
        const position = this.getContainer().position;
        return {
            x: position.x + size.width/2,
            y: position.y + size.height/2,
        }
    }

}

