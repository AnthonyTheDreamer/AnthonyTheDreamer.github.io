let scene, camera, renderer;
let speed = 0.05;
let cube, sphere1, sphere2;
let light, light2;
let theta = 0;

const createGeometry = () => {
    let geometry = new THREE.BoxGeometry(5, 5, 5);
    let material = new THREE.MeshPhongMaterial({
        color: 0xdff913,
        shininess: 100,
        side: THREE.DoubleSide
    });
    cube = new THREE.Mesh(geometry, material);
    cube.rotation.set(0.6, 0.6, 0);

    geometry = new THREE.SphereGeometry(0.1, 30, 30);
    material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    sphere1 = new THREE.Mesh(geometry, material);

    sphere2 = new THREE.Mesh(geometry, material);

    scene.add(cube);
    scene.add(sphere1);
    scene.add(sphere2);
}

const geometryAnimation = () => {
    
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);

    //add light
    light = new THREE.PointLight(0xffffff, 2, 20, 2);
    light.position.set(0, 5, 0);
    scene.add(light);

    light2 = new THREE.PointLight(0xffffff, 2, 20, 2);
    scene.add(light2);

    //create geometry
    createGeometry();

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
    geometryAnimation();

    light.position.x = 6 * Math.sin(theta);
    light.position.z = 6 * Math.cos(theta);
    sphere1.position.x = light.position.x;
    sphere1.position.z = light.position.z;
    theta += speed;

    light2.position.y = -6 * Math.sin(theta);
    light2.position.z = -6 * Math.sin(theta);
    sphere2.position.y = light2.position.y;
    sphere2.position.z = light2.position.z;

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