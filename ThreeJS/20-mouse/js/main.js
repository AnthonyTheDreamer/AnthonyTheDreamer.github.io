let scene, camera, renderer, light1, light2, rayCast, mouse;
let cube, sphere;

const onMouseClick = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.z = 1;
  rayCast.setFromCamera(mouse, camera);
};

const createGeometry = () => {
  let geometry = new THREE.SphereGeometry(5, 30, 30);
  let material = new THREE.MeshPhongMaterial({
    color: 0x0450fb,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(1, 4, -10);

  geometry = new THREE.BoxGeometry(5, 5, 5);
  material = new THREE.MeshPhongMaterial({
    color: 0xff4500,
    shininess: 100,
    side: THREE.DoubleSide,
  });
  cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
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
  camera.position.set(0, 10, 40);

  //add light
  light1 = new THREE.DirectionalLight(0xffffff, 1);
  light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, -5, 2);

  scene.add(light1);
  scene.add(light2);

  //create geometry
  createGeometry();

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

  sphere.material.color.set(0x045fb);
  cube.material.color.set(0xff4500);

  let intersects = rayCast.intersectObjects(scene.children);
  intersects.forEach((obj) => obj.object.material.color.set(0x00ff00));

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
