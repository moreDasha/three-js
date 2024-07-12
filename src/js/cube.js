import * as THREE from 'three';

export const cube = () => {
  // сцена
  const scene = new THREE.Scene();

  // объект
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 'purple', 
    wireframe: true
  });
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
    width: 600,
    height: 600
  }
  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 3;

  scene.add(camera);

  // отрисовщик
  const canvas = document.querySelector('.canvas');
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.setSize(size.width, size.height);
  //renderer.render(scene, camera);

  // анимация
  let time = Date.now();
  const clock = new THREE.Clock;

  const startTick = () => {
     const elepsedTime = clock.getElapsedTime();
     mesh.rotation.y = elepsedTime;
     renderer.render(scene, camera);
     window.requestAnimationFrame(startTick)
  }

  startTick();
}