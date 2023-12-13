const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height)

const image = new Image()
image.onload = () => {
    c.drawImage(image, 0, 0, ) // ensure draw is called after image load
}
image.src = 'img/game-map.png' // image load perform pretty quick, so c.drawImage, if called after this, draw nothing