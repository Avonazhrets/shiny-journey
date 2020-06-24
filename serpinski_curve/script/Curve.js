var c = new PlotContainer('plot');

var animationFlag = document.getElementById("check1").checked;

var animationCheckBox = document.getElementById('check1');

var controls = new app.Controls(c.addEmptyDiv());


var plotter = c.addPlot({left: 0, right: 512, top: 512, bottom: 0, width:$(document).width()*0.5, height:$(document).height()*0.9, zoom: false});

var draw_flag = 0;
var level0 = 1;
var level = 1;
var dist0 = 128;
var dist = 128;
var X = 0;
var Y = 0;
var iters = 10;

function draw_curve() {
    animationFlag = document.getElementById("check1").checked;
    draw_flag++;
    var curr_flag = draw_flag;
    plotter.removeAll();
    level = level0;
    dist = dist0;
    var tmp = 1;
    for (var i = level; i > 0; i--)
        dist /= 2;

    var sz = Sz1;
    var lines = Curve1;
    var cnt = 1;
    var speed = 64;
    if (level == 2) {
        sz = Sz2;
        lines = Curve2;
        cnt = 1;
        speed = 32;
    } else if (level == 3) {
        sz = Sz3;
        lines = Curve3;
        cnt = 1;
        speed = 16;
    } else if (level == 4) {
        sz = Sz4;
        lines = Curve4;
        cnt = 2;
        speed = 8;
    } else if (level == 5) {
        sz = Sz5;
        lines = Curve5;
        cnt = 4;
        speed = 4;
    } else if (level == 6) {
        sz = Sz6;
        lines = Curve6;
        cnt = 16;
        speed = 1;
    } else if (level == 7) {
        sz = Sz7;
        lines = Curve7;
        cnt = 256;
        speed = 1;
    } else if (level == 8) {
        sz = Sz8;
        lines = Curve8;
        cnt = 1024;
        speed = 1;
    }

    if(!animationFlag)
    {
        for (var i = 0; i < sz; ++i) {
            plotter.addLine(lines[i][0], lines[i][1], lines[i][2], lines[i][3]);
            if (curr_flag != draw_flag) {
                break;
            }
        }
        return 0;
    } else {
        tmp = 0;
        var timer = setInterval(function()
        {
            if (tmp >= sz) {
                clearInterval(timer);
            }
            for(var i = tmp; i < Math.min(tmp + cnt, sz); ++i) {
                if (curr_flag != draw_flag) {
                    clearInterval(timer);
                    break;
                }
                plotter.addLine(lines[i][0], lines[i][1], lines[i][2], lines[i][3]);
            }
            tmp += cnt;
        }, speed);
    }
}

function goToXY(x, y) {
    X = x;
    Y = y;
}

function lineRel(deltaX, deltaY) {
    plotter.addLine(X, Y, X + deltaX, Y + deltaY);
    X += deltaX;
    Y += deltaY;
}

function sierpA(level) {
    if (level > 0) {
        sierpA(level - 1);
        lineRel(+dist, +dist);
        sierpB(level - 1);
        lineRel(+2 * dist, 0);
        sierpD(level - 1);
        lineRel(+dist, -dist);
        sierpA(level - 1);
    }
}

function sierpB(level) {
    if (level > 0) {
        sierpB(level - 1);
        lineRel(-dist, +dist);
        sierpC(level - 1);
        lineRel(0, +2 * dist);
        sierpA(level - 1);
        lineRel(+dist, +dist);
        sierpB(level - 1);
    }
}

function sierpC(level) {
    if (level > 0) {
        sierpC(level - 1);
        lineRel(-dist, -dist);
        sierpD(level - 1);
        lineRel(-2 * dist, 0);
        sierpB(level - 1);
        lineRel(-dist, +dist);
        sierpC(level - 1);
    }
}

function sierpD(level) {
    if (level > 0) {
        sierpD(level - 1);
        lineRel(+dist, -dist);
        sierpA(level - 1);
        lineRel(0, -2 * dist);
        sierpC(level - 1);
        lineRel(-dist, -dist);
        sierpD(level - 1);
    }
}

function change_level(new_level) {
    level0 = new_level;
}

function updateTextInput(val) {
    document.getElementById('textInput').value=val; 
}

animationCheckBox.addEventListener('change', draw_curve);