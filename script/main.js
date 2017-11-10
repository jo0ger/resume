/**
 * @desc 
 * @author Jooger <zzy1198258955@163.com>
 * @date 10 Nov 2017
 */

'use strict'


var showResumeContentOnLoad = function () {
  window.theDoms = document.body.getElementsByClassName('lazy-display-animation');
  window.theDelay = 50
  for (var i = 0; i < window.theDoms.length; i++) {
    setTimeout((function(ii){
      var _fu = function () {
        window.theDoms[ii].classList.add('played')
      }
      return _fu
    })(i), window.theDelay*i+100)
  }
  var anchors = document.body.getElementsByTagName('a')
  for (var i = anchors.length - 1; i >= 0; i--) {
    anchors[i].target = '_blank'
  }
  var asyncImages = document.body.querySelectorAll('img[data-async-src]')
  for (var i = asyncImages.length - 1; i >= 0; i--) {
    asyncImages[i].src = asyncImages[i].getAttribute('data-async-src')
  }
}

window.addEventListener('load', showResumeContentOnLoad, false)
