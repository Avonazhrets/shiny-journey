function getAreaArray(xMin, xMax, level, levelDelta) {
  return [
    { x: xMin, y: level - levelDelta },
    { x: xMax, y: level - levelDelta },
    { x: xMax, y: level + levelDelta },
    { x: xMin, y: level + levelDelta },
  ]
}

function setCamera(plotter, xMin, xMax, yMin, yMax) {
  plotter.plot.y.domain([yMin, yMax])
  plotter.plot.x.domain([xMin, xMax])
  plotter.draw()
}

function main() {
  document.getElementById('check2').onclick = function() {
    document.getElementById('check3').disabled = this.checked
  }
  document.getElementById('check3').onclick = function() {
    document.getElementById('check2').disabled = this.checked
  }
  var textSeq = ''
  var controls = d3
    .select(document.body)
    .append('div')
    .style('display', 'inline-block')
    .style('position', 'absolute')
    .style('top', '-10px')
    .style('left', '500px')

  controls
    .append('div')
    .style('height', '50px')
    .style('width', '300px')
    .style('display', 'inline-block')
    .append('p')
    .html(textSeq)
  controls
    .append('div')
    .style('display', 'inline-block')
    .attr('id', 'controls')

  var currentfunc
  var intervalColorMap = ['#00003A', 5, 2, 4, 8, 10]
  var lineColorMap = ['#858585', 0, 2, 4, 6]
  var pointColorMap = ['#000050', 1, 3, 5, 7]
  function ident(y) {
    return y
  }
  function benchMark(T) {
    d3.select('#controls')
      .selectAll('p')
      .data(['Время построения', new Date() - T + 'ms'])
      .html(function(d) {
        return d
      })
      .enter()
      .append('p')
      .html(function(d) {
        return d
      })
  }
  function exp(y) {
    return Math.exp(y)
  }
  var eps = Math.pow(10, -9)
  function log(y) {
    //return Math.log(Math.max(1, y));
    return Math.pow(y, 0.3)
  }
  function draw(
    Left,
    Right,
    Top,
    Bottom,
    joint,
    velocity,
    _step,
    { pointsize, after, pointReached, pointsOfInterest, noScatter },
  ) {
    var timestart = new Date()
    var scatter
    if (document.querySelector('#layer') !== null) {
      document
        .querySelector('#layer')
        .parentNode.removeChild(document.querySelector('#layer'))
    }
    var animationFlag = document.getElementById('check1').checked
    var logFlag = document.getElementById('check2').checked
    var intFlag = document.getElementById('check3').checked
    var c = new PlotContainer('plot')
    var controls = new app.Controls(c.addEmptyDiv())
    var x = ident
    var currh = $(document).height() * 0.7
    var currw = $(document).width() * 0.96
    // var currh = 400
    // var currw = 600
    if (logFlag) {
      x = log
      currh = $(document).height() * 0.7
      currw = $(document).width() * 0.96
      // currh = 400
      // currw = 600
      Right *= 10
    }
    if (intFlag && !logFlag) {
      Right *= 10
      //Right = Math.max(Right, 50000);
      var plotter = c.addPlot({
        left: Bottom,
        right: Top,
        top: 1.5,
        bottom: -1.5,
        height: currh,
        width: currw,
        zoom: false,
      })
      scatter = new Scatter(plotter)
      if (animationFlag) {
        var tmp = 1
        var time = getDrawingTime()
        var step = Math.max(Right / velocity, 1)
        var maxstep = Math.max(Math.floor(Right / step), 1)
        var interval = setInterval(function() {
          ;(function(i) {
            for (var q = step * (i - 1); q < Math.min(Right, step * i); q += _step) {
              for (var id = 0; id < currentfunc.length; ++id) {
                //plotter.addLine(currentfunc[id](q),-0.5,currentfunc[id](q),0.5,{size: 0.1, color:intervalColorMap[id]});
                scatter.addLine(
                  currentfunc[id](q),
                  -0.5,
                  currentfunc[id](q),
                  0.5,
                  { color: intervalColorMap[id] },
                )
              }
            }
          })(tmp)
          tmp++
          if (tmp >= maxstep) {
            clearInterval(interval)
            //d3.select('#cotrols').append('div').style('position','absolute').style('top','15px').style('left','300px').append('p').html('Время построения: '+ (new Date()-timestart)+'ms');
            // benchMark(timestart)
          }
        }, time)
      } else {
        for (var i = 1; i < Right; ++i) {
          for (var id = 0; id < currentfunc.length; ++id)
            //plotter.addLine(currentfunc[id](i),-0.5,currentfunc[id](i),0.5,{size:  0.1,color: intervalColorMap[id]});
            scatter.addLine(currentfunc[id](i), -0.5, currentfunc[id](i), 0.5, {
              color: intervalColorMap[id],
            })
        }
        //d3.select(document.body).append('div').style('position','absolute').style('top','15px').style('left','300px').append('p').html('Время построения: '+ (new Date()-timestart)+'ms');
        // benchMark(timestart)
      }
    } else {
      var plotter = c.addPlot({
        left: x(Left),
        right: x(Right),
        top: Top,
        bottom: Bottom,
        height: currh,
        width: currw,
        zoom: false,
      })

      if (!noScatter) {
        scatter = new Scatter(plotter)
      } else {
        scatter = plotter
      }
      if (animationFlag) {
        var tmp = 1
        var time = getDrawingTime()
        var step
        step = Math.max(Math.floor(Right / velocity), 1)
        var maxstep = Math.max(Math.floor(Right / step), 1)
        var interval = setInterval(function() {
          ;(function(i) {
            for (
              var q = Math.max(1, step * (i - 1));
              q < Math.min(Right, step * i);
              ++q
            ) {
              if (pointReached && pointsOfInterest && logFlag) {
                if (pointsOfInterest.includes(q)) {
                  pointReached(q, scatter)
                }
              }
              for (var id = 0; id < currentfunc.length; ++id) {
                if (q !== 0) {
                  if (joint) {
                    //plotter.addPoint(x(q), currentfunc[id](q), {size: 0.7, color: pointColorMap[id]});
                    scatter.addPoint(x(q), currentfunc[id](q), {
                      size: pointsize,
                      color: pointColorMap[id],
                    })
                    //plotter.addLine(x(q),currentfunc[id](q),x(q+1),currentfunc[id](q+1),{size: 0.7, color: lineColorMap[id]});
                    scatter.addLine(
                      x(q),
                      currentfunc[id](q),
                      x(q + 1),
                      currentfunc[id](q + 1),
                      { color: lineColorMap[id] },
                    )
                  } else {
                    //plotter.addPoint(x(q), currentfunc[id](q), {size: 0.7, color: pointColorMap[id]});
                    scatter.addPoint(x(q), currentfunc[id](q), {
                      size: pointsize,
                      color: pointColorMap[id],
                    })
                  }
                }
              }
            }
          })(tmp)
          tmp++
          if (tmp > maxstep) {
            clearInterval(interval)
            // benchMark(timestart)
          }
        }, time)
      } else {
        for (var i = 1; i <= Right; ++i) {
          for (var id = 0; id < currentfunc.length; ++id) {
            if (joint) {
              //plotter.addLine(x(i),currentfunc[id](i),x(i+1),currentfunc[id](i+1),{size: 0.7, color: lineColorMap[id]});
              scatter.addLine(
                x(i),
                currentfunc[id](i),
                x(i + 1),
                currentfunc[id](i + 1),
                { color: lineColorMap[id] },
              )
              //plotter.addPoint(x(i),currentfunc[id](i),{size: 0.7, color: pointColorMap[id]});
              scatter.addPoint(x(i), currentfunc[id](i), {
                color: pointColorMap[id],
                size: pointsize,
              })
            } else {
              //plotter.addPoint(x(i),currentfunc[id](i),{size: 0.7, color: pointColorMap[id]});
              scatter.addPoint(x(i), currentfunc[id](i), {
                color: pointColorMap[id],
                size: pointsize,
              })
            }
          }
        }
        // benchMark(timestart)
      }
    }

    if (after) {
      after(plotter, { intFlag })
    }
  }
  var tmpar = new Array(20001)
  var update = {
    SI: function() {
      currentfunc = [Math.sin]
      currentseq = [
        {
          n: 0,
          next: function() {
            return Math.sin(this.n++)
          },
        },
      ]
      draw(1, 5000, 1.1, -1.1, false, 300, 1, {})
    },
    CO: function() {
      currentfunc = [Math.cos]
      draw(1, 5000, 1.1, -1.1, false, 300, 1, {})
    },
    form1: function() {
      currentfunc = [
        function(n) {
          return 1 + 1 / n
        },
      ]

      function after(plotter, { intFlag }) {
        if (intFlag) {
          return
        }

        plotter.addArea(
          [
            { x: 0, y: 0.95 },
            { x: 250, y: 0.95 },
            { x: 250, y: 1.05 },
            { x: 0, y: 1.05 },
          ],
          {
            fillOpacity: 0.5,
          },
        )
      }

      draw(1, 250, 2.1, 0, false, 300, 1, { pointsize: 'tiny', after })
    },
    pi_sin() {
      currentfunc = [
        function(n) {
          return 2 / Math.sqrt(n) - (n / (n + 5)) * Math.sin((Math.PI * n) / 4)
        },
      ]

      draw(-100, 30000, 1.5, -1.5, false, 300, 3, { pointsize: 'tiny' })
    },
    harmonic_animation() {
      currentfunc = [
        function(n) {
          return 1 + 1 / n
        },
      ]

      let currentArea
      let areaOptions = {
        fillOpacity: 0.5,
      }
      function after(plotter, { intFlag }) {
        if (intFlag) {
          return
        }

        currentArea = plotter.addArea(
          getAreaArray(0, 310, 1, 0.05),
          areaOptions,
        )
      }

      let pointsOfInterest = [100, 500, 1000]
      function pointReached(point, plotter) {
        if (point === pointsOfInterest[0]) {
          setCamera(plotter, 2, 7, 0.8, 1.2)
          currentArea.clear()
          currentArea = plotter.addArea(
            getAreaArray(0, 310, 1, 0.02),
            areaOptions,
          )
        } else if (point === pointsOfInterest[1]) {
          setCamera(plotter, 4, 8.5, 0.98, 1.02)
          currentArea.clear()
          currentArea = plotter.addArea(
            getAreaArray(0, 310, 1, 0.002),
            areaOptions,
          )
        } else if (point === pointsOfInterest[2]) {
          setCamera(plotter, 7.5, 11, 0.99, 1.01)
          currentArea.clear()
          currentArea = plotter.addArea(
            getAreaArray(0, 310, 1, 0.00075),
            areaOptions,
          )
        }
      }

      draw(1, 300, 2.1, 0, false, 300, 1, {
        pointsize: 'tiny',
        after,
        pointReached,
        pointsOfInterest,
        noScatter: true,
      })
    },
    harmonic_minus() {
      currentfunc = [
        function(n) {
          return (n % 2 == 1 ? -1 : 1) * (1 + 1 / n)
        },
      ]

      function after(plotter, { intFlag }) {
        if (intFlag) {
          return
        }

        let areaOptions = {
          fillOpacity: 0.5,
        }

        plotter.addArea(getAreaArray(0, 250, 1, 0.05), areaOptions)

        plotter.addArea(getAreaArray(0, 250, -1, 0.05), areaOptions)
      }

      draw(1, 250, 1.6, -1.6, false, 300, 1, { pointsize: 'tiny', after })
    },
    form2: function() {
      currentfunc = [
        function(n) {
          return (n % 2 == 1 ? -1 : 1) * Math.pow(1 + 1 / n, n)
        },
      ]

      function after(plotter, { intFlag }) {
        if (intFlag) {
          return
        }

        let upperLevel = 2.7
        let levelDelta = 0.1
        let downLevel = -2.7
        let xMax = 250
        let xMin = 0

        let options = {
          fillOpacity: 0.5,
        }

        plotter.addArea(
          getAreaArray(xMin, xMax, upperLevel, levelDelta),
          options,
        )
        plotter.addArea(
          getAreaArray(xMin, xMax, downLevel, levelDelta),
          options,
        )
      }

      draw(1, 250, 3.1, -3.1, false, 300, 1, { pointsize: 'tiny', after })
    },
    form3: function() {
      currentfunc = [
        function(n) {
          return Math.pow(1 + 1 / n, n)
        },
        function(n) {
          return tmpar[n]
        },
      ]
      tmpfact = 1
      tmpans = 1
      for (var i = 1; i <= 1000; i++) {
        tmpfact *= i
        tmpans += 1 / tmpfact
        tmpar[i] = tmpans
      }
      draw(0, 100, 3.0, 1.5, true, 500, 1, { pointsize: 'small' })
    },
    seq1: function() {
      currentfunc = [
        function(n) {
          return tmpar[n]
        },
      ]
      var tmp = 1
      for (var b = 2; tmp < 60000; b++)
        for (var a = 1; a < b && tmp < 60000; a++) {
          tmpar[tmp++] = a / b
        }
      draw(0, 6000, 1, 0, false, 100, 1, { pointsize: 'tiny' })
    },
    seq2: function() {
      var j = 2,
        m = 1
      currentfunc = [
        function(n) {
          return tmpar[n]
        },
      ]
      while (m <= 20000) {
        for (var i = 1; i < j && m <= 20000; i++) {
          tmpar[m] = 1 / i
          m++
        }
        j++
      }
      draw(0, 2000, 0.55, 0, false, 500, 1, { pointsize: 'tiny' })
    },
    seq3: function() {
      var j = 2,
        m = 1
      currentfunc = [
        function(n) {
          return tmpar[n]
        },
      ]
      while (m <= 20000) {
        for (var i = 1; i < j && m <= 20000; i++) {
          tmpar[m] = 1 / i - 1 / m
          m++
        }
        j++
      }
      draw(0, 2000, 0.55, 0, false, 500, 1, { pointsize: 'tiny' })
    },
    seq4: function() {
      var k = 1,
        j = 2
      currentfunc = [
        function(n) {
          return tmpar[n]
        },
      ]
      while (k <= 10000) {
        tmpar[k] = 0
        k++
        for (var i = 1; i < j && k <= 20000; i++) {
          tmpar[k] = i
          k++
          tmpar[k] = -i
          k++
        }
        j++
      }
      draw(0, 1000, 32, -32, false, 500, 1, { pointsize: 'tiny' })
    },
    form4: function() {
      currentfunc = [
        function(n) {
          return (2 + (n % 2 == 1 ? -1 : 1)) / n
        },
      ]
      draw(0, 300, 1.6, -0.1, true, 600, 1, { pointsize: 'small' })
    },
    form5: function() {
      currentfunc = [
        function(n) {
          return (1 + (n % 2 == 1 ? -1 : 1)) / n
        },
      ]
      draw(0, 300, 1.6, -0.1, true, 600, 1, { pointsize: 'small' })
    },
    form6: function() {
      currentfunc = [
        function(n) {
          return n % 2 == 1 ? -1 : 1
        },
      ]
      draw(0, 300, 1.1, -1.1, true, 1000, 1, { pointsize: 'small' })
    },
    form7: function() {
      currentfunc = [
        function(n) {
          return Math.pow(0.9, n)
        },
      ]
      draw(0, 100, 1, 0, true, 200, 1, { pointsize: 'small' })
    },
    form8: function() {
      currentfunc = [
        function(n) {
          return (n % 2 == 1 ? -1 : 1) / n
        },
      ]
      draw(0, 100, 1.1, -1.1, true, 200, 1, { pointsize: 'small' })
    },
  }
  function Update() {
    update[selectContainer.getAttribute('value')]()
  }
  var adress = $('.stest')
  for (var j = 0; j < adress.length; ++j) {
    for (var i = 0; i < adress[j].length; ++i) {
      katex.render(adress[j][i].innerHTML, adress[j][i])
    }
  }
  var animationCheckBox = document.getElementById('check1')
  var logCheckBox = document.getElementById('check2')
  var intCheckBox = document.getElementById('check3')
  var button = document.getElementById('drawbutton')
  var customSelect = new eulerface.Select(document.getElementById('secSelect')),
    output = document.getElementById('output'),
    selectContainer = document.getElementById('secSelect')
  button.addEventListener('click', Update)
}

function getDrawingTime() {
  const TIME_SELECTOR = '#drawingTime'
  let time = document.querySelector(TIME_SELECTOR)
  return +time.value
}

main()
