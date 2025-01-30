import * as THREE from 'three';
import { SIZE } from './helper/size';
import { updateOnResize } from './helper/updateOnResize';

export const cubeCustomControls = () => {

  if (!document.querySelectorAll('.js-cube-custom-controls').length) {
    return
  }

  const scene = new THREE.Scene();
  const canvas = document.querySelector('.js-cube-custom-controls');

  const size = SIZE

  const geometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);
  const texture = new THREE.TextureLoader().load('img/texture_02.jpg');
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 3;
  camera.lookAt(mesh.position);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);

  const cursor = {
    x: 0,
    y: 0
  };

  canvas.addEventListener('mousemove', (e) => {
    cursor.x = -(e.clientX / size.width - 0.5);
    cursor.y = e.clientY / size.height - 0.5;
  });

  const animate = () => {
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    camera.position.y = cursor.y * 6;
    camera.lookAt(mesh.position);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener('resize', () => {
    updateOnResize(size, camera, renderer, scene);
  });
}