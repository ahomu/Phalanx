'use strict';

var INCREMENT_COMPONENT_UID = 0;

/**
 * @abstract
 * @class Phalanx.Component
 * @mixins Phalanax.Trait.MappingUI
 * @mixins Bakcbone.Events
 */
var Component = defineClass({
  /**
   * @property {HTMLElement}
   */
  el: null,

  /**
   * @property {jQuery|Zepto}
   */
  $el: null,

  /**
   *     events: {
   *       'click .js_event_selector': 'someMethod'
   *     }
   *     // $('.js_event_selector').click() => someMethod()
   *
   * @property {Object}
   */
  events: {},

  /**
   * instance's unique id nubmer
   * @property {Number}
   */
  uid: null,

  /**
   * @constructor
   * @param {HTMLElement} el
   */
  constructor: function(el) {
    this.setElement(el);
    this.uid = INCREMENT_COMPONENT_UID++;

    this.lookupUi();

    this.onCreate.apply(this, arguments);

    this.initialize.apply(this, arguments);
  },

  /**
   * @param {HTMLElement} element
   */
  setElement: function(element) {
    this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
    this.el = this.$el[0];
  },

  /**
   * Destory this component
   */
  destroy: function() {
    this.el = this.$el = null;

    this.releaseUi();

    this.onDestroy();
  },

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

}).with(Backbone.Events).with(Trait.MappingUI);
