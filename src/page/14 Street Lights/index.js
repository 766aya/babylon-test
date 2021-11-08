import {
  ArcRotateCamera,
  AssetsManager,
  Color3,
  Color4,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  SceneLoader,
  SpotLight,
  StandardMaterial,
  Texture,
  TransformNode,
  Vector3
} from "@babylonjs/core"
import {
  conversionColorHex
} from "/src/util/conversionColor.js"

export default function init(engine, scene) {
  new StreetLights(engine, scene)
}

class StreetLights {
  constructor(engine, scene) {
    this.engine = engine
    this.engine.disableUniformBuffers = true;
    this.scene = scene
    scene.clearColor = new Color3(0, 0, 0)
    this.createCamera()
    this.createGround()
    this.createStreetLightMesh()
    this.createStreetLightMesh(true)
    // this.createLight()
  }

  createCamera() {
    const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 10, new Vector3.Zero(), this.scene)
    camera.setPosition(new Vector3(70, 150, 30))
    camera.attachControl(true)
    camera.upperBetaLimit = Math.PI / 2 - 0.05
  }

  createLight() {
    const light = new HemisphericLight('light', new Vector3(0, 50, 0), this.scene)
    light.intensity = 0.001;
  }

  createGround() {
    const groundMaterial = new PBRMaterial(`${Math.random()}`, this.scene)
    // groundMaterial.ambientColor = conversionColorHex('#DDDDDD', 1)
    // groundMaterial.albedoColor = conversionColorHex('#FFFFFF', 1)
    groundMaterial.metallic = 10
    groundMaterial.roughness = 0.6
    groundMaterial.environmentIntensity = 1
    groundMaterial.maxSimultaneousLights = 30
    const ground = new MeshBuilder.CreatePlane(`${Math.random()}`, {
      width: 1000,
      height: 1000,
      sideOrientation: Mesh.DOUBLESIDE
    }, this.scene)
    ground.rotation.set(Math.PI / 2, 0, 0)
    ground.material = groundMaterial
    return ground
  }

  createStreetLightMesh(status) {
    SceneLoader.ImportMeshAsync("", "/model/Street Lamp/", "StreetLamp.babylon").then((result) => {
      const shereMaterial = new StandardMaterial("shereMaterial")
      const lampMaterial = new StandardMaterial("lampMaterial")
      const lightMaterial = new StandardMaterial("lightMaterial")
      const yellowMaterial = new StandardMaterial('yellowMaterial')
      shereMaterial.emissiveColor = conversionColorHex('#409EFF')

      lampMaterial.emissiveColor = conversionColorHex('#DDDDDD')
      lampMaterial.diffuseTexture = new Texture("/texture/metal2.jpg")
      lampMaterial.diffuseTexture.uScale = 1
      lampMaterial.diffuseTexture.vScale = 1
      lampMaterial.diffuseColor = conversionColorHex('#DDDDDD')

      lightMaterial.diffuseColor = conversionColorHex('#FFFFFF')

      yellowMaterial.emissiveColor = Color3.Yellow()

      const shere = result.meshes[0] // 小球
      const lampstandard = result.meshes[1] // 灯柱
      const lampPost = result.meshes[2] // 灯杆2
      const lampCover = result.meshes[3] // 灯罩
      const lampBulb = result.meshes[4] // 灯泡

      shere.material = shereMaterial
      lampPost.material = lampMaterial
      lampCover.material = lampMaterial
      lampstandard.material = lampMaterial
      lampBulb.material = yellowMaterial

      result.meshes[5].dispose()

      const lampLight = new SpotLight('lampLight', new Vector3(7, 13.5, 0), new Vector3(0, -1, 0), 0.8 * Math.PI, 15, this.scene)
      lampLight.diffuse = Color3.Yellow();

      result.meshes.forEach((mesh, index) => {
        if (index !== 0) {
          mesh.parent = result.meshes[0]
        }
      })
      lampLight.parent = result.meshes[0]

      for (let i = -5; i < 4; i++) {
        const streetLight2 = result.meshes[0].clone(`streetLight${i+5}`, null, false)
        streetLight2.position.set(status ? -35 : 35, 0, 22 * i + 22)
        if (!status) {
          streetLight2.rotation.set(0, Math.PI, 0)
        }
      }

      result.meshes[0].dispose()
    })
  }
}