import {Engine} from "../engine/Engine";
import {buildMenuSlideIn, buildMenuSlideOut} from "../utils/ui.utils";
import {addBuildingPlaceToScene} from "../utils/buildingPlace.utils";
import {LAYER_NAMES} from "../types/types";
import {Point} from "../utils/pathfinder";
import {getPointFromTilePosition} from "../utils/tileUtils";
import {BuildPlace} from "../entities/BuildPlace";

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
        const buildingPlaceLayer = Engine.getGameLayer(LAYER_NAMES.TowerPlaceContainer)

        const bpPosition: Point = getPointFromTilePosition(metadata);

        const bp: BuildPlace = new BuildPlace(bpPosition);

        addBuildingPlaceToScene(bpPosition, bp, buildingPlaceLayer);
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

export const handleBuildingPlaceClick = (metadata: {position: any, id: string}) => {
    buildMenuSlideIn(Engine.getBuildMenuContainer(), metadata.id);
}

export const handleBuildMenuClick = (metadata: any): void => {
    console.log('build Menu is clicked');
}
