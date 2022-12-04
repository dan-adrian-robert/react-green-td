import React, {useEffect} from 'react';
import './App.css';
import * as PIXI from 'pixi.js'
import {Engine} from "./engine/Engine";
import {BUILD_ENV, BUILD_SYSTEMS, INIT_ASSETS} from "./system/Main";
import {CANVAS_CONFIG, UI_CANVAS_CONFIG} from "./config/globals";
import {ANIMATION_LOOP, GAME_LOOP} from "./system/GameLoop";
import {onKeyPressed} from "./handlers/KeyHandlers";
import {exportMapToJson} from "./utils/export.utils";

// @ts-ignore
window["PIXI"] = PIXI;

function App() {
    const canvasRef: any = React.useRef(null);
    const configCanvasRef: any = React.useRef(null);

    useEffect(() => {
        Engine.setApp(new PIXI.Application({ width: CANVAS_CONFIG.width, height: CANVAS_CONFIG.height }));
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
            <div>
                <button onClick={() => {Engine.findPath()}}>FindPath</button>
                <button onClick={() => {exportMapToJson(Engine.getGameMap())}}>Export</button>
                <button onClick={() => {Engine.addMob()}}>Add Mobs</button>
            </div>
            <div ref={configCanvasRef}>
            </div>
            <div ref={canvasRef}>
            </div>
        </div>

  );
}

export default App;
