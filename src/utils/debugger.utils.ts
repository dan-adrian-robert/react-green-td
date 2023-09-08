import {Engine} from "../engine/Engine";

export const getGameDebugInfo = () => {
    const configData = Engine.getConfigData();

    const layerNamesList = Engine.getApp().stage.children.map((stage) => stage.name);
    const layerText = layerNamesList.reduce((accumulator, currentValue) => accumulator + ` ${currentValue}`, '');

    const bpIdList = Engine.getBuildPlaceList().map(item => item.id);

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
        debuggerInfo:{
            mobList: Engine.getMobList().length,
            towerList: Engine.getTowerList().length,
            menuOpened: Engine.getMenuState(),
            buildPlaceListSize: Engine.getBuildPlaceList().length,
            buildingPlaceList: '',
            selectedBuildingPlace: Engine.getSelectedBuildingPlace(),
        },
        layers: {
            gameLayers: layerText,
        }
    }
}