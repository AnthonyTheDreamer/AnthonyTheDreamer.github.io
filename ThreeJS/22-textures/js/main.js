let scene, camera, renderer;
let cube;
let ADD = 0.02;

const createGeometry = () => {
  let texture = new THREE.TextureLoader().load("./textures/texture.jpg");
  let material = new THREE.MeshBasicMaterial({ map: texture });
  let geometry = new THREE.BoxGeometry(4, 4, 4);
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
};

const geometryAnimation = () => {};

const init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 40);

  // create geometry
  createGeometry();

  //add light
  light = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light);

  // mouse
  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.x = mouse.y = -1;

  //create render
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};

const loop = () => {
  //   geometryAnimation();
  cube.rotation.y += ADD;
  cube.rotation.x += ADD;
  cube.rotation.x += ADD;

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
