'use strict';

/**
 * @class Phalanx
 */
var Phalanx = {

  defineClass: defineClass,

  Router     : Router,
  Model      : Model,
  Collection : Collection,

  View       : View,
  Layout     : Layout,
  Component  : Component,
  Trait      : Trait
};

// for RequireJS
if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  window.define(function() {
    return Phalanx;
  });
}
// for Node.js & browserify
else if (typeof module === 'object' && module &&
  typeof exports === 'object' && exports &&
  module.exports === exports
  ) {
  module.exports = Phalanx;
}
// for Browser
else {
  window.Phalanx = Phalanx;
}
