import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const initCanvas = ({
  canvas,
  size,
  data
}: {
  canvas: HTMLCanvasElement
  size: number
  data: number[][]
}): [
  THREE.WebGLRenderer,
  THREE.Scene,
  THREE.PerspectiveCamera,
  OrbitControls
] => {
  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(size, size)

  // scene
  const scene = new THREE.Scene()

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(50, 30, 20)
  directionalLight2.position.set(-50, -30, -20)

  scene.add(directionalLight)
  scene.add(directionalLight2)

  // camera
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  camera.position.z = 5
  camera.position.x = -5
  camera.position.y = 12

  // control
  const control = new OrbitControls(camera, canvas)
  control.autoRotate = false
  control.enableDamping = true
  control.maxDistance = 80
  control.screenSpacePanning = false
  control.target = new THREE.Vector3(
    Math.sqrt(data[0].length),
    0,
    -Math.sqrt(data.length)
  )

  return [renderer, scene, camera, control]
}
