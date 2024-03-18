import * as THREE from 'three';
// import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class App {
  constructor() {
    // create scene
    this.scene = new THREE.Scene();

    // create camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      45,
      30000
    );
    this.camera.position.set(0, 0, 200);

    // create light
    let light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    light.position.set(0, 1, 0);
    this.scene.add(light);
    light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(0, 1, 0);
    this.scene.add(light);

    // create model
    const fbxLoader = new FBXLoader();

    fbxLoader.load('models/ToyCar.fbx', (object) => {
      this.scene.add(object);
    });

    // create render
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xccccff);
    this.renderer.domElement.id = "canvas";
    document.body.appendChild(this.renderer.domElement);

    // create control
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', this.renderer);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Initialize
new App();