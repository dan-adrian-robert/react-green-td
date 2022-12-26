import {GameLayerMap, LAYER_NAMES} from "../types/types";

export const CANVAS_CONFIG = {
    width: 1024,
    height: 768
}

export const UI_CANVAS_CONFIG = {
    width: 1024,
    height: 100,
    gap: 8,
    size: 32,
}

export const LAYER_INDEX_MAP: GameLayerMap = {
    //ROOT
    [LAYER_NAMES.EditContainer]: 0,
    [LAYER_NAMES.GameContainer]: 0,

    //Game Map
    [LAYER_NAMES.MapContainer]: 0,
    [LAYER_NAMES.EnemyContainer]: 1,
    [LAYER_NAMES.MapPathContainer]: 2
}

export const COLORS: Record<string,number> = {
    RED: 0xFF0000,
    YELLOW: 0xFFFF00
}

export const DEBUG_POINTS = {
    pointSize: 4
}