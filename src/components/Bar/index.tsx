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
  const [modalData, setModalData] = useState({
    x: 0,
    y: 0,
    show: false,
    position: new THREE.Vector3()
  })
  useEffect(() => {
    if (!canvas.current) return

    let lastInstanceId: null | number = null
    let intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>
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

    const handleHover = (e: PointerEvent) => {
      if (e.target instanceof HTMLCanvasElement) {
        const rect = e.target.getBoundingClientRect()
        const x = e.clientX - rect.x
        const y = e.clientY - rect.y

        pointer.x =
          ((e.clientX - e.target.getBoundingClientRect().x) / size) * 2 - 1
        pointer.y =
          -((e.clientY - e.target.getBoundingClientRect().y) / size) * 2 + 1

        if (intersect?.object instanceof THREE.InstancedMesh) {
          intersect.object.getMatrixAt(intersect.instanceId, matrix)
          const position = new THREE.Vector3().setFromMatrixPosition(matrix)
          setModalData(data => ({ ...data, x, y, position, show: true }))
        } else {
          setModalData(data => ({ ...data, x, y, show: false }))
        }
      }
    }
    // ray
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(-1, -1)
    canvas.current.addEventListener('pointermove', handleHover)
    canvas.current.addEventListener('pointerleave', e => {
      setModalData(data => ({ ...data, show: false }))
      pointer.x = -1
      pointer.y = -1
    })

    canvas.current.addEventListener('pointerdown', handleHover)
    ;(function animate() {
      requestAnimationFrame(animate)

      // update raycaster
      raycaster.setFromCamera(pointer, camera)
      intersect = raycaster.intersectObjects(scene.children)[0]

      if (intersect?.object instanceof THREE.InstancedMesh) {
        // get the color of last intersect
        const scale = new THREE.Vector3().setFromMatrixScale(matrix)
        color.setHSL(1 / 3, 1, (maxData - scale.y) / maxData / 2 + 0.3)

        intersect.object.getMatrixAt(intersect.instanceId, matrix)
        cube.setColorAt(lastInstanceId, color)
        cube.setColorAt(intersect.instanceId, highlight)
        lastInstanceId = intersect.instanceId

        // const position = new THREE.Vector3().setFromMatrixPosition(matrix)
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
      {
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate3d(${modalData.x + 10}px, ${
              modalData.y + 10
            }px, 0px)`,
            willChange: 'transform',
            backgroundColor: 'white',
            transition: 'opacity 0.3s',
            opacity: modalData.show ? 1 : 0,
            padding: 10,
            borderRadius: 4,
            pointerEvents: 'none',
            boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px'
          }}
        >
          data at {-modalData.position.z} - {modalData.position.x} is:{' '}
          {modalData.position.y * 2}
        </div>
      }
    </div>
  )
}
