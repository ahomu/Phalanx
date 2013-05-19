'use strict';

/**
 * @abstract
 * @class Phalanx.Router
 * @extends Backbone.Router
 * @mixins Phalanx.Trait.LifecycleCallbacks
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

Router.with(Trait.LifecycleCallbacks);

_.extend(Router.prototype, Backbone.Router.prototype, {
  /**
   * destroy
   */
  destroy: function() {
    this.onDestroy();
  }
});
