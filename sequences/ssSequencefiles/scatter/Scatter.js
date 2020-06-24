;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  else if (typeof define === 'function' && define.amd) define([], factory)
  else if (typeof exports === 'object') exports['scatter'] = factory()
  else root['scatter'] = factory()
})(this, function() {
  return /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function

    /******/ /******/ function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId])
        /******/ return installedModules[moduleId].exports // Create a new module (and put it into the cache)

      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ exports: {},
        /******/ id: moduleId,
        /******/ loaded: false,
        /******/
      }) // Execute the module function

      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__,
      ) // Flag the module as loaded

      /******/ /******/ module.loaded = true // Return the exports of the module

      /******/ /******/ return module.exports
      /******/
    } // expose the modules object (__webpack_modules__)

    /******/ /******/ __webpack_require__.m = modules // expose the module cache

    /******/ /******/ __webpack_require__.c = installedModules // __webpack_public_path__

    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports

    /******/ /******/ return __webpack_require__(0)
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function(module, exports) {
        class Scatter {
          constructor(plot) {
            this.plot = plot
            let svg = document.querySelector(`#${plot.id}`)
            this.svg = svg
            let canvas = document.createElement('canvas')
            canvas.id = 'layer'
            svg.parentNode.appendChild(canvas)
            this.context = canvas.getContext('2d')
            let rect = svg.getBoundingClientRect()
            // canvas.style.top = rect.top + 'px'
            // canvas.style.left = rect.left + 'px';
            // canvas.style.position = 'absolute'
            canvas.style.zIndex = 2
            canvas.width = plot.plot.width
            canvas.height = plot.plot.height
            this.width = canvas.width
            this.height = canvas.height
            this.X = plot.plot.x
            this.Y = plot.plot.y
            this.sizeMap = {
              tiny: 1,
              small: 2,
              medium: 3,
              big: 4,
            }
            this.d3category20 = [
              '#000000', //not a d3 color!
              '#1f77b4',
              '#aec7e8',
              '#ff7f0e',
              '#ffbb78',
              '#2ca02c',
              '#98df8a',
              'd62728',
              '#ff9896',
              '#9467bd',
              '#c5b0d5',
              '#8c564b',
              '#c49c94',
              '#e377c2',
              '#f7b6d2',
              '#7f7f7f',
              '#c7c7c7',
              '#bcbd22',
              '#dbdb8d',
              '#17becf',
              '#9edae5',
            ]
          }
          addPoint(x, y, options) {
            let X = this.X(x)
            let Y = this.Y(y)
            if (typeof options == 'undefined') {
              options = {
                size: 1,
                color: '#000000',
              }
            }
            if (typeof options.color == 'undefined') {
              options.color = '#000000'
            }
            if (typeof options.color == 'number') {
              options.color =
                options.color >= 0 && options.color <= 20
                  ? this.d3category20[options.color]
                  : options.color
            }
            this.context.fillStyle = options.color
            if (typeof options.size != 'undefined') {
              let s =
                typeof this.sizeMap[options.size] == 'undefined'
                  ? 1
                  : this.sizeMap[options.size]
              this.context.beginPath()
              this.context.arc(X, Y, s, 0, 2 * Math.PI, false)
              this.context.fill()
            } else {
              options.size = 1
              this.context.fillRect(X, Y, 1, 1)
            }
          }
          addLine(x1, y1, x2, y2, options) {
            if (typeof options == 'undefined') {
              options = {
                size: 1,
                color: '#000000',
              }
            }
            if (typeof options.color == 'undefined') {
              options.color = '#000000'
            }
            if (typeof options.color == 'number') {
              options.color =
                options.color >= 0 && options.color <= 20
                  ? this.d3category20[options.color]
                  : options.color
            }
            this.context.strokeStyle = options.color
            if (typeof options.size == 'undefined') {
              options.size = 1
            }
            options.size =
              typeof this.sizeMap[options.size] == 'undefined'
                ? 1
                : this.sizeMap[options.size]
            this.context.lineWidth = options.size
            let X1 = this.X(x1)
            let Y1 = this.Y(y1)
            let X2 = this.X(x2)
            let Y2 = this.Y(y2)
            this.context.beginPath()
            this.context.moveTo(X1, Y1)
            this.context.lineTo(X2, Y2)
            this.context.stroke()
          }
          removePixel(x, y, options) {
            let X = this.X(x)
            let Y = this.Y(y)
            this.context.clearRect(X, Y, 1, 1)
          }
          clear() {
            this.context.clearRect(0, 0, this.width, this.height)
          }
          scales() {
            this.X = this.plot.plot.x
            this.Y = this.plot.plot.y
          }
          remove() {
            document
              .querySelector('#layer')
              .parentNode.removeChild(document.querySelector('#layer'))
          }
        }

        window.Scatter = Scatter

        /***/
      },
      /******/
    ],
  )
})
