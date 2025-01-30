export const updateOnResize = (size, camera, renderer, scene) => {
  size.width = document.documentElement.clientWidth * 0.75;
  size.height = ((document.documentElement.clientWidth * 0.75) / 3) * 2;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
};
