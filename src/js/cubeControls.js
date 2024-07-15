import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const cubeControls = () => {

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: '#FFB600', 
    wireframe: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const size = {
    width: 600,
    height: 600
  }
  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 3;
  scene.add(camera);

  const canvas = document.querySelector('.canvas');

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(size.width, size.height);
  renderer.render(scene, camera);

  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };

  animate();
}