import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Modal, { ModalProps } from '../components/Modal'
import Helvetica from 'three/examples/fonts/helvetiker_bold.typeface.json'
import Core from '../scene/Core'

interface BarData {
  xValue: number | string
  yValue: number | string
  zValue: number | string
  color?: string
}

interface AxisProps {
  type?: 'value' | 'category'
  labels?: string[]
  title?: string
}

interface BarProps {
  data: number[][]
  size?: number
  xLabels?: string[]
  zLabels?: string[]
  colors?: string[]
  transparent?: boolean
  xAxis?: AxisProps
  yAxis?: AxisProps
  zAxis?: AxisProps
}

export default function Bar3D({
  data,
  size = 300,
  xLabels,
  zLabels,
  colors = ['#4caf50'],
  transparent = false
}: BarProps) {
  const canvas = useRef<HTMLCanvasElement>(null)

  const [modalData, setModalData] = useState<ModalProps>({
    x: 0,
    y: 0,
    show: false,
    value: 1,
    color: 'red',
    xLabel: 'red',
    zLabel: 'red'
  })
  const maxData = Math.max(...data.flat(2))
  const scale = 8 / Math.max(...data.flat(2))

  useEffect(() => {
    if (!canvas.current) return

    const { renderer, scene, camera, control } = new Core({
      canvas: canvas.current,
      size
    })

    // raycaster related variables
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2(-1, -1)
    let lastInstanceId: null | number = null
    let intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>

    // color
    const baseColors = colors.map(color => new THREE.Color(color))
    const color = new THREE.Color()

    // mesh
    const material = new THREE.MeshStandardMaterial({})
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
    if (xLabels || zLabels) {
      const font = new FontLoader().parse(Helvetica)

      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('black')
      })

      // xLabels
      if (xLabels) {
        for (let i = 0; i < xLabels.length; i++) {
          const scale = data[0].length / xLabels.length
          const geometry = new TextGeometry(xLabels[i], {
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

      // zLabels
      if (zLabels) {
        for (let i = 0; i < zLabels.length; i++) {
          const scale = data.length / zLabels.length
          const geometry = new TextGeometry(zLabels[i], {
            font: font,
            size: 0.5,
            height: 0.02
          })
          const label = new THREE.Mesh(geometry, material)
          label.position.set(-zLabels[i].length / 2 - 1, 0, -i * scale)
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
          intersect?.instanceId !== lastInstanceId &&
          e.pointerType === 'mouse'
        ) {
          cube.getColorAt(intersect.instanceId, color)
          color.setRGB(color.r + 0.25, color.g + 0.25, color.b + 0.25)
          cube.setColorAt(intersect.instanceId, color)

          lastInstanceId = intersect.instanceId
        } else {
          if (typeof intersect?.instanceId === 'number') {
            cube.getMatrixAt(intersect.instanceId, matrix)
            const position = new THREE.Vector3().setFromMatrixPosition(matrix)

            setModalData(modalData => ({
              ...modalData,
              x,
              y,
              position,
              show: true,
              zLabel: zLabels
                ? zLabels[
                    -Math.floor((position.z * zLabels.length) / data.length)
                  ]
                : position.z.toString(),
              xLabel: xLabels
                ? xLabels[
                    Math.floor((position.x * xLabels.length) / data[0].length)
                  ]
                : position.x.toString(),
              color: colors[-position.z % colors.length],
              value: Math.round((position.y * 2) / scale)
            }))
          } else {
            setModalData(data => ({ ...data, x, y, show: false }))
          }
        }

        cube.instanceColor!.needsUpdate = true
      }
    }

    canvas.current.addEventListener('pointermove', handleHover)
    canvas.current.addEventListener('pointerdown', handleHover)
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
        width: size,
        textAlign: 'left'
      }}
    >
      <canvas ref={canvas}></canvas>
      <Modal {...modalData} />
    </div>
  )
}
