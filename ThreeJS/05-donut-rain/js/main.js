let scene, camera, renderer;
let speed = 0.01;
let donuts = [];

const random = (from, to) => {
    let x = Math.random() * (to - from);
    return x + from;
}

const createDonut = () => {
    let geometry = new THREE.TorusGeometry(1, 0.5, 5, 30);
    let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    donut = new THREE.Mesh(geometry, material);

    donut.position.x = random(-15, 15);
    donut.position.y = 20;
    donut.position.z = random(-15, 15);

    scene.add(donut);
    donuts.push(donut)
}

const init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
    //create donut
    let randomNumber = Math.random();
    if (randomNumber < 0.1) {
        createDonut();
    }

    donuts.forEach(donut => {
        donut.position.y -= speed;
    })

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