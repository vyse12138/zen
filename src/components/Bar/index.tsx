import { number } from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { initScene } from '../../utils/scene'

interface BarProps {
  data: number[][]
  size?: number
}

export default function Bar({ data, size = 300 }: BarProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (!canvas.current) return

    const maxData = Math.max(...data.flat(2))
    // renderer, scene
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true
    })
    const scene = initScene(renderer, size)

    // camera, control
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const controls = new OrbitControls(camera, canvas.current)
    camera.position.z = 15
    camera.position.x = 45
    camera.position.y = 35
    controls.autoRotate = false
    controls.target = new THREE.Vector3(data[0].length / 2, 0, -data.length / 2)

    // color
    const color = new THREE.Color()
    const highlight = new THREE.Color('red')

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
        matrix.setPosition(x, data[z][x] / 2, -z)
        color.setHSL(1 / 3, 1, (maxData - data[z][x]) / maxData / 2 + 0.3)
        cube.setColorAt(i, color)
        cube.setMatrixAt(i++, matrix)
      }
    }
    scene.add(cube)

    // ray
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(-1, -1)
    canvas.current.addEventListener('pointermove', e => {
      if (e.target instanceof HTMLCanvasElement) {
        const rect = e.target.getBoundingClientRect()
        const x = e.clientX - rect.x
        const y = e.clientY - rect.y

        pointer.x =
          ((e.clientX - e.target.getBoundingClientRect().x) / size) * 2 - 1
        pointer.y =
          -((e.clientY - e.target.getBoundingClientRect().y) / size) * 2 + 1

        setMousePos({ x, y })
      }
    })
    canvas.current.addEventListener('pointerleave', e => {
      // setMousePos({ x: 0, y: 0 })
      pointer.x = -1
      pointer.y = -1
    })

    let lastInstanceId: null | number = null

    ;(function animate() {
      requestAnimationFrame(animate)
      raycaster.setFromCamera(pointer, camera)
      const intersect = raycaster.intersectObjects(scene.children)[0]
      if (intersect?.object instanceof THREE.InstancedMesh) {
        intersect.object.getMatrixAt(intersect.instanceId, matrix)
        // const position = new THREE.Vector3().setFromMatrixPosition(matrix)
        cube.setColorAt(lastInstanceId, color)
        cube.setColorAt(intersect.instanceId, highlight)
        lastInstanceId = intersect.instanceId
      } else {
        cube.setColorAt(lastInstanceId, color)
        lastInstanceId = null
      }
      cube.instanceColor.needsUpdate = true

      controls.update()
      renderer.render(scene, camera)
    })()

    return () => {
      renderer.dispose()
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      <canvas ref={canvas}></canvas>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(${mousePos.x + 20}px, ${
            mousePos.y + 20
          }px, 0px)`,
          willChange: 'transform',
          width: 40,
          height: 40,
          border: '1px solid black',
          backgroundColor: 'white'
        }}
      >
        temp
      </div>
    </div>
  )
}
