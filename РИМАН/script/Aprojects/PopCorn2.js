var c = new PlotContainer('riemannGraph');

var controls = new app.Controls(c.addEmptyDiv());

var plotter = c.addPlot({left: 0, right: 1, top: 0.5, bottom: 0, width:$(document).width()*0.85, height:$(document).height()*0.85, zoom: false});

function decrease_range() {
    if (cur_range_val > 5) {
        cur_range_val -= 1;
        changeEpsilon(cur_range_val);
    }
    document.getElementById("rangeInput").value = cur_range_val;
}

function increase_range() {
    if (cur_range_val < 100) {
        cur_range_val += 1;
        changeEpsilon(cur_range_val);
    }
    document.getElementById("rangeInput").value = cur_range_val;
}

function changeEpsilon(value) {
    if (!removed) {
        plotter.remove(eps_line);
    }
    var y_line = value * curr_scale_y / 100.0;
    var x_line = curr_scale_x;
    eps_line = plotter.addLine(0, y_line, curr_scale_x, y_line);
    removed = 0;
    if (coloredPoints == 0 || allPoints_y[coloredPoints - 1] >= y_line) {
        for (var i = coloredPoints; i < allPoints_num; ++i) {
            if (allPoints_y[i] < y_line) {
                break;
            }
            plotter.remove(allPoints[i]);
            var curr_point = plotter.addPoint(allPoints_x[i], allPoints_y[i], {size: allPoints_sizes[i]});
            allPoints[i] = curr_point;
            coloredPoints++;
        }
    } else {
        for (var i = coloredPoints - 1; i >= 0; --i) {
            if (allPoints_y[i] >= y_line) {
                break;
            }
            plotter.remove(allPoints[i]);
            var curr_point = plotter.addPoint(allPoints_x[i], allPoints_y[i], {size: allPoints_sizes[i], color: 20});
            allPoints[i] = curr_point;
            coloredPoints--;
        }
    }
    cur_range_val = value;
}

var cur_range_val = 100;
var eps_line;
var draw_flag = 0;
var drawButton;
var zoomButton;
var zoomcounter = 0;
var STANDART_ITERATIONS = 350;
var iterationlabel = 350;
var PSIZE_MAX = 2.8;
var pointmaxlabel = 2.8;
var PSIZE_MIN = 2.1;
var pointminlabel = 2.1;
var zoomX = 0.25;
var zoomY = 0.5;
var curr_scale_x = 1;
var curr_scale_y = 0.5;
var removed = 0;
var allPoints = [];
var allPoints_sizes = []
var allPoints_y = []
var allPoints_x = []
var coloredPoints = 0;
var allPoints_num = 0;
var allPoints_max = 0;

function draw_popcorn()
{
    STANDART_ITERATIONS = iterationlabel;
    PSIZE_MAX = pointmaxlabel;
    PSIZE_MIN = pointminlabel;
    draw_flag++;
    var curr_flag = draw_flag;
    plotter.removeAll();

    coloredPoints = 0;
    removed = 1;
    cur_range_val = 100;
    allPoints_num = 0;

    var startY = parseInt(1/curr_scale_y);
    var iterationsY=Math.pow(1/zoomY,zoomcounter)*STANDART_ITERATIONS+startY;
    var startX = 1;
    var iterationsX = curr_scale_x;
    var tmp = 1
    var time = 1
    var interval;
    var P_size = PSIZE_MAX;
    var curr_point;
    tmp = startY;

    document.getElementById("rangeInput").value = 50;

    var x = 0;
    var size_point = 0;
    var y = 0;
    interval = setInterval(function() {
    (function(i) {
        if(P_size > PSIZE_MIN)
        {
            P_size-=PSIZE_MAX/(iterationsY-startY);
        }
            step = 1;
            for(var j = startX; j/i < iterationsX * 3; j += step)
                if(RiemanTableX[i][j] > 0 && draw_flag == curr_flag)
                {
                    x = RiemanTableX[i][j];
                    y = RiemanTableY[i][j];
                    curr_point = plotter.addPoint(x, y, {size: P_size, color: 20});
                    size_point = point_size_calc(PSIZE_MAX, 1.3, y, curr_scale_y)
                    curr_point.setSize(size_point);

                    if (allPoints_num < allPoints_max) {
                        allPoints[allPoints_num] = curr_point;
                        allPoints_sizes[allPoints_num] = size_point;
                        allPoints_x[allPoints_num] = x;
                        allPoints_y[allPoints_num] = y;
                    } else {
                        allPoints.push(curr_point);
                        allPoints_sizes.push(size_point)
                        allPoints_x.push(x);
                        allPoints_y.push(y);
                        allPoints_max++;
                    }
                    allPoints_num++;
                }
            if (allPoints_num > 10 && allPoints_num < 100) {
                changeEpsilon(50);
            }
        })(tmp);
        tmp++;
        if(tmp >= iterationsY || draw_flag != curr_flag)
            clearInterval(interval);
    },time);
}

function point_size_calc(max_size, min_size, y, max_y)
{
    return max_size * y / max_y + min_size;
}

function inc_scale()
{
    zoomcounter++;
    curr_scale_y *= zoomY;
    curr_scale_x *= zoomX;
    plotter.plot.y.domain([plotter.plot.pure.bottom,curr_scale_y]);
    plotter.plot.x.domain([plotter.plot.pure.left, curr_scale_x]);
    draw_popcorn();
    plotter.draw();
}
function dec_scale()
{
    zoomcounter--;
    curr_scale_y /= zoomY;
    curr_scale_x /= zoomX;
    plotter.plot.y.domain([plotter.plot.pure.bottom,curr_scale_y]);
    plotter.plot.x.domain([plotter.plot.pure.left, curr_scale_x]);
    draw_popcorn();
    plotter.draw();
}

animationCheckBox.addEventListener('change', draw_popcorn);