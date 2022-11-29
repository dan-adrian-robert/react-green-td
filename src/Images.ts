import {ASSET_NAMES, ImageMap, JSONConfig} from "./types/image.types";

export const AssetPaths : ImageMap = {
    [ASSET_NAMES.TILE_MAP]: require('./assets/tiles/tiles.png'),
    [ASSET_NAMES.UI]: require('./assets/tiles/ui.png'),
    [ASSET_NAMES.OGRE]: require('./assets/mobs/ogre.png')
}

export const ConfigMap: JSONConfig = {
    [ASSET_NAMES.TILE_MAP]: require('./assets/tiles/tiles.json'),
    [ASSET_NAMES.UI]: require('./assets/tiles/ui.json'),
    [ASSET_NAMES.OGRE]: require('./assets/mobs/ogre.json')
}