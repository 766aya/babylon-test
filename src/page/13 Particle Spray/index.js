import {
  ArcRotateCamera,
  Color4,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  ParticleSystem,
  StandardMaterial,
  Texture,
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
    // this.createGround()
    this.createFountain()
    this.initParticleSystem()
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

  createFountain() {
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
  }

  initParticleSystem() {
    const particleSystem = new ParticleSystem('particles', 5000, this.scene)
    particleSystem.particleTexture = new Texture("/texture/star.png", this.scene)
    particleSystem.emitter = new Vector3(0, 15, 0)
    particleSystem.minEmitBox = new Vector3(-0.5, 0, -0.5); // minimum box dimensions
    particleSystem.maxEmitBox = new Vector3(0.5, 0, 0.5); // maximum box dimensions

    particleSystem.color1 = conversionColorHex('#409EFF', 1);
    particleSystem.color2 = conversionColorHex('#FF9900', 1);
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    particleSystem.emitRate = 3000;

    particleSystem.direction1 = new Vector3(-10, 25, 10);
    particleSystem.direction2 = new Vector3(10, 25, -10);

    particleSystem.minEmitPower = 0.5;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.01;

    particleSystem.gravity = new Vector3(0, -50, 0);

    particleSystem.start();
  }

}