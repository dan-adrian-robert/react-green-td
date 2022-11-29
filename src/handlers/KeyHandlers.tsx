import { Engine } from "../engine/Engine";

export const onKeyPressed = (event: any) => {
    if (event.code === 'KeyZ') {
        Engine.toggleEditMode();
    }
    if (event.code === 'KeyX') {
        Engine.toggleInsertMode();
    }
}