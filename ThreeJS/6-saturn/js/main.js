let scene, camera, renderer;
let speed = 0.05;
let planet;
let rings = [];

const createSaturn = () => {
    //create planet
    let geometry = new THREE.SphereGeometry(4, 30, 30);
    let material = new THREE.MeshBasicMaterial({ color: 0x8d5524 });
    planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    //create rings
    geometry = new THREE.TorusGeometry(5.1, 0.7, 2, 50);
    material = new THREE.MeshBasicMaterial({ color: 0xffe39f });
    let ring = new THREE.Mesh(geometry, material);
    rings.push(ring);

    geometry = new THREE.TorusGeometry(6.9, 0.7, 2, 50);
    material = new THREE.MeshBasicMaterial({ color: 0xffad60 });
    ring = new THREE.Mesh(geometry, material);
    rings.push(ring);

    geometry = new THREE.TorusGeometry(8.5, 0.7, 2, 50);
    material = new THREE.MeshBasicMaterial({ color: 0xeac086 });
    ring = new THREE.Mesh(geometry, material);
    rings.push(ring);

    rings.forEach(ring => {
        ring.rotation.x = 1.7;
        ring.rotation.y = 0.5;
        scene.add(ring);
    })
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    //add saturn
    createSaturn();

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
    camera.position.y += speed;
    if (camera.position.y >= 5 || camera.position.y <= -5) {
        speed *= -1;
    }

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