import { SRGBColorSpace } from 'three';
import * as THREE from './node_modules/three'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // FieldOfView, aspectRatio, near, far 

const loader = new GLTFLoader();

loader.load( './assets/squidward_tentacles/scene.gltf', ( gltf ) => {
	const model = gltf.scene;
	model.scale.set(0.2,0.2,0.2);
	scene.add( model );

}, undefined, function ( error ) {

	console.error( error );

} );

const light = new THREE.DirectionalLight(0xf0f0f0, 1)
light.position.set(2,2,5)
scene.add(light)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 5;



function animate(){
	requestAnimationFrame(animate)
	renderer.render( scene, camera );
}

animate()