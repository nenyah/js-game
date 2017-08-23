/*
 * @Author: steven
 * @Date:   2017-08-23 11:08:10
 * @Last Modified by:   steve
 * @Last Modified time: 2017-08-23 11:08:36
 */
// 挡板
var Paddle = function() {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 200,
        y: 350,
        speed: 15,
    }
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 600 - o.image.width) {
            x = 600 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x -= o.speed)
    }
    o.moveRight = function() {
        o.move(o.x += o.speed)
    }
    o.collide = function(ball) {
        if (ball.x > o.x && ball.x < o.x + o.image.width && ball.y + ball.image.height > o.y) {
            return true
        }
        return false
    }
    return o
}