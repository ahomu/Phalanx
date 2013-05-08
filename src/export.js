'use strict'

/**
 * @class
 */
var Phalanx = {

  defineClass: defineClass,

  Model      : Model,
  View       : View,
  Collection : Collection,
  Layout     : Layout,
  Component  : Component
};

// for RequireJS
if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
  window.define(function() {
    return Phalanx;
  });
}
// for Node.js & browserify
else if (typeof module == 'object' && module &&
  typeof exports == 'object' && exports &&
  module.exports == exports
  ) {
  module.exports = Phalanx;
}
// for Browser
else {
  window.Phalanx = Phalanx;
}
