import { useEffect, useRef, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import { randomHEX } from '../../utils/color'
import { initCanvas } from '../../utils/scene'
import { createSectorMesh } from './createSectorMesh'
import Modal, { ModalProps } from '../../components/Modal'

interface PiePorps {
  data: number[][]
  colors?: string[]
  size?: number
  radius?: number
  baseHeight?: number
  xLabels?: string[][]
  zLabels?: string[]
  background?: string
}

export default function Pie({
  data,
  colors = [],
  size = 300,
  radius = 5,
  baseHeight = 10,
  xLabels = [],
  zLabels = [],
  background
}: PiePorps) {
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

    const [renderer, scene, camera, control] = initCanvas({
      canvas: canvas.current,
      size,
      data,
      transparent: true,
      background
    })

    // inti colors
    if (!colors.length) {
      for (let i = data.length; i; i--) {
        colors.push(randomHEX())
      }
    }

    // process data
    let maxSum = 0
    let sums: number[] = []
    let allSum = 0
    data.forEach(row => {
      let sum = 0
      row.forEach(value => {
        sum += value
      })
      maxSum = Math.max(sum, maxSum)
      allSum += sum
      sums.push(sum)
    })
    let start = 0
    let uuid2SN: { [key: string]: number[] } = {}
    const maxHeight = (maxSum / allSum) * baseHeight
    const heights = sums.map(sum => (sum / allSum) * baseHeight)
    const pie = sums.map((sum, INDEX) => {
      let prevY = 0
      let prevHeight = 0
      const length = (sum / allSum) * Math.PI * 2
      const fans = data[INDEX].map((value, index) => {
        const height = (value / sums[INDEX]) * heights[INDEX]
        const color = new THREE.Color(colors[INDEX])
        if (index % 2 === 0) {
          color.r += 0.1
          color.g += 0.1
          color.b += 0.1
        } else {
          color.r -= 0.1
          color.g -= 0.1
          color.b -= 0.1
        }
        const sectorMesh = createSectorMesh(
          radius,
          height,
          32,
          1,
          false,
          start,
          length,
          color
        )
        if (index !== 0) {
          prevY += (prevHeight - height) / 2 + height
        } else {
          prevY = (height - maxHeight) / 2
        }
        sectorMesh.map(mesh => {
          uuid2SN[mesh.uuid] = [INDEX, index]
          mesh.position.y = index === 0 ? (height - maxHeight) / 2 : prevY
          scene.add(mesh)
        })
        prevHeight = height
        return sectorMesh
      })
      start += length
      return fans
    })
    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let SN = [-1, -1]
    const Colors = colors.map(color => new THREE.Color(color))
    const handleHover = (event: PointerEvent) => {
      if (event.target instanceof HTMLCanvasElement) {
        const rect = event.target.getBoundingClientRect()
        const x = event.clientX - rect.x
        const y = event.clientY - rect.y

        pointer.x =
          ((event.clientX - event.target.getBoundingClientRect().x) / size) *
            2 -
          1
        pointer.y =
          -((event.clientY - event.target.getBoundingClientRect().y) / size) *
            2 +
          1
        raycaster.setFromCamera(pointer, camera)

        const intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length > 0) {
          const uuid = intersects[0].object.uuid
          SN = uuid2SN[uuid]
          setModalData(modalData => ({
            ...modalData,
            x,
            y,
            show: true,
            xLabel: xLabels ? xLabels[SN[0]][SN[1]] : '',
            zLabel: zLabels ? zLabels[SN[0]] : '',
            value: data[SN[0]][SN[1]],
            color: colors[SN[0]]
          }))
        } else {
          setModalData(data => ({ ...data, show: false }))
          SN = [-1, -1]
        }
      }
    }
    canvas.current.addEventListener('pointermove', handleHover)
    animate()
    return () => {
      renderer.dispose()
    }
  }, [background])
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
