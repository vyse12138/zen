import { useEffect, useRef, useState } from 'react'
import {
  WebGLEngine,
  PrimitiveMesh,
  Camera,
  MeshRenderer,
  Color,
  PBRMaterial,
  Vector3
} from 'oasis-engine'
import { OrbitControl } from '@oasis-engine/controls'
import { addLight } from '../../utils/scene'

interface BarProps {
  data: number[][]
  size?: number
}

export default function Bar({ data, size }: BarProps) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvas.current) return

    const maxData = Math.max(...data.flat(2))
    //engine
    const engine = new WebGLEngine(canvas.current)

    // scene / entity
    const scene = engine.sceneManager.activeScene
    scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1)
    const { background } = scene
    background.solidColor.setValue(0.9, 0.9, 0.9, 0)
    const rootEntity = scene.createRootEntity()

    // camera
    const cameraEntity = rootEntity.createChild('camera')
    cameraEntity.transform.setPosition(50, 50, 50)
    const camera = cameraEntity.addComponent(Camera)
    camera.farClipPlane = 1000
    const control = cameraEntity.addComponent(OrbitControl)
    control.target = new Vector3(data[0].length / 2, 0, data.length / 2)

    // light
    addLight({
      parentEntity: rootEntity,
      position: {
        x: 0,
        y: 100,
        z: 500
      },
      intensity: 2
    })
    addLight({
      parentEntity: rootEntity,
      position: {
        x: 0,
        y: -10,
        z: -500
      },
      intensity: 2
    })
    addLight({
      parentEntity: rootEntity,
      position: {
        x: 500,
        y: 100,
        z: 0
      },
      intensity: 1
    })
    addLight({
      parentEntity: rootEntity,
      position: {
        x: -500,
        y: -10,
        z: 0
      },
      intensity: 1
    })

    // mesh
    for (let z = 0; z < data.length; z++) {
      for (let x = 0; x < data[0].length; x++) {
        const meshEntity = rootEntity.createChild('mesh')

        meshEntity.transform.setPosition(x, data[z][x] / 2, z)
        const renderer = meshEntity.addComponent(MeshRenderer)
        renderer.mesh = PrimitiveMesh.createCuboid(engine, 1, data[z][x], 1)

        const material = new PBRMaterial(engine)
        material.baseColor.setValue(
          0,
          ((maxData - data[z][x]) / maxData + 1) / 2,
          0,
          0
        )
        renderer.setMaterial(material)
      }
    }

    // run
    engine.run()
  }, [])

  return (
    <div className='App'>
      <canvas ref={canvas} width={size ?? 300} height={size ?? 300}></canvas>
    </div>
  )
}
