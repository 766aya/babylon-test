import { ArcRotateCamera, BackgroundMaterial, BaseTexture, FresnelParameters, HemisphericLight, Mesh, MeshBuilder, ShaderMaterial, StandardMaterial, Texture, Vector3, Vector4 } from "@babylonjs/core"
import { conversionColorHex } from "/src/util/conversionColor.js"

export default function (engine, scene) {
  new BasicHouse(engine, scene)
}

class BasicHouse {
  constructor (engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLight()
    this.createGround()
    this.createHouse()
  }

  createCamera () {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(5, 30, 10))
    this.camera.attachControl(true)
  }

  createLight () {
    this.light = new HemisphericLight('light', new Vector3(0, 10, 0), this.scene)
  }

  createGround () {
    const groundMaterial = new StandardMaterial('groundMaterial', this.scene)
    groundMaterial.diffuseTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_diffuse.png")
    groundMaterial.bumpTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_normal.png")
    groundMaterial.reflectionTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_reflection.png")
    groundMaterial.specularTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_height.png")
    groundMaterial.ambientTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_glossiness.png")
    groundMaterial.diffuseTexture.uScale = 2.0
    groundMaterial.diffuseTexture.vScale  = 2.0
    groundMaterial.useGlossinessFromSpecularMapAlpha = true
    this.ground = new MeshBuilder.CreateGround('ground', {
      width: 100,
      height: 100,
    })
    this.ground.material = groundMaterial
  }

  createHouse () {
    const houseFoorMaterial = new StandardMaterial('houseFoorMaterial', this.scene)
    houseFoorMaterial.diffuseTexture = new Texture('/texture/houseRoof1.jpg', this.scene, false, false)
    houseFoorMaterial.bumpTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_normal.png")
    houseFoorMaterial.reflectionTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_reflection.png")
    houseFoorMaterial.specularTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_height.png")
    houseFoorMaterial.ambientTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_glossiness.png")

    const houseRoof = new MeshBuilder.CreateCylinder('houseRoof', {
      diameter: 3,
      height: 5,
      tessellation: 3
    })
    houseRoof.rotation.set(0, 0, Math.PI / 2)
    houseRoof.position.set(0, 3, 0)
    houseRoof.scaling.set(0.7, 1, 1)
    houseRoof.material = houseFoorMaterial

    const houseContentMaterial = new StandardMaterial('houseContentMaterial', this.scene)
    houseContentMaterial.diffuseTexture = new Texture("/texture/semihouse.png");

    const faceUV = [];
    faceUV[0] = new Vector4(0, 0.0, 0.32, 1.0); //rear face
    faceUV[1] = new Vector4(0, 0.0, 0.32, 1.0);
    faceUV[2] = new Vector4(0.79, 0.0, 0.92, 1.0);
    faceUV[3] = new Vector4(0.79, 0.0, 0.92, 1.0);

    const houseContent = new MeshBuilder.CreateBox('houseContent', {
      height: 2.5,
      width: 4.5,
      depth: 2,
      faceUV: faceUV,
      wrap: true
    })
    houseContent.material = houseContentMaterial
    houseContent.position.set(0, 2.5 / 2, 0)
  }

}