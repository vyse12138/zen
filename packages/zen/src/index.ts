import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './index.css'
interface Options {
  data: number[][]
}
export const create = (canvas: HTMLCanvasElement, options: Options) => {
  // scene renderer camera control
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = false
  const scene = new THREE.Scene()

  // scene config
  const size = 400
  renderer.setSize(size, size)
  scene.background = new THREE.Color('#cccccc')
  camera.position.z = 5
  camera.position.x = 5
  camera.position.y = 5
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(50, 30, 20)
  directionalLight2.position.set(-50, -30, -20)
  scene.add(directionalLight)
  scene.add(directionalLight2)

  //color
  const color = [
    new THREE.Color('#f44336'),
    new THREE.Color('#ff9800'),
    new THREE.Color('#ffeb3b'),
    new THREE.Color('#4caf50'),
    new THREE.Color('#1769aa'),
    new THREE.Color('#3f51b5'),
    new THREE.Color('#9c27b0')
  ]
  // mesh
  const material = new THREE.MeshStandardMaterial()
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const cube = new THREE.InstancedMesh(
    geometry,
    material,
    options.data.length * options.data[0].length
  )
  const matrix = new THREE.Matrix4()
  let i = 0

  for (let z = 0; z < options.data.length; z++) {
    for (let x = 0; x < options.data[0].length; x++) {
      if (options.data[z][x] === 0) {
        continue
      }
      matrix.makeScale(1, options.data[z][x], 1)
      matrix.setPosition(x, options.data[z][x] / 2, z)
      cube.setColorAt(i, color[x % color.length])
      cube.setMatrixAt(i++, matrix)
    }
  }

  scene.add(cube)

  const pointer = new THREE.Vector2(-1, -1)
  const raycaster = new THREE.Raycaster()
  canvas.addEventListener('pointermove', e => {
    pointer.x =
      ((e.clientX - (e.target as HTMLCanvasElement).getBoundingClientRect().x) /
        size) *
        2 -
      1
    pointer.y =
      -(
        (e.clientY -
          (e.target as HTMLCanvasElement).getBoundingClientRect().y) /
        size
      ) *
        2 +
      1
  })
  canvas.addEventListener('pointerleave', e => {
    pointer.x = -1
    pointer.y = -1
  })
  // camera and control origin
  camera.position.z = -33
  camera.position.x = -33
  camera.position.y = 33
  controls.target = new THREE.Vector3(
    options.data[0].length / 2,
    0,
    options.data.length / 2
  )
  ;(function animate() {
    requestAnimationFrame(animate)
    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (intersects[0]) {
      console.log(1)
    }
    controls.update()
    renderer.render(scene, camera)
  })()

  const node = document.createElement('div')
  node.className = 'hover'
  canvas.insertAdjacentElement('afterend', node)
}
