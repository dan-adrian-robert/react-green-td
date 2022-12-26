import {Engine} from "../engine/Engine";
import {Mob} from "../entities/Mob";
import {getDeltaDistance, getPointCenter} from "../utils/tileUtils";
import {Point} from "../utils/pathfinder";
import {MOB_ANIMATION} from "../types/mobs.types";
import {UI_CANVAS_CONFIG} from "../config/globals";

export class MobSystem {
    minDistance = 4;

    applyLogic(ticker: number) : void {
        this.animateMobs(ticker);
        this.moveMobs(ticker);
    }

    moveMobs(ticker: number): void {
        if (ticker % 4 !== 0 ) {
            return;
        }

        Engine.getMobList().map((mob: Mob) => {
            const mobPos: any = mob.getContainer().position;
            const path = Engine.getGameMap().path;
            const checkPointCenter:Point = getPointCenter(path[mob.checkpointIndex], UI_CANVAS_CONFIG.size);
            const mobCenter: Point = mob.getCenter();

            if (!checkPointCenter) {
                return null;
            }

            const distance: Point = getDeltaDistance(mobCenter, checkPointCenter);

            if (mob.activeAnimation === MOB_ANIMATION.WALK_RIGHT ||
                mob.activeAnimation === MOB_ANIMATION.WALK_LEFT) {

                let direction: number = 1;
                //Choose direction up or down for y
                if (mobCenter.y < checkPointCenter.y) {
                    direction = 1;
                } else {
                    direction = -1;
                }

                //Update the Y path
                if (Math.abs(mobCenter.y - checkPointCenter.y) > this.minDistance) {
                    mobPos.y += direction * mob.speed;
                }

                //Normal update the x path
                if (distance.x > this.minDistance) {
                    mobPos.x += mob.speed;
                }
            }

            if (mob.activeAnimation === MOB_ANIMATION.WALK_DOWN ||
                mob.activeAnimation === MOB_ANIMATION.WALK_UP) {

                let direction: number;

                //Choose direction up or down for x
                if (mobCenter.x < checkPointCenter.x) {
                    direction = 1;
                } else {
                    direction = -1;
                }

                //Update the Y path
                if (Math.abs(mobCenter.x - checkPointCenter.x) > this.minDistance) {
                    mobPos.x += direction * mob.speed;
                }

                //Normal update the x path
                if (distance.y > this.minDistance) {
                    mobPos.y += mob.speed;
                }
            }

            if (distance.x <= this.minDistance && distance.y <= this.minDistance) {
               if ( mob.checkpointIndex === path.length -1) {
                   console.log('delete mob and damage the base');
               } else {
                   mob.checkpointIndex +=1;
                   const nextCp: Point = path[mob.checkpointIndex];
                   mob.activeAnimation = this.getNextAnimationType(nextCp, mob, this.minDistance);
               }
            }

            return null;
        })
    }

    getNextAnimationType = (nextCp: Point, mob: Mob, minSize: number): MOB_ANIMATION => {
        const mobCenter: Point = mob.getCenter();

        if (mob.activeAnimation === MOB_ANIMATION.WALK_LEFT ||
            mob.activeAnimation === MOB_ANIMATION.WALK_RIGHT) {

            const distance = mobCenter.y - nextCp.y;

            if (distance < minSize) {
                return MOB_ANIMATION.WALK_DOWN;
            }

            if (distance < minSize && distance < 0) {
                return MOB_ANIMATION.WALK_UP;
            }
        }

        if (mob.activeAnimation === MOB_ANIMATION.WALK_UP ||
            mob.activeAnimation === MOB_ANIMATION.WALK_DOWN) {

            const distance = mobCenter.x - nextCp.x

            if (distance < minSize) {
                return MOB_ANIMATION.WALK_RIGHT;
            }

            if (distance && distance < 0) {
                return MOB_ANIMATION.WALK_LEFT;
            }
        }

        return mob.activeAnimation;
    }

    animateMobs(ticker: number) : void  {
        if (ticker % 8 !== 0 ) {
            return;
        }

        Engine.getMobList().map((mob: Mob) => {
            if (!mob.walking) {
                return null;
            }

            mob.animationIndex += 1;
            mob.animationIndex %= 5;

            const animationTextureList = Engine.getMobTextureMap()[mob.type][mob.activeAnimation];
            mob.getMobSprite().texture = animationTextureList[mob.animationIndex];
            return null;
        })
    }
}