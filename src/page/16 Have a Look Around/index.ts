import { Animation, ArcRotateCamera, IAnimationKey, Mesh, MeshBuilder, ShadowGenerator, SpotLight, Vector3 } from "@babylonjs/core";
import InitScene, { CreateScene } from "../../util/Baby";

export default class HaveALookAround extends CreateScene implements InitScene {

  box: Mesh
  shadowGenerator: ShadowGenerator

  constructor(engine, scene) {
    super(engine, scene)
    this.createCamera()
    this.createGround(100)
    this.createGlobalLight()
    this.createShadowLight()

    this.createMesh()

  }

  createCamera(): void {
    this.camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(30, 150, 100))
    this.camera.attachControl(true)
    this.camera.upperBetaLimit = Math.PI / 2 - 0.05
  }

  createMesh(): void {
    this.box = MeshBuilder.CreateBox('box', {
      size: 5,
      sideOrientation: Mesh.DOUBLESIDE
    })
    this.box.position.y = 2.5 + 5
    this.shadowGenerator.addShadowCaster(this.box)
    this.camera.parent = this.box
    this.camera.setPosition(new Vector3(10, 10, 10))
    this.startBoxAnimation()
  }

  startBoxAnimation() {
    const animationX = new Animation('boxXAnimation', 'position.x', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
    const animationZ = new Animation('boxZAnimation', 'position.z', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
    const keysX: IAnimationKey[] = []
    keysX.push({ frame: 0, value: -30 })
    keysX.push({ frame: 60, value: -30 })
    keysX.push({ frame: 120, value: 30 })
    keysX.push({ frame: 180, value: 30 })
    keysX.push({ frame: 240, value: -30 })
    animationX.setKeys(keysX)
    const keysZ: IAnimationKey[] = []
    keysZ.push({ frame: 0, value: 30 })
    keysZ.push({ frame: 60, value: -30 })
    keysZ.push({ frame: 120, value: -30 })
    keysZ.push({ frame: 180, value: 30 })
    keysZ.push({ frame: 240, value: 30 })
    animationZ.setKeys(keysZ)
    this.box.animations = [animationX, animationZ]
    this.scene.beginAnimation(this.box, 0, 240, true, 1)
  }

  createShadowLight() {
    const shadowLight = new SpotLight('light', new Vector3(-40, 40, -40), new Vector3(1, -1, 1), Math.PI / 2, 30, this.scene)
    shadowLight.shadowMaxZ = 130;
    shadowLight.shadowMinZ = 5;
    this.shadowGenerator = new ShadowGenerator(1024, shadowLight, true)
    this.shadowGenerator.useContactHardeningShadow = true;
  }

}