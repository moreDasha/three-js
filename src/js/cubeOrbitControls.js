import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { updateOnResize } from './helper/updateOnResize';

export const cubeOrbitControls = () => {

  if (!document.querySelectorAll('.js-cube-orbit-controls').length) {
    return
  }

  const scene = new THREE.Scene();
  const canvas = document.querySelector('.js-cube-orbit-controls');

  const geometry = new THREE.BoxGeometry(1.1, 1.1, 1.1, 8, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: '#FFB600', 
    wireframe: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI * 0.2;
  mesh.rotation.y = Math.PI * 0.2;
  scene.add(mesh);

  const size = {
    width: document.documentElement.clientWidth * 0.75,
    height: document.documentElement.clientWidth * 0.75 / 3 * 2
  };
  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 3;
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);

  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener('resize', () => {
    updateOnResize(size, camera, renderer, scene);
  });
}