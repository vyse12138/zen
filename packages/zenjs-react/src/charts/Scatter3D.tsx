import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { initCanvas } from '../utils/scene'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Modal, { ModalProps } from '../components/Modal'
import Helvetica from 'three/examples/fonts/helvetiker_bold.typeface.json'
import Core from '../scene/Core'

export interface ScatterData {
  xValue: number | string
  yValue: number | string
  zValue: number | string
  color?: string
  scale?: number
}

interface AxisProps {
  type?: 'value' | 'category'
  labels?: string[]
  title?: string
}

interface ScatterProps {
  data: ScatterData[]
  size?: number
  xLabels?: string[]
  zLabels?: string[]
  colors?: string[]
  transparent?: boolean
  xAxis?: AxisProps
  yAxis?: AxisProps
  zAxis?: AxisProps
}

export default function Scatter3D({
  data,
  size = 300,
  xLabels,
  zLabels,
  colors = ['#4caf50'],
  transparent = false
}: ScatterProps) {
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

  useEffect(() => {
    if (!canvas.current) return

    // init
    const core = new Core({
      canvas: canvas.current,
      size
    })

    // mesh
    const material = new THREE.MeshStandardMaterial()
    const geometry = new THREE.SphereGeometry(0.5)
    const cube = new THREE.InstancedMesh(geometry, material, data.length)
    const matrix = new THREE.Matrix4()
    const color = new THREE.Color()
    let i = 0

    for (const dot of data) {
      dot.scale && matrix.makeScale(dot.scale, dot.scale, dot.scale)

      if (
        typeof dot.xValue === 'number' &&
        typeof dot.yValue === 'number' &&
        typeof dot.zValue === 'number'
      ) {
        matrix.setPosition(dot.xValue, dot.yValue, dot.zValue)
      }

      cube.setColorAt(i, color)
      cube.setMatrixAt(i++, matrix)
    }
    core.scene.add(cube)

    // animation
    ;(function animate() {
      requestAnimationFrame(animate)

      core.update()
    })()

    return () => {
      core.dispose()
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
