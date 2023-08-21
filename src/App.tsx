import React, {useEffect} from 'react';
import './App.css';
import * as PIXI from 'pixi.js'
import {Engine} from "./engine/Engine";
import {BUILD_ENV, BUILD_SYSTEMS, INIT_ASSETS} from "./system/Main";
import {CANVAS_CONFIG, UI_CANVAS_CONFIG} from "./config/globals";
import {ANIMATION_LOOP, GAME_LOOP} from "./system/GameLoop";
import {onKeyPressed} from "./handlers/KeyHandlers";
import {exportMapToJson} from "./utils/export.utils";
import {LAYER_NAMES} from "./types/types";
import {Box, Button} from "@mui/material";

// @ts-ignore
window["PIXI"] = PIXI;

function App() {
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
            <Box display={'flex'} gap={'8px'}>
                <Button variant='contained' onClick={() => {Engine.findPath()}}>FindPath</Button>
                <Button variant='contained' onClick={() => {exportMapToJson(Engine.getGameMap())}}>Export</Button>
                <Button variant='contained' onClick={() => {Engine.saveBuildingPlaceList()}}>Save Tower Location</Button>

            </Box>
            <Box display={'flex'} gap={'8px'}>
                <Button variant='contained' onClick={() => {Engine.addMob()}}>Add Mobs</Button>
                <Button variant='contained' onClick={() => {Engine.logMobs()}}>Log Mobs</Button>
            </Box>
            <Box display={'flex'} gap={'8px'}>
                <Button variant='contained' onClick={() => {Engine.logTowerPlace()}}>Log Tower Locations</Button>
            </Box>
            <div ref={configCanvasRef}>
            </div>
            <div ref={canvasRef}>
            </div>
        </div>

  );
}

export default App;
