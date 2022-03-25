import{CylinderGeometry,Vector3 }from 'three'
import { createRectangleGeometry } from './createRectangleGeometry';

export const createSectorGeometry = (
    radius: number,
    height: number,
    radialSegments: number,
    heightSegments: number,
    openEnded: boolean,
    thetaStart: number,
    thetaLength: number
) => {
    const tempCylinder = new CylinderGeometry(
        radius,
        radius,
        height,
        1,
        1,
        openEnded,
        thetaStart,
        thetaLength
    );
    const positions = tempCylinder.attributes.position.array;
    const points = [];
    for (let i = 0; i < positions.length; i += 3) {
        const point = new Vector3(
            positions[i],
            positions[i + 1],
            positions[i + 2]
        );
        points.push(point);
    }
    const cylinder = new CylinderGeometry(
        radius,
        radius,
        height,
        radialSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength
    );
    const frontPlane = createRectangleGeometry(
        points[4],
        points[0],
        points[2],
        points[7]
    );
    const rearPlane = createRectangleGeometry(
        points[1],
        points[4],
        points[7],
        points[3]
    );
    return [cylinder, frontPlane, rearPlane];
};