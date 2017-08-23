/*
 * @Author: steven
 * @Date:   2017-08-23 11:07:37
 * @Last Modified by:   steve
 * @Last Modified time: 2017-08-23 11:12:52
 */
// 球
var Ball = function() {
    var image = imageFromPath('ball_16x16.png')
    var o = {
        image: image,
        x: 250,
        y: 334,
        speedX: 10,
        speedY: 10,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x + o.image.width > 600) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + o.image.height > 400) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }

    }
    o.bounce = function() {
        o.speedY *= -1
    }

    return o
}