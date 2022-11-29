export enum MOB_ANIMATION {
    WALK_DOWN = 'WALK_DOWN',
    WALK_UP = 'WALK_UP',
    WALK_LEFT = 'WALK_LEFT',
    WALK_RIGHT = 'WALK_RIGHT',
}

export enum MOB_TYPE {
    OGRE = 'OGRE'
}

export type ANIMATION_CONFIG_RECORD = {
    [mob in MOB_ANIMATION]: any;
}

export type MOB_ANIMATION_CONFIG = {
    [mob in MOB_TYPE]: ANIMATION_CONFIG_RECORD
}

export type MOB_TEXTURE_MAP = {
    [mob in MOB_TYPE]: ANIMATION_CONFIG_RECORD
}