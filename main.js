import './style.css'
import * as earcut from "earcut";
import {
  Scene,
  Engine,
  SceneLoader
} from '@babylonjs/core';
import {
  OBJFileLoader,
  STLFileLoader,
} from '@babylonjs/loaders';

// import init from "./src/page/01 Getting Started"
// import init from "./src/page/02 First Playground"
// import init from "./src/page/03 Adding Sound"
// import init from "./src/page/04 Basic House"
// import init from "./src/page/05 Village Animation"
// import init from "./src/page/06 Character Animation"
// import init from "./src/page/07 A Walk Around The Village"
// import init from "./src/page/08 Avoiding a Car Crash"
// import init from "./src/page/09 Distant Hills"
// import init from "./src/page/10 LinesTest"
// import init from "./src/page/11 Sprite Trees"
// import init from "./src/page/12 Lathe Turned Fountain"
// import init from "./src/page/13 Particle Spray"
// import init from "./src/page/14 Street Lights"
// import init from "./src/page/15 Day to Night"
import init from "./src/page/16 Have a Look Around"

window.earcut = earcut

new SceneLoader.RegisterPlugin(new OBJFileLoader())

window.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('renderCanvas');
  const engine = new Engine(canvas, true)
  const scene = new Scene(engine, {})

  new init(engine, scene)

  engine.runRenderLoop(function() {
    scene.render()
  })

  window.addEventListener('resize', function() {
    engine.resize()
  })
});