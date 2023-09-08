import {TOWER_TYPE_ASSET_MAP, TowerTypes} from "../config/tower.config";
import {Tower} from "../entities/Tower";
import {Engine} from "../engine/Engine";
import {LAYER_NAMES} from "../types/types";
import {Container, Sprite} from "pixi.js";
import {ASSET_NAMES} from "../types/image.types";

export class TowerSystem {
  addTower = (towerType: TowerTypes)=> {
    //Add the tower to the towerList;
    const towerLayer: Container =  Engine.getGameLayer(LAYER_NAMES.TowerContainer);
    const newTower = new Tower(towerLayer, towerType);
    Engine.addTower(newTower);

    //Texture container
    const textureMap = Engine.getTextureMap();
    const towerMap = textureMap[ASSET_NAMES.TOWERS];

    const towerTexture = towerMap[TOWER_TYPE_ASSET_MAP[towerType]];
    const towerSprite: Sprite = Sprite.from(towerTexture);

    const targetBuildPlace: any = Engine.getGameLayer(LAYER_NAMES.TowerPlaceContainer);

    const targetBuildingPlace = Engine.getSelectedBuildingPlace();

    const list = targetBuildPlace.children.map((item: Sprite) => item.name);

    const bpIndex = list.findIndex((item: any) => item === targetBuildingPlace)

    if (bpIndex < 0) {
      return;
    }

    const target = targetBuildPlace.children[bpIndex];

    towerSprite.interactive = true;
    towerSprite.buttonMode = true;
    towerSprite.width = 65;
    towerSprite.height = 65;

    towerSprite.position.x = target.x;
    towerSprite.position.y = target.y;
    towerLayer.addChild(towerSprite);

    Engine.setSelectedBuildingPlace(null);

  }
}