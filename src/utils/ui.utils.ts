import {Container} from "pixi.js";
import {UI_ANIMATION, UI_POSITION} from "../config/globals";
import gsap from "gsap";
import {Engine} from "../engine/Engine";

export const buildMenuSlideIn = (container: Container): void => {
    const position = UI_POSITION.buildMenu.openedPosition;
    const duration = UI_ANIMATION.buildMenu.duration;

    gsap.timeline()
        .to(container.position, {duration, ...position} )
        .call(() => {
            Engine.toggleMenuState();
        });
}

export const buildMenuSlideOut = (container: Container): void => {
    const position = UI_POSITION.buildMenu.closedPosition;
    const duration = UI_ANIMATION.buildMenu.duration;

    gsap.timeline()
        .to(container.position, {duration, ...position} )
        .call(() => {
            Engine.toggleMenuState();
        });
}

export const getBoxList = (parentContainer: Container, boxSize:{width: number, height: number}, gap: number, boxCount: number, offsetY: number ) => {
    const {position, width, height} = parentContainer;
    const parentSize = {width, height};

    const leftOffset = Math.floor((parentSize.width - boxSize.width) / 2);

    const list = [];
    for (let i = 1; i <= boxCount; i++ ) {
        list.push({
            x: leftOffset,
            y: offsetY + gap * i + boxSize.height * (i-1),
        });
    }
    return list;
}