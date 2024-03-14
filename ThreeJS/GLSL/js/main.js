let scene, camera, renderer, cube1, cube2, spotLight, plane, uniforms;

const vshader = `
void main() {	
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fshader = `
uniform vec3 u_color;

void main (void)
{
  gl_FragColor = vec4(u_color, 1.0); 
}
`

const init = () => {
  //create scene
  scene = new THREE.Scene();

  //create camera
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  //create render
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  uniforms = {
    u_color: { value: new THREE.Color(0x888888) },
    u_time: { value: 0.0 },
    u_mouse: { value: { x: 0.0, y: 0.0 } },
    u_resolution: { value: { x: 0, y: 0 } }
  }

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vshader,
    fragmentShader: fshader
  });

  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
};

const move = (evt) => {
  uniforms.u_mouse.value.x = (evt.touches) ? evt.touches[0].clientX : evt.clientX;
  uniforms.u_mouse.value.y = (evt.touches) ? evt.touches[0].clientY : evt.clientY;
}

const loop = () => {
  renderer.render(scene, camera);
  uniforms.u_time.value += clock.getDelta();
  requestAnimationFrame(loop);
};

const onWindowResize = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  let width, height;
  if (aspectRatio >= 1) {
    width = 1;
    height = (window.innerHeight / window.innerWidth) * width;
  } else {
    width = aspectRatio;
    height = 1;
  }
  camera.left = -width;
  camera.right = width;
  camera.top = height;
  camera.bottom = -height;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = window.innerWidth;
  uniforms.u_resolution.value.y = window.innerHeight;
}

init();
onWindowResize();
loop();

window.addEventListener("resize", onWindowResize, false);