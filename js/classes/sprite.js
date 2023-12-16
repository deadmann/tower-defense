class Sprite {
    constructor({position = {x: 0, y: 0}, imageSrc, frames = {max: 1}}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            hold: 3
        }
    }

    draw() {
        const cropWidth = this.image.width / this.frames.max
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: cropWidth,
            height: this.image.height
        }
        c.drawImage(
            this.image,
            // crop
            // crop position
            crop.position.x,
            crop.position.y,
            // crop width/height
            crop.width,
            crop.height,
            // transform
            // position
            this.position.x,
            this.position.y,
            // width/height after crop (scale)
            crop.width,
            crop.height
        )

        if (this.frames.elapsed % this.frames.hold === 0) {
            this.frames.current++
            if (this.frames.current >= this.frames.max - 1) {
                this.frames.current = 0
            }
        }
        this.frames.elapsed++
    }
}