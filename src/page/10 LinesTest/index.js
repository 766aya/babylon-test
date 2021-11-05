import {
  ArcRotateCamera,
  Color4,
  HemisphericLight,
  MeshBuilder,
  Vector3
} from "@babylonjs/core"
import {
  conversionColorHex
} from "/src/util/conversionColor.js"

export default function(engine, scene) {
  new LinesTest(engine, scene)
}

class LinesTest {
  constructor(engine, scene) {
    this.engine = engine
    this.scene = scene
    scene.clearColor = conversionColorHex('#0E2C61', 1)
    this.createCamera()
    this.createLight()
    this.createLines()
  }

  createCamera() {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(0, 50, 0))
  }

  createLight() {
    new HemisphericLight('light', new Vector3(0, 50, 0), this.scene)
  }

  createLines() {
    new MeshBuilder.CreateLines('line1', {
      points: [
        new Vector3(0, 0, 0),
        new Vector3(10, 0, 0),
      ],
      colors: [
        conversionColorHex('#20C2FD', 1),
        conversionColorHex('#20C2FD', 0),
      ]
    })
    new MeshBuilder.CreateLines('line2', {
      points: [
        new Vector3(0, 0, 0),
        new Vector3(-10, 0, 0),
      ],
      colors: [
        conversionColorHex('#20C2FD', 1),
        conversionColorHex('#20C2FD', 0),
      ]
    })
    new MeshBuilder.CreateLines('line3', {
      points: [
        new Vector3(0, 0, -10),
        new Vector3(0, 0, 0),
      ],
      colors: [
        conversionColorHex('#20C2FD', 0),
        conversionColorHex('#20C2FD', 1),
      ]
    })
    new MeshBuilder.CreateLines('line3', {
      points: [
        new Vector3(0, 0, 10),
        new Vector3(0, 0, 0),
      ],
      colors: [
        conversionColorHex('#20C2FD', 0),
        conversionColorHex('#20C2FD', 1),
      ]
    })
  }
}