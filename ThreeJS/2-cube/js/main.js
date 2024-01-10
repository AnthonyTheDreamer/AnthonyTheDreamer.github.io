let scene, camera, renderer;
let speed = 0.1;

const addAxesHelper = () => {
    axes = new THREE.AxesHelper(5);
    scene.add(axes);
}

const createCube = () => {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00a1cb });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

const cubeAnimation = () => {
    cube.rotation.y += speed;

    if (cube.rotation.y >= 360) {
        cube.rotation.y = 0;
    }
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    //axes helper
    addAxesHelper();

    //create cube
    createCube();

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
    cubeAnimation();

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