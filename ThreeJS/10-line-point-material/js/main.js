let scene, camera, renderer;
let speed = 0.01;
let torus;
let cylinder, sphere;

const createGeometry = () => {
    let material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 });

    let geometry = new THREE.CylinderGeometry(3, 2, 4);
    cylinder = new THREE.Line(geometry, material);
    cylinder.position.z = -10;
    cylinder.position.x = -5;

    cylinder.computeLineDistances();

    geometry = new THREE.SphereGeometry(3, 30, 30);
    sphere = new THREE.Line(geometry, material);
    sphere.position.z = 0;
    sphere.position.x = 5;

    sphere.computeLineDistances();

    scene.add(cylinder);
    scene.add(sphere);
}

const geometryAnimation = () => {
    cylinder.rotation.x += speed;
    sphere.rotation.x += speed;

    cylinder.rotation.y += speed;
    sphere.rotation.y += speed;
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

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