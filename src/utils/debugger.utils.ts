import {Engine} from "../engine/Engine";

export const getGameDebugInfo = () => {
    const configData = Engine.getConfigData();

    return {
        configData:{
            selectedItem : configData.selectedItem,
            boxSelectedItem: configData.boxSelectedItem,
            tileList: configData.tileList.length,
            specialBoxList: configData.specialBoxList.length,
            drawMode: configData.drawMode,
            insertMode: configData.insertMode,
            addTowerMode: configData.addTowerMode,
        },
    }
}