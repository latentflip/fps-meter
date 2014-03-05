var raf = require('raf-shim')(window);
raf.requestAnimationFrame = raf.requestAnimationFrame.bind(window);
raf.cancelAnimationFrame = raf.cancelAnimationFrame.bind(window);

var smooth = function (smoothN, cb) {
    var count = 0;
    var total = 0;
    return function (newNumber) {
        total += newNumber / smoothN;
        count++;
        if (count === smoothN) {
            cb(total);
            count = total = 0;
        }
    };
};

module.exports = function (n, cb) {
    if (!cb) {
        cb = n;
        n = 10;
    }
    var lastTime;
    var smoothed, instant;

    var smoother = smooth(n, function (newSmoothed) {
        smoothed = newSmoothed;
    });

    var loop = function (time) {
        if (lastTime) {
            instant = 1000/(time - lastTime);
            smoother(instant);

            cb({ instant: instant, smoothed: smoothed });
        }
        lastTime = time;
        raf.requestAnimationFrame(loop);
    };
    loop();
};
