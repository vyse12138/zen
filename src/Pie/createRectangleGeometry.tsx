import{BufferGeometry,BufferAttribute }from 'three'
export const createRectangleGeometry = (
    leftTop: THREE.Vector3,
    rightTop: THREE.Vector3,
    rightBottom: THREE.Vector3,
    leftBottom: THREE.Vector3
) => {
    const geometry = new BufferGeometry();

    const vertices = new Float32Array([
        ...leftBottom.toArray(),
        ...rightBottom.toArray(),
        ...rightTop.toArray(),

        ...rightTop.toArray(),
        ...leftTop.toArray(),
        ...leftBottom.toArray(),
    ]);
    const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0]);
    geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
    return geometry;
};