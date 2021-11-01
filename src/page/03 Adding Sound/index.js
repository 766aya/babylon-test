import { ActionManager, ArcRotateCamera, Color3, ExecuteCodeAction, FreeCamera, HemisphericLight, Mesh, MeshBuilder, PointLight, Sound, StandardMaterial, Vector3 } from "@babylonjs/core"
import { conversionColorHex } from "/src/util/conversionColor.js"

export default function (engine, scene) {
  new AddingSound(engine, scene)
}

class AddingSound {

  constructor (engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLights()

    this.backgroundSound = this.initBackgroundSound()
    this.initMaterials()
    this.initMediaControls()
    this.initEventListener()
  }

  createCamera () {
    this.camera = new FreeCamera('camera', new Vector3(0, 0, -50), this.scene)
    // this.camera.attachControl(true)
  }

  createLights () {
    new HemisphericLight('light1', new Vector3(0, 10, 0), this.scene)
    new PointLight('light2', new Vector3(5, 10, 0), this.scene)
  }

  initBackgroundSound () {
    const sound = new Sound('backgroundSound', "/sounds/test.mp3", this.scene, () => {
      console.log('on sound ready')
    }, {
      autoplay: false,
      loop: true
    })
    return sound
  }

  initMaterials () {
    const buttonPlayMaterail = new StandardMaterial('buttonPlayMaterail', this.scene)
    buttonPlayMaterail.emissiveColor = conversionColorHex('#409EFF')
    buttonPlayMaterail.diffuseColor = conversionColorHex('#409EFF')
    buttonPlayMaterail.ambientColor = conversionColorHex('#409EFF')
  }
  
  initMediaControls () {
    // 播放键
    const playButton = new MeshBuilder.CreateDisc('buttonPlay', {
      radius: 1,
      tessellation: 3,
      sideOrientation: Mesh.DOUBLESIDE,
    })
    playButton.setMaterialByID('buttonPlayMaterail')
    
  }

  initEventListener () {
    const self = this;

    this.scene.onPointerMove = function () {
      const pickResult = self.scene.pick(this.pointerX, this.pointerY)
      const el = document.getElementById('renderCanvas')
      if (pickResult.hit) {
        el.style.cursor = 'pointer'
      } else {
        el.style.cursor = 'default'
      }
    }

    this.scene.onPointerPick = function () {
      const pickResult = self.scene.pick(this.pointerX, this.pointerY);
      if (pickResult?.pickedMesh.name === 'buttonPlay') {
        self.backgroundSound.pause()
        self.backgroundSound.isPlaying === false ? self.backgroundSound.play(0, self.backgroundSound.currentTime) : self.backgroundSound.pause()
        console.log(self.backgroundSound)
      }
    }

  }
}