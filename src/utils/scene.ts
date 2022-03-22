import * as THREE from 'three'

export const initScene = (renderer: THREE.WebGLRenderer, size: number) => {
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(size, size)

  const scene = new THREE.Scene()

  scene.background = new THREE.Color('#cccccc')

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)

  directionalLight.position.set(50, 30, 20)
  directionalLight2.position.set(-50, -30, -20)

  scene.add(directionalLight)
  scene.add(directionalLight2)

  return scene
}
