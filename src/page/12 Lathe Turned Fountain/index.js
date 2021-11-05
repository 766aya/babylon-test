import {
  ArcRotateCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Vector3
} from "@babylonjs/core"
import {
  conversionColorHex
} from "/src/util/conversionColor.js"

export default function(engine, scene) {
  new LatheTurnedFountain(engine, scene)
}

class LatheTurnedFountain {
  constructor(engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLight()
    this.createGround()
    this.createObject()
  }

  createCamera() {
    const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    camera.setPosition(new Vector3(0, 150, 50))
    camera.attachControl(true)
  }

  createLight() {
    const light = new HemisphericLight('light', new Vector3(0, 100, 50), this.scene)
  }

  createGround() {
    const groundMaterial = new StandardMaterial('groundMaterial', this.scene)
    groundMaterial.diffuseColor = conversionColorHex('#DFDFDF')
    const ground = new MeshBuilder.CreateGround('ground', {
      width: 100,
      height: 100
    }, this.scene)
    ground.material = groundMaterial
  }

  createObject() {
    const shape = [
      new Vector3(0, 0, 0),
      new Vector3(10, 0, 0),
      new Vector3(10, 4, 0),
      new Vector3(8, 4, 0),
      new Vector3(8, 1, 0),
      new Vector3(1, 2, 0),
      new Vector3(1, 15, 0),
      new Vector3(3, 17, 0)
    ]
    new MeshBuilder.CreateLathe('fountain', {
      shape: shape,
      sideOrientation: Mesh.DOUBLESIDE,
    }, this.scene)
    // new MeshBuilder.CreateLines('lines', {
    //   points: shape
    // })
  }

}