import * as THREE from 'three';
import { SIZE } from './helper/size';
import { updateOnResize } from './helper/updateOnResize';

export const cubeGroup = () => {

  if (!document.querySelectorAll('.js-cube-group').length) {
    return
  }

  const scene = new THREE.Scene();
  const canvas = document.querySelector('.js-cube-group');

  const size = SIZE

  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  camera.position.z = 3;
  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const group = new THREE.Group();
  const meshes = [];
  let colorStep = 1;

  for (let x = -1.2; x <= 1.2; x = x + 1.2) {
    for (let y = -1.2; y <= 1.2; y = y + 1.2) {
      const material = new THREE.MeshBasicMaterial({
        color: `hsl(${(360 / 9) * colorStep}, 100%, 80%)`,
        wireframe: true
      });
      colorStep++;
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.5, 0.5, 0.5);
      mesh.position.set(x, y, 0);
      meshes.push(mesh);
    }
  }

  group.add(...meshes);
  scene.add(group);

  const render = new THREE.WebGLRenderer({canvas});
  render.setSize(size.width, size.height);
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  render.render(scene, camera);

  const clock = new THREE.Clock();

  const animate = () => {
    const delta  = clock.getDelta();
    const elapsed = clock.getElapsedTime();
    const cornerMeshes = [0, 2, 6, 8];
    const centerMeshes = [1, 3, 4, 5, 7];

    for (let i = 0; i < cornerMeshes.length; i++) {
      meshes[cornerMeshes[i]].rotation.x -= delta * 0.5;
      meshes[cornerMeshes[i]].rotation.y += delta * 0.5;
    }

    for (let i = 0; i < centerMeshes.length; i++) {
      meshes[centerMeshes[i]].rotation.x += delta * 1.2;
      meshes[centerMeshes[i]].rotation.y += delta * 1.2;
    }

    camera.position.x = Math.sin(elapsed) * 1.2;
    camera.position.y = Math.cos(elapsed) * 1.2;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    render.render(scene, camera);
    window.requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    updateOnResize(size, camera, render, scene);
  });
}