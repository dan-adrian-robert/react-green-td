import {Engine} from "../engine/Engine";
import {Mob} from "../entities/Mob";
import {distanceBetweenPoints} from "../utils/tileUtils";

export class MobSystem {
    moveMobs(ticker: number): void {
        if (ticker % 8 !== 0 ) {
            return;
        }

        // Engine.getMobList().map((mob: Mob) => {
        //     const distance = distanceBetweenPoints(mob.nextCheckPoint, mob.sprite.position);
        //
        //     console.log(distance)
        //
        //     mob.sprite.position.x += mob.speed;
        //     mob.animationIndex += 1;
        //     mob.animationIndex %= 5;
        //
        //     const animationTextureList = Engine.getMobTextureMap()[mob.type][mob.activeAnimation];
        //     mob.sprite.texture = animationTextureList[mob.animationIndex];
        //     return null;
        // })
    }
}