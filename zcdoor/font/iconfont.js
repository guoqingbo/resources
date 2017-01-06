;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-home" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 42.581333l-469.333333 469.333333 31.146667 31.146667L170.666667 446.250667l0 438.186667 682.666667 0L853.333333 446.208l96.853333 96.896 31.146667-31.146667L512 42.581333zM426.666667 841.770667l0-298.666667 170.666667 0 0 298.666667L426.666667 841.770667zM810.666667 841.770667l-170.666667 0 0-341.333333L384 500.437333l0 341.333333L213.333333 841.770667 213.333333 403.584l298.666667-298.666667 298.666667 298.666667L810.666667 841.770667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-circle" viewBox="0 0 1026 1024">' +
    '' +
    '<path d="M511.905334 0.189286C229.042875 0.189286-2.3e-05 229.23423-2.3e-05 512.094643c0 282.864505 229.042898 511.905357 511.905357 511.905357 282.863482 0 511.905357-229.040852 511.905357-511.905357C1023.810691 229.23423 794.768816 0.189286 511.905334 0.189286z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-more" viewBox="0 0 1235 1024">' +
    '' +
    '<path d="M0 0l1234.805371 0L1234.805371 180.703225 0 180.703225 0 0z"  ></path>' +
    '' +
    '<path d="M0 843.266658l1234.805371 0 0 180.733342L0 1024 0 843.266658z"  ></path>' +
    '' +
    '<path d="M0 421.640858l1234.805371 0 0 180.673108L0 602.313966 0 421.640858z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-login" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M947.229011 653.662417c-15.727193-38.610366-67.258847-72.734558-141.167137-97.567129-54.79293 104.722086-163.223478 177.028902-289.626353 177.028902s-234.836493-72.306816-289.627377-177.028902c-73.90829 24.832572-125.440967 58.95574-141.16816 97.567129-3.925403 7.475252-6.675026 15.699564-6.675026 24.778336l0 218.735793c0 30.170137 24.484647 54.683437 54.683437 54.683437l765.574253 0c30.197766 0 54.683437-24.5133 54.683437-54.683437L953.906084 678.440753C953.906084 669.360957 951.154413 661.136645 947.229011 653.662417zM516.435521 623.756293c120.79618 0 218.73477-97.939613 218.73477-218.735793L735.170291 295.652604c0-120.795157-97.93859-218.73477-218.73477-218.73477s-218.735793 97.939613-218.735793 218.73477l0 109.367897C297.698704 525.81668 395.639341 623.756293 516.435521 623.756293z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-dot" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.310062 181.418886c44.937468 0 88.502683 8.789177 129.48712 26.125007 39.612183 16.754592 75.197656 40.750099 105.768929 71.322395 30.571273 30.571273 54.567803 66.157769 71.322395 105.768929 17.334807 40.984437 26.125007 84.550675 26.125007 129.48712s-8.789177 88.502683-26.125007 129.48712c-16.754592 39.612183-40.750099 75.197656-71.322395 105.768929-30.571273 30.571273-66.157769 54.567803-105.768929 71.322395-40.984437 17.334807-84.550675 26.125007-129.48712 26.125007s-88.502683-8.789177-129.48712-26.125007c-39.612183-16.754592-75.197656-40.750099-105.768929-71.322395-30.571273-30.571273-54.567803-66.157769-71.322395-105.768929-17.334807-40.984437-26.125007-84.550675-26.125007-129.48712s8.789177-88.502683 26.125007-129.48712c16.754592-39.612183 40.750099-75.197656 71.322395-105.768929 30.571273-30.571273 66.157769-54.567803 105.768929-71.322395C423.806355 190.208063 467.372593 181.418886 512.310062 181.418886M512.310062 130.253576c-212.004485 0-383.868761 171.864276-383.868761 383.868761s171.864276 383.868761 383.868761 383.868761 383.868761-171.864276 383.868761-383.868761S724.314547 130.253576 512.310062 130.253576L512.310062 130.253576z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)