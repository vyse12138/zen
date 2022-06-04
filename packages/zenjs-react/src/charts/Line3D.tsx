import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { initCanvas } from '../utils/scene'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Modal, { ModalProps } from '../components/Modal'
import Helvetica from 'three/examples/fonts/helvetiker_bold.typeface.json'
import Core from '../scene/Core'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'

export interface LineData {
  xValues: string
  yValues: number[]
  zValues: number[]
  color?: string
}

interface AxisProps {
  type?: 'value' | 'category'
  labels?: string[]
  title?: string
}

interface LineProps {
  data: LineData[]
  size?: number
  xLabels?: string[]
  zLabels?: string[]
}

export default function Line3D({
  data,
  size = 300,
  xLabels,
  zLabels
}: LineProps) {
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
      size,
      data
    })
    const xScale = 3

    const yScale = 10 / Math.max(...data[0].yValues)
    const zScale = 10 / Math.max(...data[0].yValues)

    // mesh
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.05
    })
    const dot = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.2),
      material,
      999
    )
    const matrix = new THREE.Matrix4()
    let color = new THREE.Color('#4caf50')
    let index = 0

    for (let i = 0; i < data.length; i++) {
      const rand = Math.random() * 16777215
      color = new THREE.Color(`#${Math.floor(rand).toString(16)}`)
      const points = []

      for (let j = 0; j < data[i].yValues.length; j++) {
        points.push(
          xScale * j,
          data[i].yValues[j] * yScale,
          -data[i].zValues[j] * zScale
        )

        matrix.setPosition(
          xScale * j,
          data[i].yValues[j] * yScale,
          -data[i].zValues[j] * zScale
        )
        dot.setColorAt(index, color)
        dot.setMatrixAt(index++, matrix)
      }
      const geometry = new LineGeometry()
      geometry.setPositions(points)

      const line = new Line2(
        geometry,
        new LineMaterial({
          color: rand,
          linewidth: 0.05,
          vertexColors: false,
          worldUnits: true
        })
      )
      core.scene.add(line)
    }

    core.scene.add(dot)

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
