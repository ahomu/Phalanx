/**
 * @abstract
 * @class
 */
var Layout = defineClass({
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
