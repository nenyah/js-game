/*
 * @Author: steven
 * @Date:   2017-08-24 16:16:33
 * @Last Modified by:   steve
 * @Last Modified time: 2017-08-26 10:54:18
 */
var Scene = function(game) {
    var s = {
        game: game,
    }
    var paddle = Paddle()
    var ball = Ball()
    var score = 0
    var bricks = loadlevel(1)
    game.registerActions('a', function() {
        paddle.moveLeft()
    })
    game.registerActions('d', function() {
        paddle.moveRight()
    })
    game.registerActions('f', function() {
        ball.fire()
    })
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y)
        if (ball.hasPoint(x, y)) {
            //设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x,y,'move')
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, 'up')
        enableDrag = false
    })
    s.draw = function() {
        // 画背景
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 600, 400)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < bricks.length; i++) {
            var brick = bricks[i]
            if (brick.alive) {
                game.drawImage(brick)
            }
        }
        // 分数
        game.context.font = "black"
        game.context.fillText("分数: " + score, 10, 390)
    }
    s.update = function() {
        if (paused) {
            return
        }
        ball.move()
        //  判断是否相撞
        if (paddle.collide(ball)) {
            ball.bounce()
        }
        for (var i = 0; i < bricks.length; i++) {
            var brick = bricks[i]
            if (brick.collide(ball)) {
                log('球相撞')
                brick.kill()
                ball.bounce()
            }
        }
    }
    return s
}