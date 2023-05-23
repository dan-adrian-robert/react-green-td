import {Engine} from "../engine/Engine";
import {buildMenuSlideIn, buildMenuSlideOut} from "../utils/ui.utils";

export const handleTileClick = (sprite: any, metadata: any ) => {
    const editMode = !Engine.getConfigData().drawMode;
    const insertMode =  Engine.getConfigData().insertMode;

    const addTowerMode: boolean = Engine.getConfigData().addTowerMode;

    console.log('handleTileClick', insertMode);

    if (insertMode) {
        Engine.setNodes(sprite.position, metadata);
    } else if (editMode)  {
        Engine.changeSpriteTexture(sprite, metadata);
    }

    if (addTowerMode) {
        Engine.addTowerPlace(metadata);
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
