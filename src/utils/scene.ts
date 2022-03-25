import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import aa from '../../docs/assets/3d1.jpg'
export const initCanvas = ({
  canvas,
  size,
  data,
  transparent,
  background
}: {
  canvas: HTMLCanvasElement
  size: number
  data: number[][]
  transparent?: boolean
  background?: string
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
    alpha: transparent
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(size, size)

  // scene
  const scene = new THREE.Scene()

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(50, 30, 20)
  directionalLight2.position.set(-50, -30, -20)

  !transparent && (scene.background = new THREE.Color())

  scene.add(directionalLight)
  scene.add(directionalLight2)

  // background
  if (background) {
    const loader = new THREE.TextureLoader()
    const texture = loader.load(background)
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    const shader = THREE.ShaderLib.equirect
    const material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    })
    material.uniforms.tEquirect.value = texture
    const plane = new THREE.BoxBufferGeometry(140, 140, 140)
    const bgMesh = new THREE.Mesh(plane, material)
    scene.add(bgMesh)
  }

  // camera
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  camera.position.z = 5
  camera.position.x = -5
  camera.position.y = 12

  // control
  const control = new OrbitControls(camera, canvas)
  control.autoRotate = false
  control.enableDamping = true
  control.maxDistance = 50
  control.screenSpacePanning = false
  control.target = new THREE.Vector3(
    Math.sqrt(data[0].length),
    0,
    -Math.sqrt(data.length)
  )

  return [renderer, scene, camera, control]
}
