
import {testAction} from "./actions";
import {EngineState} from "./types";

const initialState: EngineState = {
    menuOpen: false,
}

export const toggleMenu = (state: any) => {
    return {
        ... state,
        menuOpen: !state.menuOpen
    }
}

export function EngineReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case testAction.type:
            return toggleMenu(state);
        default:
           return state;
    }
}