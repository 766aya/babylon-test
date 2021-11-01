import { Animation, ArcRotateCamera, HemisphericLight, Mesh, MeshBuilder, StandardMaterial, Texture, Vector3 } from "@babylonjs/core"
import { conversionColorHex } from "/src/util/conversionColor.js"

export default function (engine, scene) {
  new AvoidingACarCrash(engine, scene)
}

class AvoidingACarCrash {
  constructor (engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLight()
    this.createGround()
    this.createMeshs()
  }

  createCamera () {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(0, 200, 0))
    this.camera.attachControl(true)
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
    groundMaterial.diffuseTexture.uScale = 20
    groundMaterial.diffuseTexture.vScale = 20
    this.ground = new MeshBuilder.CreateGround('ground', {
      width: 1000,
      height: 1000,
    })
    this.ground.material = groundMaterial
  }

  createMeshs () {
    window.box = this.box = new MeshBuilder.CreateBox('box', {
      size: 50,
      sideOrientation: Mesh.DOUBLESIDE
    })
    
    this.box.position.set(0, 25, 0)
    this.createBoxAnimation()
    window.shere = this.shere = new MeshBuilder.CreateSphere('shere', {
      diameter: 30,
      sideOrientation: Mesh.DOUBLESIDE
    })
    this.shere.position.set(0, 25, 0)
    this.createShereAnimation()
    this.createAvoidingListener()
  }

  createBoxAnimation () {
    const animation = new Animation('shereAnimation', 'position.z', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
    const keys = []
    keys.push({ frame: 0, value: -30 })
    keys.push({ frame: 50, value: 100 })
    keys.push({ frame: 100, value: -30 })
    animation.setKeys(keys)
    this.box.animations = [animation]
    window.boxAnimation = this.boxAnimation = this.scene.beginAnimation(this.box, 0, 100, true, 1)
  }

  createShereAnimation () {
    const animation = new Animation('shereAnimation', 'position.x', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
    const keys = []
    keys.push({ frame: 0, value: -50 })
    keys.push({ frame: 45, value: 100 })
    keys.push({ frame: 90, value: -50 })
    animation.setKeys(keys)
    this.shere.animations = [animation]
    window.shereAnimation = this.shereAnimation = this.scene.beginAnimation(this.shere, 0, 90, true, 1)
  }

  pauseAnimation () {
    const { x: boxX, z: boxZ } = this.box.position
    const { x: shereX, z: shereZ } = this.shere.position

    console.log(this.box)
  }

  createAvoidingListener () {
    const box = this.scene.getMeshByName('box')
    const shere = this.scene.getMeshByName('shere')
    window.box = box
    const boxMaterial = new StandardMaterial('boxMaterial', this.scene)
    box.setMaterialById('boxMaterial')

    // this.pauseAnimation()

    this.pauseAnimation()
    this.scene.onBeforeRenderObservable.add((e) => {
      if (shere.intersectsMesh(box)) {
        boxMaterial.diffuseColor = conversionColorHex('#FF0099')
      } else {
        boxMaterial.diffuseColor = conversionColorHex('#FFFFFF')
        this.shereAnimation._paused && this.shereAnimation.restart()
        this.boxAnimation._paused && this.boxAnimation.restart()
      }
    })
  }

}