let scene, camera, renderer;
let speed = 0.01;
let torus;

const createGeometry = () => {
    let geometry = new THREE.BufferGeometry;

    let verticies = new Float32Array([
        3, 0, 0,
        0, 5, 0,
        0, 0, 2,
        0, 5, 0,
        0, 0, 2,
        1, 2, -2, 
        3, 0, 0,
        0, 0, 2,
        1, 2, -2
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(verticies, 3));

    let material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, wireframe: true });
    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);
}

const geometryAnimation = () => {
    shape.rotation.x += speed;
    shape.rotation.y += speed;

    if (shape.rotation.y >= 360) {
        shape.rotation.y = 0;
    }

    if (shape.rotation.x >= 360) {
        shape.ration.x = 0;
    }
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