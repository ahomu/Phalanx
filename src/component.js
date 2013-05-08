'use strict';

/**
 * @abstract
 * @class
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
   *     ui: {
   *       partOf: '.js_ui_selector'
   *     }
   *     // view.ui.partOf => element.js_ui_selector
   *
   * @property {Object}
   */
  ui: {},

  /**
   * instance's unique id nubmer
   * @property {Number}
   */
  uid: null,

  /**
   * @constructor
   * @param {HTMLElement} el
   * @param {Number} uid
   */
  constructor: function(el, uid) {
    this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
    this.el  = this.$el[0];
    this.uid = uid;

    this.lookupUi();

    this.onCreate.apply(this, arguments);

    this.initialize.apply(this, arguments);
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
   * From the selector defined by this.ui, caching to explore the elements.
   */
  lookupUi: function() {
    var name, selector, thisUi = {};

    for (name in this.ui) {
      selector = this.ui[name];
      thisUi[name] = '$' in window ? this.$el.find(selector)
        : this.el.querySelectorAll(selector);
    }

    this.ui = thisUi;
  },

  /**
   * Release ui elements reference.
   */
  releaseUi: function() {
    var name;

    for (name in this.ui) {
      this.ui[name] = null;
      delete this.ui[name];
    }
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
});
