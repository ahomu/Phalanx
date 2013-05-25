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
    return Backbone.Model.prototype.sync.apply(this, arguments);
  },

  /**
   * destroy
   */
  destroy: function() {
    Backbone.Model.prototype.destroy.apply(this, arguments);
    this.onDestroy();
  }
});
