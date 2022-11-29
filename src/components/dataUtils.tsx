import {ConfigUiData} from "../types/types";

export const getConfigView = (configData: ConfigUiData) => {
    return (
        <div>
             <div> {`Draw mode: ${configData.drawMode ? 'true':'false'}`}</div>
             <div> {`Selected Item: ${configData.selectedItem} `}</div>
        </div>
    )
}