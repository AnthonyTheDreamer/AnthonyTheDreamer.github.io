let scene, camera, renderer;
let speed = 0.01;
let torus;
let cube, sphere, cone;

const createGeometry = () => {
    // let material = new THREE.MeshLambertMaterial({ 
    //     side: THREE.DoubleSide, 
    //     color: 0x7fc5f9, 
    //     emissive: 0x25673d,
    //     emissiveIntensity: 0.5 });

    // let material = new THREE.MeshPhongMaterial({
    //     side: THREE.DoubleSide,
    //     color: 0x7fc5f9,
    //     emissive: 0x25673d,
    //     emissiveIntensity: 0.5,
    //     shininess: 100,
    //     specular: 0x9d0a00
    // })

    let material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: 0x7fc5f9,
        emissive: 0x25673d,
        emissiveIntensity: 0.4,
        metalness: 1,
        roughness: 1
    })

    let geometry = new THREE.BoxGeometry(3, 3, 3);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -6;

    geometry = new THREE.SphereGeometry(3, 30, 30);
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = 0;

    geometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.x = 7;

    scene.add(cube);
    scene.add(sphere);
    scene.add(cone);
}

const geometryAnimation = () => {
    cube.rotation.x += speed;
    cube.rotation.y += speed;

    sphere.rotation.x += speed;
    sphere.rotation.y += speed;

    cone.rotation.x += speed;
    cone.rotation.y += speed;
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    //add directional light
    let directionalLightUp = new THREE.DirectionalLight(0xffffff);
    scene.add(directionalLightUp);

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