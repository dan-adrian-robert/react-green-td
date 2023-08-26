import {Engine} from "../engine/Engine";
import {buildMenuSlideIn, buildMenuSlideOut} from "../utils/ui.utils";
import {addBuildingPlaceToScene} from "../utils/buildingPlace.utils";
import {LAYER_NAMES} from "../types/types";

export const handleTileClick = (sprite: any, metadata: any ) => {
    const editMode = !Engine.getConfigData().drawMode;
    const insertMode =  Engine.getConfigData().insertMode;

    const addTowerMode: boolean = Engine.getConfigData().addTowerMode;
    const addBuildingPlace: boolean = Engine.getConfigData().addTowerPlaceMode;

    if (insertMode) {
        Engine.setNodes(sprite.position, metadata);
    } else if (editMode)  {
        Engine.changeSpriteTexture(sprite, metadata);
    }

    if (addTowerMode) {
        Engine.addTowerPlace(metadata);
        return;
    }

    if(addBuildingPlace) {
        const {row, col} = metadata;
        const buildingPlaceLayer = Engine.getGameLayer(LAYER_NAMES.TowerPlaceContainer)
        addBuildingPlaceToScene(row, col, buildingPlaceLayer);
        return;
    }

    buildMenuSlideOut(Engine.getBuildMenuContainer());

    handleInGameClick(metadata)
}

export const handleTileMouseOver = (sprite: any, metadata: any ) => {
    Engine.changeSpriteTexture(sprite, metadata);
}

export const handleInGameClick = (metadata: any) => {
    console.log(metadata);
}

export const handleBuildingPlaceClick = (metadata: any) => {
    buildMenuSlideIn(Engine.getBuildMenuContainer());
}

export const handleBuildMenuClick = (metadata: any): void => {
    console.log('build Menu is clicked');
}
