import {Engine} from "../engine/Engine";

export const GAME_LOOP = (delta: number) => {
}

export const ANIMATION_LOOP = () => {
    Engine.updateTicker();

    Engine.getMobSystem()?.applyLogic(Engine.getTicker());
}