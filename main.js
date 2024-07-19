// стили
import './main.css';

// функции
import { cube } from './src/js/cube';
import { cubeGroup } from './src/js/cubeGroup';
import { cubeControls } from './src/js/cubeControls';
import { wavyImg } from './src/js/wavyImg';

document.addEventListener('DOMContentLoaded', function () {
  cube();
  cubeGroup();
  cubeControls();
  wavyImg();
})