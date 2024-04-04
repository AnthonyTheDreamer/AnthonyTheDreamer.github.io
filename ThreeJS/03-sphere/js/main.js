let scene, camera, renderer;
let speed = 0.01;
let sphere;

const addAxesHelper = () => {
    axes = new THREE.AxesHelper(5);
    scene.add(axes);
}

const createSphere = () => {
    let geometry = new THREE.SphereGeometry(5, 30, 30);
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

const sphereAnimation = () => {
    sphere.rotation.x += speed;
    sphere.rotation.y += speed;

    if (sphere.rotation.y >= 360) {
        sphere.rotation.y = 0;
    }

    if (sphere.rotation.x >= 360) {
        sphere.ration.x = 0;
    }
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    //axes helper
    // addAxesHelper();

    //create sphere
    createSphere();

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
    sphereAnimation();

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