'use strict';

/**
 * @abstract
 * @class Phalanx.Collection
 * @extends Backbone.Collection
 * @mixins Phalanx.Trait.LifecycleCallbacks
 */
var Collection = defineClass({
  /**
   * @constructor
   * @param {Object} attributes
   * @param {Object} options
   */
  constructor: function(attributes, options) {
    options || (options = {});

    this.onCreate.apply(this, arguments);

    Backbone.Collection.apply(this, arguments);
  }
});

Collection.with(Trait.LifecycleCallbacks);

_.extend(Collection.prototype, Backbone.Collection.prototype, {

  /**
   * destroy
   */
  destroy: function() {
    this.reset();
    this.onDestroy();
  }
});