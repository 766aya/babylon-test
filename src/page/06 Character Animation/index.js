import { Animation, ArcRotateCamera, HemisphericLight, MeshBuilder, SceneLoader, StandardMaterial, Texture, Vector3 } from "@babylonjs/core"
import { conversionColorHex } from "/src/util/conversionColor.js"

export default function (engine, scene) {
  new CharacterAnimation(engine, scene)
}

class CharacterAnimation {
  constructor (engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLight()
    this.createGround()
    this.createCharacterAnimation()
    this.startGroundAnimation()
  }

  createCamera () {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(0, 70, 0))
    this.camera.attachControl(true)
    this.camera.lowerBetaLimit = 0.95;
    this.camera.upperBetaLimit = 1.25;
    // this.camera.lowerAlphaLimit = -Math.PI / 6;
    // this.camera.upperAlphaLimit = Math.PI / 6;
    this.camera.lowerRadiusLimit = 45;
    this.camera.upperRadiusLimit = 65;
  }

  createLight () {
    this.light = new HemisphericLight('light', new Vector3(0, 10, 10), this.scene)
  }

  createGround () {
    const groundMaterial = new StandardMaterial('groundMaterial', this.scene)
    groundMaterial.diffuseTexture = new Texture('/texture/houseRoof1.jpg')
    groundMaterial.reflectionTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_reflection.png")
    groundMaterial.specularTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_height.png")
    groundMaterial.diffuseColor = conversionColorHex('#333333')
    groundMaterial.diffuseTexture.uScale = 0.8
    groundMaterial.diffuseTexture.vScale = 20
    this.ground = new MeshBuilder.CreateGround('ground', {
      width: 30,
      height: 1000,
    })
    this.ground.material = groundMaterial
  }

  createCharacterAnimation () {
    SceneLoader.ImportMeshAsync("him", "/model/dude/", "Dude.babylon", this.scene).then((result) => {
      var dude = result.meshes[0];
      dude.scaling = new Vector3(0.25, 0.25, 0.25);
      this.scene.beginAnimation(result.skeletons[0], 0, 100, true, 2.0);
    });
  }

  startGroundAnimation () {
    const groundAnimation = new Animation('groundAnimation', 'position.z', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
    const keys = []
    keys.push({
      frame: 0,
      value: 0
    })
    keys.push({
      frame: 150,
      value: 150
    })
    groundAnimation.setKeys(keys)
    this.ground.animations = [groundAnimation]
    this.scene.beginAnimation(this.ground, 0, 150, true, 1)
  }

}