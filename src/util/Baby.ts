import { ArcRotateCamera, Camera, Color3, Engine, FreeCamera, HemisphericLight, Light, Mesh, MeshBuilder, Nullable, PBRMaterial, Scene, Vector3 } from "@babylonjs/core";

export class CreateScene {
  engine: Engine
  scene: Scene
  ground: Mesh
  camera: Nullable<ArcRotateCamera>
  globalLight: Nullable<HemisphericLight>
  groundMaterial: PBRMaterial

  constructor(engine: Engine, scene: Scene) {
    this.engine = engine;
    this.scene = scene;
  }

  // 创建地面
  createGround(size: number = 500): Mesh {
    this.groundMaterial = new PBRMaterial('groundMaterial', this.scene)
    this.groundMaterial.metallic = 150 // 金属光泽
    this.groundMaterial.roughness = 10 // 粗糙度
    this.groundMaterial.albedoColor = new Color3(0.5, 0.5, 0.6)
    this.groundMaterial.emissiveColor = new Color3(0.005, 0.005, 0.005)
    this.ground = MeshBuilder.CreatePlane('ground', {
      size,
      sideOrientation: Mesh.DOUBLESIDE
    })
    this.ground.material = this.groundMaterial
    this.ground.rotation.set(Math.PI / 2, 0, 0)
    this.ground.receiveShadows = true
    return this.ground
  }

  createGlobalLight(): void {
    this.globalLight = new HemisphericLight('globalLight', new Vector3(-5, 10, -10), this.scene)
    this.globalLight.intensity = 0.0001
  };

}

export default interface InitScene extends CreateScene {
  createCamera(): void;
  createGlobalLight(): void;
}
