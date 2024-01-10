let scene, camera, renderer;
let speed = 0.01;
let cube, sphere, plane, light;

const createGeometry = () => {
    let geometry = new THREE.BoxGeometry(5, 5, 5);
    let material = new THREE.MeshPhongMaterial({
        color: 0xdff913,
        shininess: 100,
        side: THREE.DoubleSide
    });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(5, 0, 0);

    geometry = new THREE.SphereGeometry(5, 30, 30);
    material = new THREE.MeshPhongMaterial({
        color: 0x66cdaa,
        shininess: 100,
        side: THREE.DoubleSide
    })
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(-5, 5, -5);

    geometry = new THREE.BoxGeometry(2000, 1, 2000);
    material = new THREE.MeshPhongMaterial({
        color: 0x693421,
        side: THREE.DoubleSide
    })
    plane = new THREE.Mesh(geometry, material);
    plane.position.y = -1;

    scene.add(cube);
    scene.add(sphere);
    scene.add(plane);
}

const geometryAnimation = () => {
    
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    //add light
    light = new THREE.HemisphereLight(0xffffff, 0x000000);
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