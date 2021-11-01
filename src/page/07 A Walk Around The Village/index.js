import { Animation, ArcRotateCamera, Axis, Color3, Color4, HemisphericLight, Mesh, MeshBuilder, SceneLoader, Space, StandardMaterial, Texture, Tools, Vector3 } from "@babylonjs/core"
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
    
  }

  createCamera () {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(0, 70, 0))
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

  createCharacterAnimation () {
    SceneLoader.ImportMeshAsync("him", "/model/dude/", "Dude.babylon", this.scene).then((result) => {
      this.dude = result.meshes[0];
      this.dude.scaling = new Vector3(0.1, 0.1, 0.1);
      this.scene.beginAnimation(result.skeletons[0], 0, 100, true, 2);

      this.dude.rotate(Axis.Y, Tools.ToRadians(-90), Space.LOCAL);
      const startRotation = this.dude.rotationQuaternion.clone();

      this.createTrajectoryLines()
      const track = this.createTrack()

      let total = 0
      let point = 0
      const step = 0.05
      this.scene.onBeforeRenderObservable.add(() => {
        this.dude.movePOV(0, 0, step);
        total += step
        if (total > track[point].trip) {
          this.dude.rotate(Axis.Y, Tools.ToRadians(track[point].angle), Space.LOCAL);
          total = 0
          point += 1
          if (point >= track.length) {
            point = 0
            total = 0
          }
        }
      });
    });
  }

  createTrajectoryLines () {
    const points1 = [
      new Vector3(5, 0, -5),
      new Vector3(35, 0, -5),
      new Vector3(35, 0, 35),
      new Vector3(-35, 0, 35),
      new Vector3(-35, 0, -35),
      new Vector3(-5, 0, -35),
      new Vector3(-5, 0, -55),
      new Vector3(-55, 0, -55),
      new Vector3(-55, 0, 55),
      new Vector3(55, 0, 55),
      new Vector3(55, 0, -25),
      new Vector3(5, 0, -25),
      new Vector3(5, 0, -5),
    ]
    const points2 = [
      new Vector3(-5, 0, 5),
      new Vector3(25, 0, 5),
      new Vector3(25, 0, 25),
      new Vector3(-25, 0, 25),
      new Vector3(-25, 0, -25),
      new Vector3(-5, 0, -25),
      new Vector3(-5, 0, 5),
    ]
    const points3 = [
      new Vector3(5, 0, -35),
      new Vector3(65, 0, -35),
      new Vector3(65, 0, 65),
      new Vector3(65, 0, 65),
      new Vector3(-65, 0, 65),
      new Vector3(-65, 0, -65),
      new Vector3(5, 0, -65),
      new Vector3(5, 0, -35),
    ]
    new MeshBuilder.CreateRibbon('plane1', {
      pathArray: [
        points1,
        points1.map(item => {
          return new Vector3(item.x, 5, item.z)
        })
      ],
      sideOrientation: Mesh.DOUBLESIDE,
      closePath: true
    })
    new MeshBuilder.CreateRibbon('plane2', {
      pathArray: [
        points2,
        points2.map(item => {
          return new Vector3(item.x, 5, item.z)
        })
      ],
      sideOrientation: Mesh.DOUBLESIDE,
      closePath: true
    })
    new MeshBuilder.CreateRibbon('plane3', {
      pathArray: [
        points3,
        points3.map(item => {
          return new Vector3(item.x, 5, item.z)
        })
      ],
      sideOrientation: Mesh.DOUBLESIDE,
      closePath: true
    })
  }

  createTrack () {
    const track = [];
    track.push(new walk(30, -90))
    track.push(new walk(30, -90))
    track.push(new walk(60, -90))
    track.push(new walk(60, -90))
    track.push(new walk(90, -90))
    track.push(new walk(90, -90))
    track.push(new walk(120, -90))
    track.push(new walk(120, -90))
    track.push(new walk(60, -90))
    track.push(new walk(60, 90))
    return track
  }
}


class walk {
  /**
   * 
   * @param {*} trip 行程
   * @param {*} angle 转向角度
   */
  constructor (trip, angle) {
    this.trip = trip
    this.angle = angle
  }
}