let scene, camera, renderer;
let speed = 0.01;
let cube, cone, plane, light;

const createGeometry = () => {
    let geometry = new THREE.BoxGeometry(5, 5, 5);
    let material = new THREE.MeshPhongMaterial({
        color: 0x0f1d89,
        shininess: 100,
        side: THREE.DoubleSide
    });
    cube = new THREE.Mesh(geometry, material);
    cube.position.z = -6;
    cube.position.y = -5;
    cube.position.z = -6;

    geometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.x = 7;
    cone.position.y = -5;

    geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
    material = new THREE.MeshPhongMaterial({
        color: 0x693421,
        side: THREE.DoubleSide
    })
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    scene.add(cube);
    scene.add(cone);
    scene.add(plane);
}

const geometryAnimation = () => {
    light.intensity += speed;
    if (light.intensity >= 8 || light.intensity <= 1) {
        speed *= -1;
    }
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    //add light
    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

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