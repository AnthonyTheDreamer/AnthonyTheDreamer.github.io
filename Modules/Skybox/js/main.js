import * as THREE from 'three';
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
    this.camera.position.set(1200, -250, 20000);

    //create render
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.id = "canvas";
    document.body.appendChild(this.renderer.domElement);

    // create control
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.minDistance = 700;
    this.controls.maxDistance = 1500;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1.0;

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.initSkybox();
    this.animate();
  }

  async initSkybox() {
    const skyboxImage = "nightsky";
    const materialArray = await this.createMaterialArray(skyboxImage);
    const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    this.skybox = new THREE.Mesh(skyboxGeo, materialArray);
    this.scene.add(this.skybox);
  }

  createPathStrings(filename) {
    const basePath = "textures/skybox/";
    const baseFilename = basePath + filename;
    const fileType = ".png";
    const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
    return sides.map((side) => baseFilename + "_" + side + fileType);
  }

  async createMaterialArray(filename) {
    const skyboxImagepaths = this.createPathStrings(filename);

    // Load all textures asynchronously
    const texturePromises = skyboxImagepaths.map((image) => {
      return new Promise((resolve, reject) => {
        new THREE.TextureLoader().load(image, resolve, undefined, reject);
      });
    });

    try {
      // Wait for all textures to load
      const textures = await Promise.all(texturePromises);

      // Create materials using loaded textures
      return textures.map((texture) => {
        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
      });
    } catch (error) {
      console.error("Error loading textures:", error);
      return []; // Return empty array or handle error as needed
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Initialize
new App();