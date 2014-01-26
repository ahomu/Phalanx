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
   * @param {Array} models
   * @param {Object} options
   */
  constructor: function(models, options) {
    options || (options = {});

    this.onCreate.apply(this, arguments);

    Backbone.Collection.apply(this, arguments);
  }
});

Collection.mixin(Trait.LifecycleCallbacks);

_.extend(Collection.prototype, Backbone.Collection.prototype, {
  /**
   * Default params for using sync method
   *
   *     // if request to xml/html resource
   *     syncParams: {
   *       contentType: 'application/xml',
   *       dataType: 'text'
   *     }
   *
   * @property {Object}
   */
  syncParam: {},

  /**
   * @param {String} method
   * @param {Phalanx.Model} model
   * @param {Object} options
   * @returns {*}
   */
  sync: function(method, model, options) {
    _.extend(options, this.syncParam);
    return Backbone.Collection.prototype.sync.apply(this, arguments);
  },

  /**
   * destroy
   */
  destroy: function() {
    this.reset();
    this.onDestroy();
  }
});