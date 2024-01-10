let scene, camera, renderer;
let speed = 0.01;
let torus;
let cube, sphere;

const createGeometry = () => {
    let material = new THREE.MeshDepthMaterial();

    let geometry = new THREE.BoxGeometry(3, 2, 4);
    cube = new THREE.Mesh(geometry, material);
    cube.position.z = -10;
    cube.position.x = -5;

    geometry = new THREE.SphereGeometry(3, 30, 30);
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.z = 0;
    sphere.position.x = 5;

    scene.add(cube);
    scene.add(sphere);
}

const geometryAnimation = () => {
    cube.position.z += speed;
    sphere.position.z -= speed;

    if (cube.position.z >= 6 || cube.position.z <= -16) {
        speed *= -1;
    }
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    //create geometry
    createGeometry();

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
    geometryAnimation();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

init();
animate();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}