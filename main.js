/*
 * @Author: steven
 * @Date:   2017-08-23 15:05:34
 * @Last Modified by:   steve
 * @Last Modified time: 2017-08-24 16:29:47
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

    var game = GuaGame(30)
    var scene = Scene(game)


    // 难点，待查
    game.update = function() {
        scene.update()
    }
    // 难点，待查
    game.draw = function() {
        scene.draw()
    }
    enableDebugMode(true)
}

__main()