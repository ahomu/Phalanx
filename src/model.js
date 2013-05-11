'use strict';

/**
 * @abstract
 * @class Phalanx.Model
 */
var Model = defineClass({
  /**
   * @constructor
   * @param {Object} attributes
   * @param {Object} options
   */
  constructor: function(attributes, options) {
    options || (options = {});

    this.onCreate.apply(this, arguments);

    Backbone.Model.apply(this, arguments);
  }
});

_.extend(Model.prototype, Backbone.Model.prototype, {
  /**
   * @abstract
   */
  initialize: function() {},

  /**
   * @abstract
   */
  onCreate: function() {},

  /**
   * @abstract
   */
  onDestroy: function() {}
});
