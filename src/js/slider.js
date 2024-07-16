export const slider = () => {
  if (!document.querySelectorAll('.js-canvas-slider').length) {
    return
  }

  const slider = document.querySelector('.js-slider');

  const canvas = slider.querySelector('.js-canvas-slider');
  const context = canvas.getContext('2d');

  const img = new Image();
  img.src = 'img/slider_01.jpg';

  const scale = Math.min(window.devicePixelRatio, 2);
  const size = {
    width: slider.offsetWidth,
    height: slider.offsetHeight
  };
  canvas.width = size.width * scale;
  canvas.height = size.height * scale;
  context.scale(scale, scale);

  let speed = 1;

  const animate = () => {
    speed += 0.05;
    context.drawImage(img, 0, Math.sin(speed) * 10, size.width, size.height);
    window.requestAnimationFrame(animate)
  }

  img.addEventListener('load', animate);

  window.addEventListener('resize', () => {
    size.width = slider.offsetWidth;
    size.height = slider.offsetHeight;
    canvas.width = size.width * scale;
    canvas.height = size.height * scale;
    context.scale(scale, scale);
  });
}