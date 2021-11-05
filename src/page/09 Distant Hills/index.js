import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector3
} from "@babylonjs/core"

export default function(engine, scene) {
  new DistantHills(engine, scene)
}

class DistantHills {
  constructor(engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLight()
    this.createGround()
  }

  createCamera() {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(0, 200, 0))
    this.camera.attachControl(true)
  }

  createLight() {
    new HemisphericLight('light', new Vector3(0, 50, 10), this.scene)
  }

  createGround() {
    const groundMaterial = new StandardMaterial("groundMaterial")
    groundMaterial.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/valleygrass.png")

    this.ground = new MeshBuilder.CreateGroundFromHeightMap('gound', "/texture/villageheightmap.png", {
      width: 150,
      height: 150,
      subdivisions: 20,
      minHeight: 0,
      maxHeight: 10,
    })
    this.ground.material = groundMaterial
    this.ground.position.set(0, -0.01, 0)
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;
    const ground2 = new MeshBuilder.CreateGround("ground", {
      width: 24,
      height: 24
    });
    ground2.material = groundMat;
  }

}