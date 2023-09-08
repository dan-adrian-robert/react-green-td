/**
 * Material-UI Card that you can drag and drop anywhere.
 */
import {Box, Button} from "@mui/material";
import Draggable from "react-draggable";
import CloseIcon from '@mui/icons-material/Close';
import {DebuggerInfo} from "./DebuggerInfo";
import React, {useEffect} from "react";
import {getGameDebugInfo} from "../utils/debugger.utils";
import {Engine} from "../engine/Engine";
import {exportMapToJson} from "../utils/export.utils";

const BoxStyle = {
    width: '25em',
    backgroundColor: 'rgba(0,0,0, 0.8)',
    color: "#ffffff" ,
    zIndex: 999,
}

interface IProps {
    hide: boolean
    onClose: any
}

export const DraggableCard: React.FC<IProps> = ({hide, onClose}) => {
    const [debuggerInfo, setDebuggerInfo]= React.useState<Record<string, any>>({});

    useEffect(() => {
        setInterval(() => {
            setDebuggerInfo(getGameDebugInfo());
        }, 200);
    },[]);

    return (
        <Draggable>
            <Box
                style={BoxStyle}
                flex={'flex'}
                gap={'8px'}
                display={'column'}
                sx={{display: hide? 'none':'block', position:'absolute', justifyContent:'flex-end'}}
            >
                <Box display={'flex'}>
                    <CloseIcon onClick={onClose} sx={{cursor:'pointer'}}/>
                </Box>
                <DebuggerInfo config={debuggerInfo}/>
                <Box display={'flex'} gap={'8px'}>
                    <Button variant='outlined' onClick={() => {Engine.addMob()}}>Add Mobs</Button>
                    <Button variant='outlined' onClick={() => {Engine.logMobs()}}>Log Mobs</Button>
                </Box>
                <Box display={'flex'} gap={'8px'}>
                    <Button variant='outlined' onClick={() => {Engine.logTowerPlace()}}>Log Tower Locations</Button>
                </Box>
                <Box display={'flex'} gap={'8px'}>
                    <Button variant='outlined' onClick={() => {Engine.findPath()}}>FindPath</Button>
                    <Button variant='outlined' onClick={() => {exportMapToJson(Engine.getGameMap())}}>Export Map</Button>
                    <Button variant='outlined' onClick={() => {Engine.saveBuildingPlaceList()}}>Save Tower Location</Button>
                </Box>
                <Box display={'flex'} gap={'8px'}>
                    <Button variant='outlined' onClick={() => {Engine.logEverything()}}>Log Everything</Button>
                </Box>

            </Box>
        </Draggable>
    );
};
