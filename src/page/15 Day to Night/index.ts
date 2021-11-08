import { ArcRotateCamera, Color3, Color4, DirectionalLight, Engine, HemisphericLight, Mesh, MeshBuilder, PBRMaterial, ShadowGenerator, SpotLight, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Control, Slider, StackPanel, TextBlock } from "@babylonjs/gui";
import { Scene } from "@babylonjs/core/scene";

export default function init(engine: Engine, scene: Scene) {
  new DayToNight(engine, scene)
}

class DayToNight {

  camera: ArcRotateCamera
  engine: Engine
  scene: Scene
  ground: Mesh
  light: SpotLight
  shadowGenerator: ShadowGenerator
  adt: AdvancedDynamicTexture

  constructor(engine: Engine, scene: Scene) {
    this.engine = engine;
    this.scene = scene;

    this.createCamera()
    this.createGround()
    this.createLight()

    this.createMeshs()
    this.createGUIControl()

  }

  createCamera() {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(0, 100, 50))
    this.camera.attachControl(true)
    this.camera.upperBetaLimit = Math.PI / 2 - 0.5
  }

  createGround() {
    const groundMaterial = new PBRMaterial("groundMaterial", this.scene)
    groundMaterial.metallic = 150 // 金属光泽
    groundMaterial.roughness = 10 // 粗糙度
    groundMaterial.albedoColor = new Color3(0.5, 0.5, 0.6)
    groundMaterial.emissiveColor = new Color3(0.005, 0.005, 0.005)
    groundMaterial.environmentIntensity = 10
    this.ground = MeshBuilder.CreatePlane('ground', {
      size: 100,
      sideOrientation: Mesh.DOUBLESIDE
    })
    this.ground.rotation.set(Math.PI / 2, 0, 0)
    this.ground.material = groundMaterial
    this.ground.receiveShadows = true
  }

  createLight() {
    this.light = new SpotLight('light', new Vector3(-40, 40, -40), new Vector3(1, -1, 1), Math.PI / 5, 30, this.scene)
    this.shadowGenerator = new ShadowGenerator(1024, this.light, true)
    this.light.shadowMaxZ = 130;
    this.light.shadowMinZ = 5;
    this.shadowGenerator.useContactHardeningShadow = true;
    this.shadowGenerator.setDarkness(0.5);
  }

  createMeshs() {
    const shere = MeshBuilder.CreateSphere('shere', {
      sideOrientation: Mesh.DOUBLESIDE,
      diameter: 10
    })
    shere.position.set(0, 6, 0)
    this.shadowGenerator.addShadowCaster(shere);
  }

  createGUIControl() {
    const adt = AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

    const panel = new StackPanel();
    panel.width = "220px";
    panel.top = "-25px";
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    adt.addControl(panel);

    const header = new TextBlock();
    header.text = "Night to Day";
    header.height = "30px";
    header.color = "white";
    panel.addControl(header);

    const slider = new Slider();
    slider.minimum = 0;
    slider.maximum = 1;
    slider.borderColor = "black";
    slider.color = "gray";
    slider.background = "white";
    slider.value = 1;
    slider.height = "20px";
    slider.width = "200px";
    slider.onValueChangedObservable.add((value) => {
      if (this.light) {
        this.light.intensity = value;
      }
    });
    panel.addControl(slider);
  }

}