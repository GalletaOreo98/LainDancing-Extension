const imageObjects = [];
let loadedImages = 0;
const images = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
];

let interval = 150;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const isMobile = window.matchMedia('(max-width: 768px)').matches;

canvas.width = 300;
canvas.height = canvas.width;


main();

function main() {
  for (let i = 0; i < images.length; i++) {
    const image = new Image();
    image.src = images[i];
    image.onload = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        let currentImageIndex = images.indexOf('3.png');
        let  intervalId = setInterval(() => {
          let nextImageIndex;
          if (currentImageIndex === 0) {
            nextImageIndex = currentImageIndex + 1;
          } else if (currentImageIndex === images.length - 1) {
            nextImageIndex = currentImageIndex - 1;
          } else {
            const randomIndex = Math.floor(Math.random() * 2);
            nextImageIndex = currentImageIndex + (randomIndex === 0 ? -1 : 1);
          }
          const nextImage = imageObjects[nextImageIndex];
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(nextImage, (canvas.width - image.width) / 2, (canvas.height - image.height) / 2);
          currentImageIndex = nextImageIndex;
        }, interval);

        // Capturar evento del botón y actualizar el intervalo
        const updateSpeedBtn = document.getElementById('update-speed-btn');
        const speedInput = document.getElementById('speed-input');
        updateSpeedBtn.addEventListener('click', () => {
          interval = speedInput.value;
          clearInterval(intervalId);
          intervalId = setInterval(() => {
            let nextImageIndex;
            if (currentImageIndex === 0) {
              nextImageIndex = currentImageIndex + 1;
            } else if (currentImageIndex === images.length - 1) {
              nextImageIndex = currentImageIndex - 1;
            } else {
              const randomIndex = Math.floor(Math.random() * 2);
              nextImageIndex = currentImageIndex + (randomIndex === 0 ? -1 : 1);
            }
            const nextImage = imageObjects[nextImageIndex];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(nextImage, (canvas.width - image.width) / 2, (canvas.height - image.height) / 2);
            currentImageIndex = nextImageIndex;
          }, interval);
        });
      }
    };
    imageObjects.push(image);
  }
}
