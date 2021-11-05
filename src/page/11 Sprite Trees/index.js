import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  ShaderMaterial,
  Sprite,
  SpriteManager,
  StandardMaterial,
  Vector3
} from "@babylonjs/core"
import {
  conversionColorHex
} from "/src/util/conversionColor.js"

export default function(engine, scene) {
  new SpriteTrees(engine, scene)
}

class SpriteTrees {
  constructor(engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLight()
    this.createGround()
    this.generatorTrees()
  }

  createCamera() {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(0, 200, 100))
    this.camera.attachControl(true)
  }

  createGround() {
    const groundMaterial = new StandardMaterial('groundMaterial', this.scene)
    groundMaterial.diffuseColor = conversionColorHex('#DFDFDF')
    this.ground = new MeshBuilder.CreateGround('ground', {
      width: 300,
      height: 300,
    }, this.scene)
    this.ground.material = groundMaterial
  }

  createLight() {
    this.light = new HemisphericLight('light', new Vector3(0, 100, 30))
  }

  generatorTrees() {
    const treeImageUrl = "https://doc.babylonjs.com/_next/image?url=%2Fimg%2Fgetstarted%2Fpalmtree.png&w=1920&q=75"
    const spriteManagerTrees = new SpriteManager('treesManager', treeImageUrl, 2000, {
      width: 512,
      height: 1024
    }, this.scene)

    for (let i = 0; i < 500; i++) {
      const tree = new Sprite("tree", spriteManagerTrees);
      tree.size = 10
      tree.position.x = Math.random() * 140 * (Math.random() > 0.5 ? 1 : -1);
      tree.position.z = Math.random() * 140 * (Math.random() > 0.5 ? 1 : -1);
      tree.position.y = 5;
    }
  }

}