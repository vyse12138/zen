import {
  WebGLEngine,
  PrimitiveMesh,
  Camera,
  MeshRenderer,
  Color,
  DirectLight,
  PBRMaterial,
  PointLight,
  Entity
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
