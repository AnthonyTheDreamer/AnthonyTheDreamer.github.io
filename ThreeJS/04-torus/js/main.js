let scene, camera, renderer;
let speed = 0.01;
let torus;

const addAxesHelper = () => {
    axes = new THREE.AxesHelper(5);
    scene.add(axes);
}

const createTorus = () => {
    let geometry = new THREE.TorusGeometry(5, 2, 30, 30);
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
}

const torusAnimation = () => {
    torus.rotation.x += speed;
    torus.rotation.y += speed;

    if (torus.rotation.y >= 360) {
        torus.rotation.y = 0;
    }

    if (torus.rotation.x >= 360) {
        torus.ration.x = 0;
    }
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    //axes helper
    // addAxesHelper();

    //create torus
    createTorus();

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
    torusAnimation();

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