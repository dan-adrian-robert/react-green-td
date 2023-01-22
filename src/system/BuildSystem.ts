import {BuildPlace} from "../entities/BuildPlace";
import {Engine} from "../engine/Engine";
import {Point} from "../utils/pathfinder";
import {boxOverlaps} from "../utils/utils";

export class BuildSystem {
    buildPlaceSize = 64;

    addBuildPlace(buildPlace: BuildPlace): void {
        Engine.addBuildPlace(buildPlace);
    }

    removeBuildPlace(): void {
        const itemIndex = 1;
        Engine.removeBuildPlace(itemIndex);
    }

    getBuildPlaceClicked(mousePos: Point): number {
        const list: Array<BuildPlace> = Engine.getBuildPlaceList();

        for (let i = 0; i < list.length; i ++) {
            const pos: Point = list[i].pos;
            if (boxOverlaps(mousePos, pos, this.buildPlaceSize)) {
                return i;
            }
        }

        return -1;
    }

}