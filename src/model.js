'use strict';

/**
 * @abstract
 * @class Phalanx.Model
 * @extends Backbone.Model
 * @mixins Phalanx.Trait.LifecycleCallbacks
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

Model.with(Trait.LifecycleCallbacks);

_.extend(Model.prototype, Backbone.Model.prototype, {

  /**
   * destroy
   */
  destroy: function() {
    Backbone.Model.prototype.destroy.apply(this, arguments);
    this.onDestroy();
  }
});
