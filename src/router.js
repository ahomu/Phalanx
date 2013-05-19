'use strict';

/**
 * @abstract
 * @class Phalanx.Router
 */
var Router = defineClass({
  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    options || (options = {});

    this.onCreate.apply(this, arguments);

    Backbone.Router.apply(this, arguments);
  }
});

_.extend(Router.prototype, Backbone.Router.prototype, {
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
