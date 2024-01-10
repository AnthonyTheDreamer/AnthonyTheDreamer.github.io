let scene, camera, renderer;

let init = () => {
    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    //create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    //create render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

const animate = () => {
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