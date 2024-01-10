let scene, camera, renderer, light, rayCast, mouse;
let sphere;
let ADD = 0.01,
  theta = 0;
const RADIUS = 5,
  BASE_X = -20,
  BASE_Y = -20;

const onMouseClick = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.z = 1;

  rayCast.setFromCamera(mouse, camera);

  createSphere(rayCast.ray.at(100, rayCast.ray.direction));
};

const createSphere = (position) => {
  let geometry = new THREE.SphereGeometry(RADIUS, 30, 30);
  let material = new THREE.MeshPhongMaterial({
    color: 0x4a57fa,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(position.x, position.y, position.z);

  scene.add(sphere);
};

const geometryAnimation = () => {};

const init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  //create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 40);

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
  document.addEventListener("click", onMouseClick, false);
};

const loop = () => {
  //   geometryAnimation();

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
