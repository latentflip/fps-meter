var el = document.createElement('div');
document.querySelector('body').appendChild(el);

var els = document.createElement('div');
document.querySelector('body').appendChild(els);

var meter = require('./fps-meter');

meter(function (fps) {
    el.innerText = fps.instant;
    els.innerText = fps.smoothed;
});

