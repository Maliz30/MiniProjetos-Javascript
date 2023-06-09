import * as THREE from './node_modules/three'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';
/*
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0,10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );

scene.add( line );
renderer.render( scene, camera );
*/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // FieldOfView, aspectRatio, near, far 



const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,2,5)
scene.add(light)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = false; //Trava a camera
// controls.enableDamping = true; //Suavização dos movimentos
// controls.dampingFactor = 0.5; // velocidade dos movimentos
// controls.autoRotate = true;
// controls.autoRotateSpeed = 10;

controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE; //muda a rotação pro botão direito
controls.mouseButtons.LEFT = THREE.MOUSE.PAN; //muda a seleção da posição pro botão esquerdo

controls.keys = { //Seleção da posição com as setinhas
	LEFT: 'ArrowLeft',
	UP: 'ArrowUp',
	RIGHT: 'ArrowRight',
	BOTTOM: 'ArrowDown'

}
controls.listenToKeyEvents(window);
controls.keyPanSpeed = 50;

const loader = new GLTFLoader();

loader.load( './assets/bugs_bunny/scene.gltf', (gltf) => {
	const model = gltf.scene;
	model.scale.set(0.2,0.2,0.2);
	renderer.outputColorSpace = THREE.SRGBColorSpace;

	const texture = new THREE.TextureLoader().load();
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 4, 4 );

	scene.add( model );

}, undefined, function ( error ) {

	console.error( error );

} );

function animate(){
	requestAnimationFrame(animate)
	controls.update();
	renderer.render( scene, camera );
}

animate()