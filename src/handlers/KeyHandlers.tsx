import {Engine} from "../engine/Engine";

export const onKeyPressed = (event: any) => {
    if (event.code === 'KeyZ') {
        Engine.toggleEditMode();
    }
    if (event.code === 'KeyX') {
        Engine.toggleInsertMode();
    }

    if (event.code === 'KeyC') {
        Engine.toggleAddTowerMode();
    }

    if (event.code === 'KeyV') {
        Engine.toggleAddTowerPlaceMode();
    }

}