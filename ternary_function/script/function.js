var c = new PlotContainer('plot');

var animationFlag = document.getElementById("check1").checked;

var animationCheckBox = document.getElementById('check1');

var controls = new app.Controls(c.addEmptyDiv());


var plotter = c.addPlot({left: 0, right: 1, top: 1.1, bottom: 0.053, width:$(document).width()*0.95, height:$(document).height()*0.8, zoom: false});

var draw_flag = 0;
var iters = 10;
const max_power = 15;
var dots = new Set();

function draw_curve() {
    animationFlag = document.getElementById("check1").checked;
    draw_flag++;
    var curr_flag = draw_flag;
    plotter.removeAll();

    if(!animationFlag)
    {
        for (var i = 0; i < Sz; ++i) {
            plotter.addPoint(Dots[i][0], Dots[i][1], {size: 0.8, color: 6});
            if (curr_flag != draw_flag) {
                break;
            }
        }
        for (var n = 5; n < 210; ++n) {
            plotter.addLine(0, 1.0 / n, 1, 1.0 / n, {size: 1, color: 6});
            if (curr_flag != draw_flag) {
                break;
            }
        }
        return 0;
    } else {
        tmp = 0;
        n = 6;
        kek = 1;
        done = 0;
        move = 0;
        var timer = setInterval(function()
        {
            if (tmp < Sz) {
                for (var i = tmp; i < Math.min(tmp + cnt, Sz); ++i) {
                    plotter.addPoint(Dots[i][0], Dots[i][1], {size: 0.8, color: 6});
                    if (curr_flag != draw_flag) {
                        clearInterval(timer);
                    }
                }
                tmp += cnt;
            } else if (n < max_n) {
                for (var i = 0; i < 6; i++) {
                    plotter.addLine(0, 1.0 / n - move, 1, 1.0 / n - move, {size: 1, color: 6});
                    done++;
                    n += kek;
                    if (done > 8) {
                        move += 0.001;
                    }
                    if (curr_flag != draw_flag) {
                        clearInterval(timer);
                    }
                }
            } else {
                clearInterval(timer);
            }
        }, 1);
    }
}

var tmp = 0;
var cnt = 800;
var n = 6;
var max_n = 600;
var kek = 1;
var done = 0;
var move = 0;

animationCheckBox.addEventListener('change', draw_curve);