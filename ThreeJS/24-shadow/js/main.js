let scene, camera, renderer, cube1, cube2, spotLight, plane;
let ADD = 0.005,
  theta = 0;

const createGeometry = () => {
  let material = new THREE.MeshPhongMaterial({
    color: 0xdff913,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  let geometry = new THREE.BoxGeometry(5, 5, 5);

  cube1 = new THREE.Mesh(geometry, material);
  cube1.position.set(5, 2, 0);
  cube1.castShadow = true;
  cube1.receiveShadow = true;

  geometry = new THREE.BoxGeometry(5, 6, 4);
  cube2 = new THREE.Mesh(geometry, material);
  cube2.position.set(-4, 2, 0);
  cube2.castShadow = true;

  geometry = new THREE.BoxGeometry(2000, 1, 2000);
  material = new THREE.MeshPhongMaterial({
    color: 0x693421,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.position.y = -1;
  plane.receiveShadow = true;

  scene.add(cube1);
  scene.add(cube2);
  scene.add(plane);
};

const geometryAnimation = () => {};

const init = () => {
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000);

  //create camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 5, 40);

  //add light
  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, 15, 10);
  spotLight.angle = Math.PI / 2;
  spotLight.penumbra = 0.05;
  spotLight.decay = 2;
  spotLight.distance = 200;

  // shadow
  spotLight.castShadow = true;
  spotLight.shadow.bias = 0.0001;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 1024;

  scene.add(spotLight);

  // create geometry
  createGeometry();

  // mouse
  rayCast = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  mouse.x = mouse.y = -1;

  //create render
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  document.body.appendChild(renderer.domElement);
};

const loop = () => {
  //   geometryAnimation();

  spotLight.position.x = 10 * Math.sin(theta);
  spotLight.position.z = 10 * Math.cos(theta);
  theta += ADD;

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
