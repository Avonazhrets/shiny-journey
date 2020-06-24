var c = new PlotContainer('plot');


var controls = new app.Controls(c.addEmptyDiv());


var plotter = c.addPlot({left: 0, right: 1, top: 1, bottom: 0, width:$(document).width()*0.53, height:$(document).height()*0.9, zoom: false});

var draw_flag = 0;
var iters = 10;
const max_power = 15;
var dots = [];
var diag;
var max_slow = 6;
var diag_i;
var dots_i;
var square_lines = [];
var areas = [];
var flag = 0;
var timers = [];
var tmp_arr = [];

function draw_curve() {
    draw_flag++;
    var curr_flag = draw_flag;
    plotter.removeAll();
    var l = timers.length;
    for (var i = 0; i < l; ++i) {
        clearInterval(timers[i]);
    }

    dots = [];
    square_lines = [];
    areas = [];
    timers = [];
    tmp_arr = [];

    tmp_arr.push(0);
    cnt = 1;
    timeout = 400;
    diag_i = 0;
    dots_i = 0;
    flag = 0;
    plotter.addLine(0, 0, 1, 1, {size: 1, color: "#000000"});
    timers.push(setInterval(function()
        { interval(curr_flag, 6, 0, 0, 0); }, 400));
    tmp_arr.push(6)
    timers.push(setInterval(function()
        { interval(curr_flag, 30, 1, 1, 1); }, 300));
    tmp_arr.push(30);
    timers.push(setInterval(function()
        { interval(curr_flag, 126, 2, 2, 2); }, 100));
    tmp_arr.push(126);
    timers.push(setInterval(function()
        { interval(curr_flag, 510, 3, 3, 3); }, 10));
    tmp_arr.push(510);
    timers.push(setInterval(function()
        { interval(curr_flag, 2046, 4, 4, 4); }, 1));
    tmp_arr.push(341);
    timers.push(setInterval(function ()
        { interval_last(curr_flag, 5, 10, 5, 5, 1365)}, 10));

    tmp_arr.push(1365);
    timers.push(setInterval(function ()
        { interval_last(curr_flag, 6, 100, 6, 6, 5461)}, 10));

    tmp_arr.push(5461);
    timers.push(setInterval(function ()
        { interval_last(curr_flag, 7, 500, 7, 7, DiagsSz)}, 1));
}

function interval_last(curr_flag, timers_ind, step, tmp_arr_i, check_flag, stop) {
    if (curr_flag != draw_flag) {
        flag = check_flag + 1;
        clearInterval(timers[timers_ind]);
        return;
    }
    if (flag == check_flag) {
        if (curr_flag != draw_flag || tmp_arr[tmp_arr_i] >= stop) {
            flag = check_flag + 1;
            clearInterval(timers[timers_ind]);
            return;
        }
        for (var i = tmp_arr[tmp_arr_i]; i < Math.min(tmp_arr[tmp_arr_i] + step, stop); ++i) {
            plotter.addPoint(Dots[i * 2][0], Dots[i * 2][1], {size: 1, color: "#000000"});
            plotter.addPoint(Dots[i * 2][1], Dots[i * 2][0], {size: 1, color: "#000000"});

            plotter.addPoint(Dots[i * 2][0], Dots[i * 2][0], {size: 0.1, color: "#ffffff"});
            plotter.addPoint(Dots[i * 2][1], Dots[i * 2][1], {size: 0.1, color: "#ffffff"});
        }
        tmp_arr[tmp_arr_i] += step;
    }
}

function interval(curr_flag, stop, timers_ind, check_flag, tmp_arr_i) {
    if (curr_flag != draw_flag) {
        flag = check_flag + 1;
        var l = areas.length;
        for (var i = 0; i < l; ++i) {
            areas[i].clear();
        }
        clearInterval(timers[timers_ind]);
        return;
    }
    if (flag == check_flag) {
        if (curr_flag != draw_flag || tmp_arr[tmp_arr_i] >= stop) {
            flag = check_flag + 1;
            var l = areas.length;
            for (var i = 0; i < l; ++i) {
                areas[i].clear();
            }
            clearInterval(timers[timers_ind]);
            return;
        }
        if (tmp_arr[tmp_arr_i] % 6 == 0) {
            // diag = plotter.addLine(Diags[diag_i][0], Diags[diag_i][1],
            //     Diags[diag_i][2], Diags[diag_i][3], {size: 0.1, color: '#3d91ff'});
            square_lines.push(plotter.addLine(Diags[diag_i][0], Diags[diag_i][1],
                Diags[diag_i][0], Diags[diag_i][3], {size: 0.1, color: '#00FF00'}));
            square_lines.push(plotter.addLine(Diags[diag_i][0], Diags[diag_i][1],
                Diags[diag_i][2], Diags[diag_i][1], {size: 0.1, color: '#00FF00'}));
            square_lines.push(plotter.addLine(Diags[diag_i][0], Diags[diag_i][3],
                Diags[diag_i][2], Diags[diag_i][3], {size: 0.1, color: '#00FF00'}));
            square_lines.push(plotter.addLine(Diags[diag_i][2], Diags[diag_i][1],
                Diags[diag_i][2], Diags[diag_i][3], {size: 0.1, color: '#00FF00'}));
        } else if (tmp_arr[tmp_arr_i] % 6 == 1) {
            dots.push(plotter.addPoint(Dots[dots_i][0], Dots[dots_i][1], {
                size: 4,
                color: "#0000FF"
            }));
        } else if (tmp_arr[tmp_arr_i] % 6 == 2) {
            dots.push(plotter.addPoint(Dots[dots_i][1], Dots[dots_i][0], {
                size: 4,
                color: "#0000FF"
            }));
        } else if (tmp_arr[tmp_arr_i] % 6 == 3) {
            dots.push(plotter.addPoint(Dots[dots_i][0], Dots[dots_i][0], {size: 4, color: "#FF0000"}));
        } else if (tmp_arr[tmp_arr_i] % 6 == 4) {
            dots.push(plotter.addPoint(Dots[dots_i][1], Dots[dots_i][1], {size: 4, color: "#FF0000"}));
        } else {
            // diag.clear();
            dots[0].clear();
            dots[1].clear();
            dots[2].clear();
            dots[3].clear();
            dots = [];
            plotter.addPoint(Dots[dots_i][0], Dots[dots_i][1], {size: 1.5, color: "#000000"});
            plotter.addPoint(Dots[dots_i][1], Dots[dots_i][0], {size: 1.5, color: "#000000"});
            plotter.addPoint(Dots[dots_i][0], Dots[dots_i][0], {size: 1, color: "#ffffff"});
            plotter.addPoint(Dots[dots_i][1], Dots[dots_i][1], {size: 1, color: "#ffffff"});
            dots_i += 2;

            square_lines[0].clear();
            square_lines[1].clear();
            square_lines[2].clear();
            square_lines[3].clear();
            square_lines = [];

            var arr = [];
            arr.push({
                x: Diags[diag_i][0],
                y: Diags[diag_i][1]
            });
            arr.push({
                x: Diags[diag_i][0],
                y: Diags[diag_i][3]
            });
            arr.push({
                x: Diags[diag_i][2],
                y: Diags[diag_i][3]
            });
            arr.push({
                x: Diags[diag_i][2],
                y: Diags[diag_i][1]
            });
            areas.push(plotter.addArea(arr));
            diag_i++;
        }
        tmp_arr[tmp_arr_i] += cnt;
    }
}

// var tmp = 0;
var cnt = 600;
var timeout = 10;