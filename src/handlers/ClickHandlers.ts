import {Engine} from "../engine/Engine";

export const handleTileClick = (sprite: any, metadata: any ) => {
    const editMode = !Engine.getConfigData().drawMode;
    const insertMode =  Engine.getConfigData().insertMode;

    const addTowerMode: boolean = Engine.getConfigData().addTowerMode;

    if (insertMode) {
        Engine.setNodes(sprite.position, metadata);
    } else if (editMode)  {
        Engine.changeSpriteTexture(sprite, metadata);
    }

    if (addTowerMode) {
        Engine.addTowerPlace(metadata);
        return;
    }

    handleInGameClick(metadata)
}

export const handleTileMouseOver = (sprite: any, metadata: any ) => {
    Engine.changeSpriteTexture(sprite, metadata);
}

export const handleInGameClick = (metadata: any) => {
    console.log(metadata);
}

export const handleBuildingPlaceClick = (metadata: any) => {
   console.log('Handle tower click', metadata);
}
