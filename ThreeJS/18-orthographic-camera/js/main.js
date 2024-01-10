let scene, camera, renderer, light;
let sphere = [];
let ADD = 0.01,
  theta = 0;
const RADIUS = 5,
  BASE_X = -20,
  BASE_Y = -20;

const createGeometry = () => {
  let material = new THREE.MeshPhongMaterial({
    color: 0x0450fb,
    shininess: 100,
    side: THREE.DoubleSide,
  });

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let geometry = new THREE.SphereGeometry(RADIUS, 30, 30);
      let sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = BASE_X + j * 2 * (RADIUS + 0.5);
      sphere.position.z = -2 * RADIUS * i;
      sphere.position.y = BASE_Y + i * RADIUS;
      scene.add(sphere);
    }
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
  camera.position.set(0, 0, 40);

  //add light
  light = new THREE.DirectionalLight(0xffffff, 1);

  scene.add(light);

  //create geometry
  createGeometry();

  //create render
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
};

let switchCamera = () => {
  if (camera instanceof THREE.PerspectiveCamera) {
    camera = new THREE.OrthographicCamera(-300, 300, 400, -400, 1, 1000);
    camera.zoom = 5;
    camera.updateProjectionMatrix();
  } else {
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 40);
  }
};

const animate = () => {
  //   geometryAnimation();

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.position.x = 40 * Math.sin(theta);
  camera.position.z = 40 * Math.cos(theta);
  theta += ADD;

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
