import {
  WebGLEngine,
  PrimitiveMesh,
  Camera,
  MeshRenderer,
  Color,
  DirectLight,
  PBRMaterial,
  PointLight,
  Entity,
  Scene
} from 'oasis-engine'
import { OrbitControl } from '@oasis-engine/controls'

export const addLight = ({
  parentEntity,
  position,
  intensity
}: {
  parentEntity: Entity
  position: { x: number; y: number; z: number }
  intensity: number
}) => {
  const lightEntity = parentEntity.createChild('light')
  const light = lightEntity.addComponent(PointLight)
  light.color.setValue(1, 1, 1, 1)
  light.intensity = intensity
  light.distance = 1000
  lightEntity.transform.setPosition(position.x, position.y, position.z)
}

export const initRootEntity = (scene: Scene): Entity => {
  const rootEntity = scene.createRootEntity()
  scene.background.solidColor.setValue(0.9, 0.9, 0.9, 0)

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

  return rootEntity
}
