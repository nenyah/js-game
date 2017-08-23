/*
 * @Author: steven
 * @Date:   2017-08-23 15:05:34
 * @Last Modified by:   steve
 * @Last Modified time: 2017-08-23 15:12:52
 */
var loadlevel = function(n) {
    n = n - 1
    var bricks = []
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Brick(p)
        bricks.push(b)
    }
    return bricks
}
var bricks = []
var enableDebugMode = function(enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        // log(k)
        if (k == 'p') {
            // 暂停
            paused = !paused
        } else if ('1234567'.includes(k)) {
            // debug加入的关卡
            bricks = loadlevel(Number(k))
        }
    })
    //控制速度
    document.querySelector("#id-input-speed").addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}
var __main = function() {
    enableDebugMode(true)

    var score = 0
    var game = GuaGame(30)

    var paddle = Paddle()
    var ball = Ball()
    bricks = loadlevel(1)


    game.registerActions('a', function() {
        paddle.moveLeft()
    })
    game.registerActions('d', function() {
        paddle.moveRight()
    })
    game.registerActions('f', function() {
        ball.fire()
    })

    // 难点，待查
    game.update = function() {
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
    // 难点，待查
    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < bricks.length; i++) {
            var brick = bricks[i]
            if (brick.alive) {
                game.drawImage(brick)
            }
        }
        game.context.fillText("分数: "+ score, 10, 390)
    }
}

__main()