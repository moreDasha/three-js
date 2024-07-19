export const wavyImg = () => {
  if (!document.querySelectorAll('.js-wavy-img').length) {
    return
  }

  const canvasWrap = document.querySelector('.js-wavy-img-wrap');
  const canvas = canvasWrap.querySelector('.js-wavy-img');
  const context = canvas.getContext('2d');

  const img = new Image();
  img.src = canvasWrap.getAttribute('data-src');

  const size = {
    width: canvasWrap.offsetWidth,
    height: canvasWrap.offsetHeight
  };
  const deviceScale = Math.min(window.devicePixelRatio, 2);
  let speed = 1;
  const partsAmount = 250;
  const partsWidth = img.width / partsAmount;

  const animate = () => {
    speed += 0.1;
    const imgScale = size.width / img.width;

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < partsAmount; i++) {
      context.drawImage(
        img,
      
        i * partsWidth,
        Math.sin(speed - (i / 70) * 12),
        partsWidth,
        img.height,

        i * partsWidth * imgScale,
        0,
        partsWidth * imgScale,
        size.height,
      );
    }

    window.requestAnimationFrame(animate)
  }

  canvas.width = size.width * deviceScale;
  canvas.height = size.height * deviceScale;
  context.scale(deviceScale, deviceScale);

  img.addEventListener('load', animate);

  window.addEventListener('resize', () => {
    size.width = canvasWrap.offsetWidth;
    size.height = canvasWrap.offsetHeight;
    canvas.width = size.width * deviceScale;
    canvas.height = size.height * deviceScale;
    context.scale(deviceScale, deviceScale);
  });
}