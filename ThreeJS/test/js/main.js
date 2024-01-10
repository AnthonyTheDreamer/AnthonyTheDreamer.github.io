//create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 50;

//add shape
const geometry = new THREE.TorusGeometry(10, 5, 16, 100);
const material = new THREE.MeshStandardMaterial({ 
    color: 0xc68958
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//add lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)

//render scene
const animate = () => {
	requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

	renderer.render(scene, camera);
}

animate();