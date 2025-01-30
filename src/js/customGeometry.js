import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SIZE } from './helper/size';
import { updateOnResize } from './helper/updateOnResize';

export const customGeometry = () => {
  if (!document.querySelectorAll('.js-custom-geometry').length) {
    return;
  }

  // сцена
  const scene = new THREE.Scene();
  const canvas = document.querySelector('.js-custom-geometry');

  const size = SIZE;

  // объект
  // const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
  // const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);

  const geometry = new THREE.BufferGeometry();

  const count = 55;
  const arrayLength = count * 3 * 3;
  const positionsArray = new Float32Array(arrayLength);

  for (let i = 0; i < arrayLength; i++) {
    positionsArray[i] = Math.random() - 0.5;
  }

  const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
  geometry.setAttribute('position', positionAttribute);

  const material = new THREE.MeshBasicMaterial({
    color: '#4682B4',
    wireframe: true
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // камера
  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 1,5;
  camera.lookAt(mesh.position);

  scene.add(camera);

  // контроллер
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // отрисовщик
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

  // перерендеринг при ресайзе
  window.addEventListener('resize', () => {
    updateOnResize(size, camera, renderer, scene);
  });
};
