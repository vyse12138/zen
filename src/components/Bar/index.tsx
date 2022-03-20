import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { mock } from '../../utils/mock'

interface BarProps {
  data: number[][]
  size?: number
}

interface Options {
  data: number[][]
}

export default function Bar({ data, size = 300 }: BarProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvas.current) return

    // scene renderer camera control
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = false
    const scene = new THREE.Scene()

    // scene config
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
      data.length * data[0].length
    )
    const matrix = new THREE.Matrix4()
    let i = 0

    for (let z = 0; z < data.length; z++) {
      for (let x = 0; x < data[0].length; x++) {
        if (data[z][x] === 0) {
          continue
        }
        matrix.makeScale(1, data[z][x], 1)
        matrix.setPosition(x, data[z][x] / 2, z)
        cube.setColorAt(i, color[z % color.length])
        cube.setMatrixAt(i++, matrix)
      }
    }

    scene.add(cube)

    const pointer = new THREE.Vector2(-1, -1)
    const raycaster = new THREE.Raycaster()
    canvas.current.addEventListener('pointermove', e => {
      pointer.x =
        ((e.clientX -
          (e.target as HTMLCanvasElement).getBoundingClientRect().x) /
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
    canvas.current.addEventListener('pointerleave', e => {
      pointer.x = -1
      pointer.y = -1
    })
    // camera and control origin
    camera.position.z = -33
    camera.position.x = -33
    camera.position.y = 33
    controls.target = new THREE.Vector3(data[0].length / 2, 0, data.length / 2)
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

    return () => {
      renderer.dispose()
    }
  }, [])

  return (
    <div className='App'>
      <canvas ref={canvas}></canvas>
    </div>
  )
}
