import * as THREE from 'three'
import { LineData } from '../charts/Line3D'

export default class Axis {
  constructor({ scene, data }: { scene: THREE.Scene; data: LineData[] }) {
    this.scene = scene
    this.data = data
    const geometry = new THREE.CylinderGeometry(0.02, 0.02, 10, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 })
    const axis = new THREE.InstancedMesh(geometry, material, 100)

    let matrix = new THREE.Matrix4()
    const color = new THREE.Color('#4caf50')
    let i = 0

    // y axis
    matrix.setPosition(0, 5, -10)
    axis.setMatrixAt(i++, matrix)
    // z axis
    matrix.makeRotationX(Math.PI / 2).setPosition(0, 0, -5)
    axis.setMatrixAt(i++, matrix)

    // x axis
    matrix
      .makeRotationZ(Math.PI / 2)
      .scale(new THREE.Vector3(1, data[0].xValues.length / 10, 1))
      .setPosition(data[0].xValues.length / 2, 0, 0)
    axis.setMatrixAt(i++, matrix)
    scene.add(axis)
  }
  scene: THREE.Scene
  data: LineData[] | undefined
}
