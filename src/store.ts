import {configureStore} from "@reduxjs/toolkit";
import {EngineReducer} from "./reducer";

export const store = configureStore({
    reducer: {
        engine: EngineReducer,
    },
})
