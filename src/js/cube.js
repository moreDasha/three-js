import * as THREE from 'three';
import { GUI } from 'lil-gui';
import gsap from 'gsap';
import { SIZE } from './helper/size';
import { updateOnResize } from './helper/updateOnResize';

export const cube = () => {
  if (!document.querySelectorAll('.js-cube').length) {
    return;
  }

  // сцена
  const scene = new THREE.Scene();
  const canvas = document.querySelector('.js-cube');

  const size = SIZE;

  // объект
  const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
  const texture = new THREE.TextureLoader().load('img/texture_01.jpg');
  const material = new THREE.MeshBasicMaterial({ map: texture });
  //const material = new THREE.MeshBasicMaterial({color: '#FFB600'});
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

  // дебаг-панель
  const gui = new GUI();

  const parameters = {
    color: '#ffffff',
    animate: () => {
      gsap.to(mesh.rotation, {duration: 1, x: mesh.rotation.x + 10});
    }
  };

  gui.add(mesh, 'visible');
  gui.add(material, 'wireframe');
  gui.add(mesh.position, 'x').min(-3).max(3).step(0.01);
  gui.add(mesh.position, 'y').min(-3).max(3).step(0.01);
  gui.add(mesh.position, 'z').min(-3).max(3).step(0.01);
  gui.addColor(parameters, 'color').onChange(() => {
    material.color.set(colorData.color)
  });
  gui.add(parameters, 'animate')

  // камера

  // const aspectRatio = size.width / size.height;
  // const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);

  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 2;
  camera.lookAt(mesh.position);

  scene.add(camera);

  // отрисовщик
  const renderer = new THREE.WebGLRenderer({ canvas });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);

  // анимация
  const clock = new THREE.Clock();

  const startTick = () => {
    const elepsedTime = clock.getElapsedTime();
    //mesh.position.x = Math.sin(elepsedTime);
    //mesh.position.y = Math.cos(elepsedTime);
    mesh.rotation.y = elepsedTime;
    renderer.render(scene, camera);
    window.requestAnimationFrame(startTick);
  };

  startTick();

  // перерендеринг при ресайзе
  window.addEventListener('resize', () => {
    updateOnResize(size, camera, renderer, scene);
  });

  // переход в полноэкранный режим
  // window.addEventListener('dblclick', () => {
  //  const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement
  //  if (fullScreenElement) {
  //    if (document.exitFullscreen) {
  //      document.exitFullscreen()
  //    } else if (document.webkitExitFullscreen) {
  //      document.webkitExitFullscreen()
  //    }
  //   } else {
  //    if (canvas.requestFullscreen) {
  //      canvas.requestFullscreen()
  //    } else if (canvas.webkitRequestFullscreen) {
  //      canvas.webkitRequestFullscree()
  //    }
  //   }
  // }) 
};
