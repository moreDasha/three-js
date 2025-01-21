// стили
import './main.css';

// функции
import { cube } from './src/js/cube';
import { cubeGroup } from './src/js/cubeGroup';
import { cubeOrbitControls } from './src/js/cubeOrbitControls';
import { cubeCustomControls } from './src/js/cubeCustomControls';
import { wavyImg } from './src/js/wavyImg';
import { scrollAnimate } from './src/js/scrollAnimate';

document.addEventListener('DOMContentLoaded', function () {
  cube();
  cubeGroup();
  cubeOrbitControls();
  cubeCustomControls();
  wavyImg();
  scrollAnimate();
})