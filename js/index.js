const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height)

const placementTilesData2D = []
for (let i = 0; i < placementTilesData.length; i+=20) {
    placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}



/**
 *
 * @type {PlacementTile[]}
 */
const placementTiles = []

placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 14) {
            // add building placement tile here
            placementTiles.push(new PlacementTile({
                position: {
                    x: x * 64,
                    y: y * 64
                }
            }))
        }
    })
})
console.log(placementTiles)

const image = new Image()
image.onload = () => {
    // ensure draw is called after image load
    animate()
}
image.src = 'img/game-map.png' // image load perform pretty quick, so c.drawImage, if called after this, draw nothing



const enemies = []
// first item overlap with second due to center offset calculation, so we start at 1
for (let i = 1; i<= 10; i++) {
    const xOffset = i * 150
    enemies.push(
        new Enemy({
            position: {
                x: waypoints[0].x - xOffset,
                y: waypoints[0].y
            }
        })
    )
}

const buildings = []
let activeTile = undefined

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    c.drawImage(image, 0, 0)
    enemies.forEach(enemy => {
        enemy.update()
    })

    placementTiles.forEach(tile => {
        tile.update(mouse)
    })

    buildings.forEach((building) => {
        building.draw()
    })
}

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', event => {
    if (activeTile && !activeTile.isOccupied) {
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }))
        activeTile.isOccupied = true
    }
})

window.addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY

    activeTile = null
    for (const tile of placementTiles) {
        if (mouse.x > tile.position.x
            && mouse.x < tile.position.x + tile.size
            && mouse.y > tile.position.y
            && mouse.y < tile.position.y + tile.size) {
            activeTile = tile
            break
        }
    }
})