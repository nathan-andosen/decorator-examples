
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['decorators-example'] = {}));
}(this, function (exports) { 'use strict';

  var Test = /** @class */ (function () {
      function Test() {
      }
      Test.prototype.log = function () {
          console.log('askdjfh klafd');
      };
      return Test;
  }());
  var test = new Test();
  test.log();

  exports.Test = Test;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
