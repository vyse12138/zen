import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { initScene } from '../../utils/scene'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

interface BarProps {
  data: number[][]
  size?: number
  xLabel?: string[]
  zLabel?: string[]
  name: string
}

export default function Bar({
  data,
  size = 300,
  xLabel,
  zLabel,
  name
}: BarProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [modalData, setModalData] = useState({
    x: 0,
    y: 0,
    show: false,
    position: new THREE.Vector3()
  })
  useEffect(() => {
    if (!canvas.current) return

    const maxData = Math.max(...data.flat(2))
    const minAxis = Math.min(data.length, data[0].length)

    // raycaster related variables
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(-1, -1)
    let lastInstanceId: null | number = null
    let intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>

    // renderer, scene
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true
    })
    const scene = initScene(renderer, size)

    // camera, control
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const controls = new OrbitControls(camera, canvas.current)
    camera.position.z = 8
    camera.position.x = -8
    camera.position.y = 8
    controls.autoRotate = false
    controls.target = new THREE.Vector3(minAxis, 0, -minAxis)

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

    // label
    if (xLabel || zLabel) {
      new FontLoader().load('./api/font', font => {
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color('black')
        })

        // xLabel
        if (xLabel) {
          for (let i = 0; i < xLabel.length; i++) {
            const scale = data[0].length / xLabel.length
            const geometry = new TextGeometry(xLabel[i], {
              font: font,
              size: 0.5,
              height: 0.02
            })
            const label = new THREE.Mesh(geometry, material)
            label.position.set(i * scale, 0, 1)
            label.rotateY(-Math.PI / 2)
            label.rotateX(-Math.PI / 4)
            scene.add(label)
          }
        }

        // zLabel
        if (zLabel) {
          for (let i = 0; i < zLabel.length; i++) {
            const scale = data.length / zLabel.length
            const geometry = new TextGeometry(zLabel[i], {
              font: font,
              size: 0.5,
              height: 0.02
            })
            const label = new THREE.Mesh(geometry, material)
            label.position.set(-zLabel[i].length / 2 - 1, 0, -i * scale)
            label.rotateX(-Math.PI / 4)

            scene.add(label)
          }
        }
      })
    }

    const handleHover = (e: PointerEvent) => {
      if (e.target instanceof HTMLCanvasElement) {
        const rect = e.target.getBoundingClientRect()
        const x = e.clientX - rect.x
        const y = e.clientY - rect.y

        pointer.x =
          ((e.clientX - e.target.getBoundingClientRect().x) / size) * 2 - 1
        pointer.y =
          -((e.clientY - e.target.getBoundingClientRect().y) / size) * 2 + 1

        // get the color of last intersect
        const scale = new THREE.Vector3().setFromMatrixScale(matrix)

        // update raycaster
        raycaster.setFromCamera(pointer, camera)
        intersect = raycaster.intersectObjects(scene.children)[0]

        // update highlight and modal
        if (
          typeof intersect?.instanceId === 'number' &&
          intersect?.object instanceof THREE.InstancedMesh
        ) {
          color.setHSL(1 / 3, 1, (maxData - scale.y) / maxData / 2 + 0.3)

          intersect.object.getMatrixAt(intersect.instanceId, matrix)
          typeof lastInstanceId === 'number' &&
            cube.setColorAt(lastInstanceId, color)
          cube.setColorAt(intersect.instanceId, highlight)
          lastInstanceId = intersect.instanceId

          const position = new THREE.Vector3().setFromMatrixPosition(matrix)
          setModalData(data => ({ ...data, x, y, position, show: true }))
        } else {
          if (typeof lastInstanceId === 'number') {
            cube.setColorAt(lastInstanceId, color)
            lastInstanceId = null
          }
          setModalData(data => ({ ...data, x, y, show: false }))
        }
        cube.instanceColor!.needsUpdate = true
      }
    }
    // ray

    canvas.current.addEventListener('pointermove', handleHover)
    canvas.current.addEventListener('pointerover', handleHover)
    canvas.current.addEventListener('pointerleave', e => {
      if (e.pointerType !== 'mouse') return
      setModalData(data => ({ ...data, show: false }))
      pointer.x = -1
      pointer.y = -1
    })
    ;(function animate() {
      requestAnimationFrame(animate)
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
          {name} on{' '}
          {zLabel
            ? zLabel[
                -Math.floor(
                  (modalData.position.z * zLabel.length) / data.length
                )
              ]
            : modalData.position.z}{' '}
          {xLabel
            ? xLabel[
                Math.floor(
                  (modalData.position.x * xLabel.length) / data[0].length
                )
              ]
            : modalData.position.x}{' '}
          is: {modalData.position.y * 2}
        </div>
      }
    </div>
  )
}
