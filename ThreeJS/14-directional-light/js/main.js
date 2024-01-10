let scene, camera, renderer;
let speed = 0.1;
let cube, cone, plane, sphere;
let light, lightHelper

const createGeometry = () => {
    let geometry = new THREE.BoxGeometry(5, 5, 5);
    let material = new THREE.MeshPhongMaterial({
        color: 0x0f1d89,
        shininess: 100,
        side: THREE.DoubleSide
    });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(-10, -5, -6);

    geometry = new THREE.ConeGeometry(3, 4, 20, 1, true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.set(7, -5, 0);

    geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
    material = new THREE.MeshPhongMaterial({
        color: 0x693421,
        side: THREE.DoubleSide
    })
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI/2;
    plane.position.y = -100;

    geometry = new THREE.SphereGeometry(1, 30, 30);
    material = new THREE.MeshPhongMaterial({
        color: 0xffd700
    })
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(10, 0, 5);

    scene.add(cube);
    scene.add(cone);
    scene.add(plane);
    scene.add(sphere);
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
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(10, 5, 0);
    scene.add(light);

    //light helper
    //lightHelper = new THREE.DirectionalLightHelper(light, 5, 0xffffff);
    //scene.add(lightHelper);

    //create geometry
    createGeometry();

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
    geometryAnimation();

    light.position.x += speed;
    sphere.position.x += speed;
    if (light.position.x > 10 || light.position.x < -10) {
        speed *= -1;
    }
    // lightHelper.update();

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