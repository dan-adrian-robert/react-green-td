import {Engine} from "../engine/Engine";
import {Mob} from "../entities/Mob";

export class MobSystem {
    moveMobs(ticker: number): void {
        if (ticker % 4 !== 0 ) {
            return;
        }

        Engine.getMobList().map((mob: Mob) => {
            mob.sprite.position.x += mob.speed;
            mob.animationIndex += 1;
            mob.animationIndex %= 5;

            const animationTextureList = Engine.getMobTextureMap()[mob.type][mob.activeAnimation];
            mob.sprite.texture = animationTextureList[mob.animationIndex];
            return null;
        })
    }
}