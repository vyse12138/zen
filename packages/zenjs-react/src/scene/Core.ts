import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Core {
  constructor({ canvas, size }: { canvas: HTMLCanvasElement; size: number }) {
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(size, size)

    // lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(50, 30, 20)
    directionalLight2.position.set(-50, -30, -20)
    this.scene.add(directionalLight)

    const light = new THREE.AmbientLight(0x808080) // soft white light
    this.scene.add(light)

    // camera
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    this.camera.position.set(-5, 12, 5)

    // control
    this.control = new OrbitControls(this.camera, canvas)
    this.control.autoRotate = false
    this.control.enableDamping = true
    this.control.maxDistance = 50
    this.control.screenSpacePanning = false
    this.control.target = new THREE.Vector3(10, 0, -1)
  }
  renderer: THREE.WebGLRenderer
  scene = new THREE.Scene()
  camera: THREE.PerspectiveCamera
  control: OrbitControls

  update = () => {
    this.control.update()
    this.renderer.render(this.scene, this.camera)
  }

  dispose = () => {
    this.renderer.dispose()
  }
}
