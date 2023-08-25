import {Engine} from "../engine/Engine";
import {ASSET_NAMES} from "../types/image.types";
import {ConfigMap} from "../Images";
import {TOWER_CONFIG} from "../config/tower.config";
import {Container, Sprite, Texture, Text, TextStyle, Graphics} from "pixi.js";
import {LAYER_NAMES} from "../types/types";
import {getBoxList} from "../utils/ui.utils";

export class BuildMenuSystem {
    buildPlaceSize = 64;

    buildTowerTypes = () => {

    }

    buildTowerList = (): void => {
        const textureMap = Engine.getTextureMap();
        const towerTextureMap = textureMap[ASSET_NAMES.TOWERS];

        const { animations } = ConfigMap[ASSET_NAMES.TOWERS];
        const animationKeys = Object.keys(animations);
        const towerNames = animationKeys.map((key: string) => {
            return animations[key][0].split('.')[0];
        });

        const buildUIContainer: Container = Engine.getGameLayer(LAYER_NAMES.BuildUI);

        const boxSize = {width:100, height: 100};
        const boxList = getBoxList(buildUIContainer, boxSize,30,4,30);


        towerNames.map((towerName: string, towerIndex: number) => {
            const config = TOWER_CONFIG[towerName];
            const { data, ui } = config;
            const { tower } = ui;
            const {  assetName, size } = tower;

            const position = boxList[towerIndex];

            const towerTexture: Texture =  towerTextureMap[towerName];
            const towerSprite = Sprite.from(towerTexture);

            towerSprite.width = size.width;
            towerSprite.height = size.height;

            const style = new TextStyle({
                fontFamily: ['Helvetica', 'Arial', 'sans-serif'],
                fontSize:18,
            });
            let text = new Text(assetName,style)


            const towerContainer:Container = new Container();
            towerContainer.position = position;
            let obj = new Graphics();
            obj.beginFill(0xff0000);
            obj.drawRect(0, 0, boxSize.width, boxSize.height);
            towerContainer.addChild(obj);

            towerContainer.addChild(towerSprite);
            towerContainer.addChild(text);
            towerContainer.parent = buildUIContainer;

            towerContainer.addChild(text);
            //
            // config.data.container = towerContainer;
            // const towerType: TowerType = new TowerType(config);
            //
            buildUIContainer.addChild(towerContainer);
            return null;
        })
    }
}