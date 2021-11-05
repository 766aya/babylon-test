import './style.css'
import * as earcut from "earcut";
import {
  Scene
} from '@babylonjs/core/scene';
import {
  Engine
} from '@babylonjs/core/Engines/engine';
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
import init from "./src/page/12 Lathe Turned Fountain"

window.earcut = earcut
window.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('renderCanvas');
  const engine = new Engine(canvas, true)
  const scene = new Scene(engine, {})

  init(engine, scene)

  engine.runRenderLoop(function() {
    scene.render()
  })

  window.addEventListener('resize', function() {
    engine.resize()
  })
});