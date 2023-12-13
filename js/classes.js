class PlacementTile {
    constructor({position = {x:0, y:0}}) {
        this.position = position
        this.size = 64
        this.color = 'rgba(255, 255, 255, .15)'
        this.isOccupied = false
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update(mouse) {
        this.draw()

        if (mouse.x > this.position.x && mouse.x < this.position.x + this.size
            && mouse.y > this.position.y && mouse.y < this.position.y + this.size) {
            this.color = 'white'
        } else {
            this.color = 'rgba(255, 255, 255, .15)'
        }
    }
}

class Enemy {
    constructor({position = {x: 0, y: 0}}) {
        this.position = {
            x: position.x,
            y: position.y
        }
        this.width = 100
        this.height = 100
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.center.y
        const xDistance = waypoint.x - this.center.x
        // yDistance should be used first, that's how the equation work
        // value get stored as radiance, not degree
        const angle = Math.atan2(yDistance, xDistance) // Video 1:10 ~ 1:12
        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        if (Math.round(this.center.x) === Math.round(waypoint.x)
            && Math.round(this.center.y) === Math.round(waypoint.y)
            && this.waypointIndex < waypoints.length) {
            this.waypointIndex++
        }
    }
}

class Building {
    constructor({position = {x: 0, y: 0}}) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width * 2,
            this.height
        )
    }

    update() {
        this.draw()
    }
}