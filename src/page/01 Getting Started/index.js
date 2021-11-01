import { FreeCamera, HemisphericLight, MeshBuilder, Vector3 } from '@babylonjs/core';

export default function (engine, scene) {
  const camera = new FreeCamera('camera', new Vector3(0, 5, 5), scene)
  camera.setTarget(Vector3.Zero())
  camera.attachControl(true)

  createLight(scene)
  createObject(scene)
}

function createLight (scene) {
  const hemisphericLight = new HemisphericLight('hemisphericLight', new Vector3(0, 10, 0), scene)

  return hemisphericLight
}

function createObject (scene) {
  const sphere = MeshBuilder.CreateSphere("sphere", {
    diameter: 1
  }, scene)
  sphere.position.set(0, 1, 0)
  MeshBuilder.CreateGround('ground', {
    width: 30,
    height: 20
  }, scene)
}

