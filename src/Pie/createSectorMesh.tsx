import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import { createSectorGeometry } from "./createSectorGeometry";

export const createSectorMesh = (
    radius: number,
    height: number,
    radialSegments: number,
    heightSegments: number,
    openEnded: boolean,
    thetaStart: number,
    thetaLength: number,
    color: THREE.Color
) => {
    const sectorGeometry = createSectorGeometry(
        radius,
        height,
        radialSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength
    );
    const standardMaterial = new MeshStandardMaterial({
        color: color,
    });
    const basicMaterial = new MeshBasicMaterial({
        color: color,
    });
    const sectorMesh = sectorGeometry.map((geometry, index) => {
        if (!index) {
            return new Mesh(geometry, standardMaterial);
        }
        return new Mesh(geometry, basicMaterial);
    });
    return sectorMesh;
};