import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box} from "@mui/material";
import {DebugSheet} from "./DebugSheet";
import styled from "@emotion/styled";

interface IProps {
    config: Record<string, any>
}

const CustomAccordion = styled(Accordion)({
    backgroundColor: 'rgba(0,0,0, 0)',
});

const CustomAccordionSummary = styled(AccordionSummary)({
    backgroundColor: 'rgba(0,0,0, 0)',
    color:'white',
    borderBottom:'1px solid rgba(0,0,0,1)'
});

const CustomAccordionDetails = styled(AccordionDetails)({
    backgroundColor: 'rgba(0,0,0, 0)',
    color:'white',
});

export const DebuggerInfo: React.FC<IProps> = ({config}) => {
    return (
        <Box>
            {Object.keys(config).map((key, itemKey) => {
                return (
                    <CustomAccordion key={itemKey}>
                        <CustomAccordionSummary
                            aria-controls="panel2d-content"
                            id="panel2d-header"
                        >
                            <Box sx={{borderBottom:'2px solid rgba(255,255,255,0.5)'}}>{key}</Box>
                        </CustomAccordionSummary>
                        <CustomAccordionDetails>
                            <DebugSheet config={config[key]}/>
                        </CustomAccordionDetails>
                    </CustomAccordion>
                )
            })}
        </Box>
    );
}
