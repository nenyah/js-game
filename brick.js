/*
 * @Author: steven
 * @Date:   2017-08-23 11:06:16
 * @Last Modified by:   steve
 * @Last Modified time: 2017-08-23 13:21:25
 */
//砖
var Brick = function(position) {
    // position 格式是 [0, 0] 格式
    var image = imageFromPath('brick.png')
    var p = position
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        alive: true,
        lives: p[2] || 1,
    }
    o.kill = function() {
        o.lives--
        if (o.lives < 1) {
            o.alive = false
        }
    }
    o.collide = function(ball) {
        return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
    }
    return o
}