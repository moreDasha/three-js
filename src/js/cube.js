import * as THREE from 'three';

export const cube = () => {
  if (!document.querySelectorAll('.js-cube').length) {
    return
  }

  // сцена
  const scene = new THREE.Scene();
  const canvas = document.querySelector('.js-cube');

  // объект
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const texture = new THREE.TextureLoader().load('img/texture_01.jpg');
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);

  // перемещение
  // mesh.position.x = -1;
  // mesh.position.y = 1;
  // mesh.position.z = -1;
  //mesh.position.set(-1, 1, -1);

  // масштабирование
  // mesh.scale.x = 0.8;
  // mesh.scale.y = 0.7;
  // mesh.scale.z = 0.5;

  // вращение
  mesh.rotation.x = Math.PI * 0.2;
  // mesh.rotation.y = Math.PI * 0.25;
  // mesh.rotation.z = Math.PI * 0.1;

  scene.add(mesh);

  // камера
  const size = {
    width: document.documentElement.clientWidth * 0.75,
    height: document.documentElement.clientWidth * 0.75 / 3 * 2
  };
  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 2;

  scene.add(camera);

  // отрисовщик
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);

  // анимация
  const clock = new THREE.Clock;

  const startTick = () => {
     const elepsedTime = clock.getElapsedTime();
     mesh.rotation.y = elepsedTime;
     renderer.render(scene, camera);
     window.requestAnimationFrame(startTick)
  }

  startTick();

  // перерендеринг при ресайзе
  window.addEventListener('resize', () => {
    size.width = document.documentElement.clientWidth * 0.75;
    size.height = document.documentElement.clientWidth * 0.75 / 3 * 2

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);
  });
}