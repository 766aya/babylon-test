import { Animation, ArcRotateCamera, HemisphericLight, Mesh, MeshBuilder, StandardMaterial, Texture, Vector3, Vector4 } from "@babylonjs/core"
import { conversionColorHex } from "/src/util/conversionColor.js"

export default function (engine, scene) {
  new VillageAmination(engine, scene)
}

class VillageAmination {
  constructor (engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLight()
    this.createGround()
    this.createCar()
    this.startAnimation()
  }

  createCamera () {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(5, 30, 10))
    this.camera.attachControl(true)
  }

  createLight () {
    this.light = new HemisphericLight('light', new Vector3(0, 10, 10), this.scene)
  }

  createGround () {
    const groundMaterial = new StandardMaterial('groundMaterial', this.scene)
    groundMaterial.bumpTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_normal.png")
    groundMaterial.reflectionTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_reflection.png")
    groundMaterial.specularTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_height.png")
    groundMaterial.ambientTexture = new Texture("/texture/floor/dark_old_wood_tiles_1_glossiness.png")
    groundMaterial.diffuseColor = conversionColorHex('#333333')

    this.ground = new MeshBuilder.CreateGround('ground', {
      width: 100,
      height: 100,
    })
    this.ground.material = groundMaterial
  }

  createCar() {
    const outline = [
      new Vector3(-0.3, 0, -0.1),
      new Vector3(0.2, 0, -0.1),
    ]
    
    for (let i = 0; i < 36; i++) {
      outline.push(new Vector3(0.2 * Math.cos(i * Math.PI / 72), 0, 0.2 * Math.sin(i * Math.PI / 72) - 0.1));
    }
    
    outline.push(new Vector3(0, 0, 0.1));
    outline.push(new Vector3(-0.3, 0, 0.1));

    const carFaceUv = []
    carFaceUv[0] = new Vector4(0, 0.5, 0.38, 1);
    carFaceUv[1] = new Vector4(0, 0, 1, 0.5);
    carFaceUv[2] = new Vector4(0.38, 1, 0, 0.5);

    const carMaterial = new StandardMaterial('carMaterial', this.scene)
    carMaterial.diffuseTexture = new Texture('/texture/car.png')

    this.car = new MeshBuilder.ExtrudePolygon("car", {
      shape: outline,
      depth: 0.2,
      faceUV: carFaceUv,
      wrap: true
    }, this.scene);
    
    this.car.material = carMaterial

    const wheelUV = []
    wheelUV[0] = new Vector4(0, 0, 1, 1);
    wheelUV[1] = new Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new Vector4(0, 0, 1, 1);

    const wheelMaterial = new StandardMaterial('wheelMaterial', this.scene)
    wheelMaterial.diffuseTexture = new Texture('/texture/wheel.png')

    this.wheelRB = new MeshBuilder.CreateCylinder("wheelRB", {
      diameter: 0.125,
      height: 0.05,
      faceUV: wheelUV,
    })
    this.wheelRB.material = wheelMaterial
    this.wheelRB.parent = this.car;
    this.wheelRB.position.z = -0.1;
    this.wheelRB.position.x = -0.2;
    this.wheelRB.position.y = 0.025;
    this.wheelRB.animations = []
    this.wheelRB.animations.push(this.createWheelAnimation())

    this.wheelRF = this.wheelRB.clone("wheelRF");
    this.wheelRF.position.x = 0.1;

    this.wheelLB = this.wheelRB.clone("wheelLB");
    this.wheelLB.position.y = -0.2 - 0.025;

    this.wheelLF = this.wheelRF.clone("wheelLF");
    this.wheelLF.position.y = -0.2 - 0.025;

    this.car.scaling.set(10, 10, 10)
    this.car.rotation.set(-Math.PI / 2, 0, 0)
    this.car.position.set(0, 1.65, 0)

    this.car.animations = []
    this.car.animations.push(...this.createCarAnimation())
  }

  createWheelAnimation () {
    const wheelAnimation = new Animation('wheelAnimation', "rotation.y", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
    const wheelKeys = []; 

    //At the animation key 0, the value of rotation.y is 0
    wheelKeys.push({
      frame: 0,
      value: 0
    });

    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    wheelKeys.push({
      frame: 30,
      value: 2 * Math.PI
    })

    wheelAnimation.setKeys(wheelKeys)
    return wheelAnimation
  }

  createCarAnimation () {
    const carAnimationX = new Animation('carAnimation', 'position.x', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
    const carAnimationZ = new Animation('carAnimation', 'position.z', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)

    const animationPositionPoints = [
      new Vector3(-45, 0, -45),
      new Vector3(45, 0, -45),
      new Vector3(45, 0, 45),
      new Vector3(-45, 0, 45),
      new Vector3(-45, 0, -45),
    ]
    
    const carKeysX = []
    const carKeysZ = []
    
    for (let i = 0; i < animationPositionPoints.length; i++) {
      carKeysX.push({
        frame: i * 60,
        value: animationPositionPoints[i].x
      })
      carKeysZ.push({
        frame: i * 60,
        value: animationPositionPoints[i].z
      })
    }
    carAnimationX.setKeys(carKeysX)
    carAnimationZ.setKeys(carKeysZ)

    return [ carAnimationX, carAnimationZ ]
  }

  startAnimation () {
    this.scene.beginAnimation(this.wheelRB, 0, 30, true);
    this.scene.beginAnimation(this.wheelRF, 0, 30, true);
    this.scene.beginAnimation(this.wheelLB, 0, 30, true);
    this.scene.beginAnimation(this.wheelLF, 0, 30, true);
    this.scene.beginAnimation(this.car, 0, 300, true);
  }

}