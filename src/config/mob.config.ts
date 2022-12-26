import {MOB_ANIMATION_CONFIG, MOB_TYPE} from "../types/mobs.types";

export const MOB_CONFIG: MOB_ANIMATION_CONFIG = {
    [MOB_TYPE.OGRE]: {
        WALK_RIGHT: 'ogre_w_right',
        WALK_LEFT: 'ogre_w_left',
        WALK_UP: 'ogre_w_up',
        WALK_DOWN: 'ogre_w_down',
    }
}

export const MOB_CONTAINER_NAME: any = {
    Enemy : 'Enemy',
    Center : 'Center',
    EnemySprite : 'EnemySprite',
    CheckPoint : 'CheckPoint'
}