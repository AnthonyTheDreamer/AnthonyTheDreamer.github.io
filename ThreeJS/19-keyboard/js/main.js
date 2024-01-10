const LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
  W = 87,
  S = 83,
  A = 65,
  D = 68;
let scene, camera, renderer, light;
let cubes = [];
let SPEED = 0.5;

let randomInRange = (from, to) => {
  return Math.random() * (to - from) + from;
};

const createCube = () => {
  let w = randomInRange(1, 3);
  let h = randomInRange(1, 3);
  let d = randomInRange(1, 3);

  let geometry = new THREE.BoxGeometry(w, h, d);
  let material = new THREE.MeshPhongMaterial({
    color: Math.random() * 0xffffff,
    shininess: 100,
    side: THREE.DoubleSide,
  });

  let cube = new THREE.Mesh(geometry, material);
  cube.position.x = randomInRange(-40, 40);
  cube.position.z = randomInRange(-40, 40);
  cubes.push(cube);
};

const onKeyDown = (e) => {
  switch (e.keyCode) {
    case RIGHT:
      camera.rotation.y -= SPEED * 0.05;
      break;
    case LEFT:
      camera.rotation.y += SPEED * 0.05;
      break;
    case UP:
      camera.position.y += SPEED;
      break;
    case DOWN:
      camera.position.y -= SPEED;
      break;
    case W:
      camera.position.z -= SPEED;
      break;
    case S:
      camera.position.z += SPEED;
      break;
    case A:
      camera.position.x -= SPEED;
      break;
    case D:
      camera.position.x += SPEED;
      break;
    default:
      break;
  }
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
  camera.position.set(0, 5, 100);

  //add light
  light = new THREE.DirectionalLight(0xffffff, 1);

  scene.add(light);

  //create geometry
  for (let i = 1; i <= 150; i++) {
    createCube();
  }

  cubes.forEach((cube) => scene.add(cube));

  //create render
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("keydown", onKeyDown, false);
};

const animate = () => {
  //   geometryAnimation();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

init();
animate();

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
