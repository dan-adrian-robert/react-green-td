import {createSelector} from "@reduxjs/toolkit";

const mainState = (state: any) => state;
export const getEngineData = createSelector(mainState, ({engine}) => engine);
