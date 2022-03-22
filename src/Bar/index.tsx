import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { initScene } from '../utils/scene'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Helvetica from 'three/examples/fonts/helvetiker_bold.typeface.json'

interface BarProps {
  data: number[][]
  size?: number
  xLabel?: string[]
  zLabel?: string[]
  colors?: string[]
}

export default function Bar({
  data,
  size = 300,
  xLabel,
  zLabel,
  colors = ['#4caf50']
}: BarProps) {
  const canvas = useRef<HTMLCanvasElement>(null)

  const [modalData, setModalData] = useState({
    x: 0,
    y: 0,
    show: false,
    position: new THREE.Vector3()
  })
  const maxData = Math.max(...data.flat(2))
  const scale = 8 / Math.max(...data.flat(2))

  useEffect(() => {
    if (!canvas.current) return

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
    const control = new OrbitControls(camera, canvas.current)
    camera.position.z = 5
    camera.position.x = -5
    camera.position.y = 12
    control.autoRotate = false
    control.enableDamping = true
    control.target = new THREE.Vector3(
      Math.sqrt(data[0].length),
      0,
      -Math.sqrt(data.length)
    )
    control.screenSpacePanning = false

    // color
    const baseColors = colors.map(color => new THREE.Color(color))
    const color = new THREE.Color()

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
        matrix.makeScale(1, data[z][x] * scale, 1)
        matrix.setPosition(x, (data[z][x] * scale) / 2, -z)
        const colorScale = 0.75 + (maxData - data[z][x]) / maxData
        color.setRGB(
          baseColors[z % baseColors.length].r * colorScale,
          baseColors[z % baseColors.length].g * colorScale,
          baseColors[z % baseColors.length].b * colorScale
        )
        cube.setColorAt(i, color)
        cube.setMatrixAt(i++, matrix)
      }
    }
    scene.add(cube)

    // label
    if (xLabel || zLabel) {
      const font = new FontLoader().parse(Helvetica)

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
    }

    // hover effect
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

        // update raycaster
        raycaster.setFromCamera(pointer, camera)
        intersect = raycaster.intersectObjects(scene.children)[0]

        // reset last intersect's color
        if (
          typeof lastInstanceId === 'number' &&
          intersect?.instanceId !== lastInstanceId
        ) {
          cube.getMatrixAt(lastInstanceId, matrix)
          const position = new THREE.Vector3().setFromMatrixPosition(matrix)
          const colorScale =
            0.75 + (maxData - (position.y * 2) / scale) / maxData
          color.setRGB(
            baseColors[-position.z % baseColors.length].r * colorScale,
            baseColors[-position.z % baseColors.length].g * colorScale,
            baseColors[-position.z % baseColors.length].b * colorScale
          )
          cube.setColorAt(lastInstanceId, color)
          lastInstanceId = null
        }

        // update highlight and modal
        if (
          typeof intersect?.instanceId === 'number' &&
          intersect?.instanceId !== lastInstanceId
        ) {
          cube.getColorAt(intersect.instanceId, color)
          color.setRGB(color.r + 0.25, color.g + 0.25, color.b + 0.25)
          cube.setColorAt(intersect.instanceId, color)
          lastInstanceId = intersect.instanceId
        } else {
          if (typeof intersect?.instanceId === 'number') {
            cube.getMatrixAt(intersect.instanceId, matrix)
            const position = new THREE.Vector3().setFromMatrixPosition(matrix)
            setModalData(data => ({ ...data, x, y, position, show: true }))
          } else {
            setModalData(data => ({ ...data, x, y, show: false }))
          }
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
      control.update()
      renderer.render(scene, camera)
    })()
    return () => {
      renderer.dispose()
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px',
        height: size,
        width: size
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
            borderRadius: 4,
            pointerEvents: 'none',
            boxShadow: 'rgb(0 0 0 / 20%) 1px 2px 10px',
            padding: 10
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                borderRadius: 10,
                border: `3px solid ${
                  colors[-modalData.position.z % colors.length]
                }`,
                width: 3,
                height: 3,
                marginRight: 10
              }}
            ></div>
            {zLabel
              ? zLabel[
                  -Math.floor(
                    (modalData.position.z * zLabel.length) / data.length
                  )
                ]
              : modalData.position.z}{' '}
          </div>
          <div>
            <div
              style={{
                display: 'inline-block',
                borderRadius: 10,
                border: '3px solid black',
                width: 3,
                height: 3,
                marginRight: 10
              }}
            ></div>
            {xLabel
              ? xLabel[
                  Math.floor(
                    (modalData.position.x * xLabel.length) / data[0].length
                  )
                ]
              : modalData.position.x}{' '}
            <b
              style={{
                display: 'inline-block',
                marginLeft: 30,
                fontSize: '1.2rem',
                transform: 'translateY(-0.6rem)'
              }}
            >
              {Math.round((modalData.position.y * 2) / scale)}
            </b>
          </div>
        </div>
      }
    </div>
  )
}
