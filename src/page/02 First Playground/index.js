import { ArcRotateCamera, BackgroundMaterial, BoxBuilder, Color3, Color4, HemisphericLight, Mesh, MeshBuilder, PBRBaseSimpleMaterial, PointLight, ShaderMaterial, StandardMaterial, Texture, Vector3, Vector4 } from "@babylonjs/core";

export default function (engine, scene) {
  new FirstPalyground(engine, scene)
}

class FirstPalyground {
  constructor (engine, scene) {
    this.engine = engine
    this.scene = scene
    this.createCamera()
    this.createLights()
    this.createObjects()
  }

  createCamera () {
    this.camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)
    this.camera.setPosition(new Vector3(0, 5, 5))
    this.camera.attachControl(true)
  }

  createLights () {
    new HemisphericLight('light1', new Vector3(0, 10, 0), this.scene)
    new PointLight('light2', new Vector3(5, 10, 0), this.scene)
  }

  createObjects () {
    // 矩形
    const box = MeshBuilder.CreateBox('box', { size: 1 }, this.scene)
    box.position.set(0, 0.5, 0)

    const boxFaceColors = new Array(6)
    boxFaceColors[0] = new Color4(1, 0, 0, 1)
    boxFaceColors[1] = new Color4(1, 0, 0, 1)
    boxFaceColors[2] = new Color4(0, 0, 1, 1)
    boxFaceColors[3] = new Color4(0, 0, 1, 1)
    boxFaceColors[4] = new Color4(0, 1, 0, 1)
    boxFaceColors[5] = new Color4(0, 1, 0, 1)

    const box2 = MeshBuilder.CreateBox('box2', {
      size: 1,
      faceColors: boxFaceColors
    }, this.scene)
    box2.position.set(0, 0.5, 2)

    // 球形
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, this.scene)
    sphere.position.set(-2, 0.5, 0)
    
    // 创建材质
    new StandardMaterial("sphere2Material", this.scene).diffuseColor = new Color3(1, 0, 0);
    // diffuseColor = 漫反射
    // specularColor = 镜面反射
    // emissiveColor = 自发光色
    // ambientColor = 环境色

    const sphere2 = new MeshBuilder.CreateSphere('sphere2', {
      diameter: 1,
    })
    sphere2.position.set(-2, 0.5, 2)
    sphere2.setMaterialByID('sphere2Material');

    // 平面
    new MeshBuilder.CreatePlane('plane', {
      sideOrientation: Mesh.DOUBLESIDE
    }, this.scene).position.set(-4, 0.5, 0)
    
    new MeshBuilder.CreatePlane('plane2', {
      sideOrientation: Mesh.DOUBLESIDE,
    }, this.scene).position.set(-4, 0.5, 2)

    new MeshBuilder.CreateLines('lines', {
      points: [
        new Vector3(-0.5, -0.5, 0),
        new Vector3(0.5, -0.5, 0),
        new Vector3(0.5, 0.5, 0),
        new Vector3(-0.5, 0.5, 0),
        new Vector3(-0.5, -0.5, 0),
      ],
    }).position.set(2, 0.5, 0)

    const tiledBoxTexture = new Texture('/texture/TexturesCom_TilesZellige0043_2_seamless_S.png')
    const tiledBoxMaterial = new StandardMaterial('tiledBoxMaterial', this.scene)
    tiledBoxMaterial.diffuseTexture = tiledBoxTexture

    const tiledBox = new MeshBuilder.CreateTiledBox('tiledBox', {
      tileSize: 0.5,
      width: 1,
      sideOrientation: Mesh.DOUBLESIDE
    })
    tiledBox.setMaterialByID('tiledBoxMaterial')
    tiledBox.position.set(2, 0.5, 2)

    new MeshBuilder.CreateCylinder('cylinder', {
      height: 1,
      diameterBottom: 1,
      diameterTop: 0
    }).position.set(0, 0.5, -2)

    new MeshBuilder.CreateCapsule('capsule', {
      height: 1,
      radius: 0.2,
      subdivisions: 16,
      capSubdivisions: 16
    }).position.set(2, 0.5, -2)

    new MeshBuilder.CreateDashedLines('dashedLines', {
      points: [
        new Vector3(-0.5, -0.5, 0),
        new Vector3(0.5, -0.5, 0),
        new Vector3(0.5, 0.5, 0),
        new Vector3(-0.5, 0.5, 0),
        new Vector3(-0.5, -0.5, 0),
      ],
      gapSize: 0.5
    }).position.set(-2, 0.5, -2)

    new MeshBuilder.CreateDisc('disc', {
      radius: 0.5,
      tessellation: 72,
      arc: Math.PI / 60,
      sideOrientation: Mesh.DOUBLESIDE
    }).position.set(-4, 0.5, -2) 

    new MeshBuilder.CreateIcoSphere('icoSphere', {
      sideOrientation: Mesh.DOUBLESIDE,
      radius: 0.5,
      flat: true,
      subdivisions: 1
    }).position.set(4, 0.5, -2)

    new MeshBuilder.CreateLathe('lathe', {
      shape: [
        new Vector3(0, 0, 0),
        new Vector3(0, 1, 0),
        new Vector3(0.5, 0, 0),
      ],
      sideOrientation: Mesh.DOUBLESIDE,
      arc: (Math.PI / 6) / 180 * 60,
      closed: true
    }).position.set(4, 0, 0)
  }
}