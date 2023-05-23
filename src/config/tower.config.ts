export enum TowerTypes {
    IceTower = 'IceTower',
    FireTower = 'FireTower',
    OrbTower = 'OrbTower',
    MagicTower = 'MagicTower'
}

export const TOWER_LIST = [
    TowerTypes.FireTower,
    TowerTypes.IceTower,
    TowerTypes.OrbTower,
    TowerTypes.MagicTower,
]

const IceTowerConfig = {
    data: {
        price: 100,
        name: 'Ice Tower',
        type:TowerTypes.IceTower,
    },
    ui: {
        tower: {
            assetName: 'iceTower',
            position: {
                x: 50,
                y: 50
            },
            size: {
                width: 100,
                height: 100
            }
        }
    }
}
const FireTowerConfig = {
    data: {
        price: 100,
        name: 'Fire Tower',
        type:TowerTypes.FireTower,
    },
    ui: {
        tower: {
            assetName: 'fireTower',
            position: {
                x: 50,
                y: 150
            },
            size: {
                width: 100,
                height: 100
            }
        }
    }
}
const OrbTowerConfig = {
    data: {
        price: 100,
        name: 'Orb Tower',
        type:TowerTypes.OrbTower,
    },
    ui: {
        tower: {
            assetName: 'orbTower',
            position: {
                x: 50,
                y: 250
            },
            size: {
                width: 100,
                height: 100
            }
        }
    }
}
const MagicTowerConfig = {
    data: {
        price: 100,
        name: 'Magic Tower',
        type:TowerTypes.MagicTower,
    },
    ui: {
        tower: {
            assetName: 'magicTower',
            position: {
                x: 50,
                y: 350
            },
            size: {
                width: 100,
                height: 100
            }
        }
    }
}

export const TOWER_CONFIG: any = {
    ['ice_t1']: IceTowerConfig,
    ['fire_t1']: FireTowerConfig,
    ['orb_t1']: OrbTowerConfig,
    ['magic_t1']: MagicTowerConfig,
}

