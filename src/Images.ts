import {ASSET_NAMES, ImageMap, JSONConfig} from "./types/image.types";

export const AssetPaths : ImageMap = {
    [ASSET_NAMES.TILE_MAP]: require('./assets/tiles/tiles.png'),
    [ASSET_NAMES.UI]: require('./assets/tiles/ui.png'),
    [ASSET_NAMES.OGRE]: require('./assets/mobs/ogre.png'),
    [ASSET_NAMES.TOWERS]: require('./assets/towers/towers.png'),
    [ASSET_NAMES.BUILD_UI]: require('./assets/tiles/buildUI.png'),
}

export const ConfigMap: JSONConfig = {
    [ASSET_NAMES.TILE_MAP]: require('./assets/tiles/tiles.json'),
    [ASSET_NAMES.UI]: require('./assets/tiles/ui.json'),
    [ASSET_NAMES.OGRE]: require('./assets/mobs/ogre.json'),
    [ASSET_NAMES.TOWERS]: require('./assets/towers/towers.json'),
    [ASSET_NAMES.BUILD_UI]: require('./assets/tiles/buildUI.json'),
}