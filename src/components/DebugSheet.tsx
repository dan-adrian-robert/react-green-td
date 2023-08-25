import React from "react";
import {Box} from "@mui/material";

interface IProps {
    config: Record<string, any>
}

const getKeyValue = (itemValue: any) => {
    switch (typeof itemValue) {
        case 'boolean':
            return itemValue ? 'true':'false';
        default:
            return itemValue;
    }
}

export const DebugSheet:React.FC<IProps> = ({config}) => {

    if (!config) {
        return <></>
    }

    return (
        <Box sx={{ display: 'flex', flexDirection:'column', gap:'8px' }}>
            {Object.keys(config).map((key, keyItem) => {
                return <Box key={keyItem}>{key}:{getKeyValue(config[key])}</Box>
            })}
        </Box>
    )
}
