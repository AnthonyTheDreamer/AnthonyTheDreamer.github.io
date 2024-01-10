let scene, camera, renderer, sphere, target, texture;
let ADD = 0.005,
  theta = 0;

const createGeometry = () => {
  let texture = new THREE.TextureLoader().load("./textures/texture.jpg");
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  let geometry = new THREE.SphereGeometry(5, 100, 100);
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

const geometryAnimation = () => {};

const init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  //create camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  target = new THREE.Object3D();
  camera.lookAt(target.position);

  // create geometry
  createGeometry();

  //add light
  // light = new THREE.DirectionalLight(0xffffff, 1);
  // scene.add(light);

  // mouse
  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.x = mouse.y = -1;

  //create render
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};

const loop = () => {
  //   geometryAnimation();

  target.position.x = 10 * Math.sin(theta);
  target.position.z = 10 * Math.cos(theta);
  theta += ADD;
  camera.lookAt(target.position);

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

init();
loop();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
