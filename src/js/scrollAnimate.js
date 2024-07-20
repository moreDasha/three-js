import * as THREE from 'three';

export const scrollAnimate = () => {
  if (!document.querySelectorAll('.js-scroll-anim').length) {
    return
  };

  const scene = new THREE.Scene();
  const canvas = document.querySelector('.js-scroll-anim');

  const ambientLight = new THREE.AmbientLight('white', 1);
  scene.add(ambientLight);

  /* const scrollProgress = () => {
    const scrollPosition = document.documentElement.scrollTop;
    const pageHeight = document.documentElement.scrollHeight;
    return (scrollPosition / pageHeight) * 100;
  } */

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshNormalMaterial();
  const cubeMaterialViolet = new THREE.MeshLambertMaterial( {color: '#DFAEFF'});
  const cubeMaterialYellow = new THREE.MeshLambertMaterial( {color: '#FFEB99'});
  const cubeMaterialPink = new THREE.MeshLambertMaterial( {color: '#FFC0E9'});
  const cubeMaterialBlue = new THREE.MeshLambertMaterial( {color: '#A0F0F2'});
  const cube = new THREE.Mesh(
    cubeGeometry, 
    [cubeMaterialViolet, cubeMaterialYellow, cubeMaterialPink, cubeMaterialViolet, cubeMaterialBlue, cubeMaterialYellow]
  );
  cube.position.z = -2;
  //cube.rotation.x = window.scrollY * 0.00001;
  //cube.rotation.y = window.scrollY * 0.00001;
  scene.add(cube);

  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
  const material2 = new THREE.MeshBasicMaterial({
    color: '#FFC0E9',
    wireframe: true
  });
  const sphere = new THREE.Mesh(sphereGeometry, material2);
  sphere.position.z = -5;
  scene.add(sphere);

  const size = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  }
  const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
  scene.add(camera);

  const render = new THREE.WebGLRenderer({ canvas });
  render.setSize(size.width, size.height);
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  render.render(scene, camera);

  const sphereAnimate = () => {
    sphere.rotation.y += 0.003;
    sphere.rotation.x += 0.002;
    sphere.rotation.z += 0.002;
    render.render(scene, camera);
    window.requestAnimationFrame(sphereAnimate);
  }
  sphereAnimate();

  let prevScrollPosition = 0;
  const animateOnScroll = () => {
    const currentScrollPosition = scrollProgress();
    console.log(currentScrollPosition)

    if (currentScrollPosition >= prevScrollPosition) {
      cube.rotation.y += scrollProgress() * 0.001;
      cube.rotation.x += scrollProgress() * 0.001;
      //camera.position.z -= 0.01;
    } else {
      cube.rotation.y -= scrollProgress() * 0.001;
      cube.rotation.x -= scrollProgress() * 0.001;
      //camera.position.z -= 0.01;
    }

    prevScrollPosition = currentScrollPosition;
  }

  window.addEventListener('scroll', animateOnScroll);
  
    // перерендеринг при ресайзе
    /* window.addEventListener('resize', () => {
      size.width = document.documentElement.clientWidth * 0.75;
      size.height = document.documentElement.clientWidth * 0.75 / 3 * 2
  
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
  
      renderer.setSize(size.width, size.height);
      renderer.render(scene, camera);
    }); */
}