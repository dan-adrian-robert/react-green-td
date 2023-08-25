import React, {useEffect, useState} from 'react';
import * as PIXI from 'pixi.js'
import {Engine} from "../engine/Engine";
import {onKeyPressed} from "../handlers/KeyHandlers";

import {LAYER_NAMES} from "../types/types";
import {CANVAS_CONFIG, UI_CANVAS_CONFIG} from "../config/globals";
import {BUILD_ENV, BUILD_SYSTEMS, INIT_ASSETS} from "../system/Main";
import {ANIMATION_LOOP, GAME_LOOP} from "../system/GameLoop";
import {DraggableCard} from "./DraggableCard";
import {Button} from "@mui/material";

// @ts-ignore
window["PIXI"] = PIXI;

export const GameView = () => {
    const [debuggerOpen, setDebuggerOpen] = useState(false);
    const canvasRef: any = React.useRef(null);
    const configCanvasRef: any = React.useRef(null);

    useEffect(() => {
        Engine.setApp(new PIXI.Application({ width: CANVAS_CONFIG.width, height: CANVAS_CONFIG.height }));
        Engine.getApp().stage.name = LAYER_NAMES.GameContainer;
        Engine.setConfigApp(new PIXI.Application({ width: UI_CANVAS_CONFIG.width, height: UI_CANVAS_CONFIG.height}));

        canvasRef?.current.appendChild(Engine.getApp().view);
        configCanvasRef?.current.appendChild(Engine.getConfigApp().view);

        INIT_ASSETS().then(
            () => {
                BUILD_ENV();
                BUILD_SYSTEMS();
            }
        );
        Engine.getApp().ticker.add((delta ) => GAME_LOOP(delta));
        setInterval(() => {ANIMATION_LOOP()}, 1000/30);
    }, [])

    return (
        <div className="mainView"  onKeyDown={onKeyPressed} tabIndex={-1}>
            <Button onClick={()=>{setDebuggerOpen(!debuggerOpen)}} variant={'contained'}>
                {debuggerOpen ? 'close' : 'open'} Debugger
            </Button>
            <DraggableCard
                hide={!debuggerOpen}
                onClose={() => {
                    setDebuggerOpen(false);
                }}
            />
            <div ref={configCanvasRef}>
            </div>
            <div ref={canvasRef}>
            </div>
        </div>
    );
}
