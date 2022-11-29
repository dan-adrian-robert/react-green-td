import {Engine} from "../engine/Engine";

export const handleTileClick = (sprite: any, metadata: any ) => {
    const editMode = !Engine.getConfigData().drawMode;
    const insertMode =  Engine.getConfigData().insertMode;

    if (insertMode) {
        Engine.setNodes(sprite.position, metadata);
    } else if (editMode)  {
        Engine.changeSpriteTexture(sprite, metadata);
    }
}

export const handleTileMouseOver = (sprite: any, metadata: any ) => {
    Engine.changeSpriteTexture(sprite, metadata);
}
