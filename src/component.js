/**
 * @abstract
 * @class
 */
var Component = defineClass({
  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    options || (options = {});

    this.initialize.apply(this, arguments);
  },

  /**
   * @abstract
   */
  initialize: function() {}
});
