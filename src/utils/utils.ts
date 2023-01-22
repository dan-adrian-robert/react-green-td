import {Point} from "./pathfinder";

export const boxOverlaps = (pointA: Point,pointB: Point, distance: number): boolean => {
   return (
       pointA.x >= pointB.x && pointA.x <= pointB.x + distance &&
       pointA.y >= pointB.y && pointA.y <= pointB.y +distance
   );
}

