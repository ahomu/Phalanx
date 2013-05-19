'use strict';

var INCREMENT_COMPONENT_UID = 0;

/**
 * @abstract
 * @class  Phalanx.Component
 * @mixins Phalanx.Trait.Observable
 * @mixins Phalanx.Trait.UiLookupable
 * @mixins Phalanx.Trait.LifecycleCallbacks
 */
var Component = defineClass({
  /**
   *     events: {
   *       'click .js_event_selector': 'someMethod'
   *     }
   *     // $('.js_event_selector').click() => someMethod()
   *
   * @property {Object.<String, String|Function>}
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
    this.uid = INCREMENT_COMPONENT_UID++;

    this.onCreate.apply(this, arguments);

    this.setElement(el);

    this.initialize.apply(this, arguments);
  },

  setElement: function(element) {
    this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
    this.el = this.$el[0];
    if (this.el && this.el.parentNode) {
      this.lookupUi(this.el);
      this.onSetElement(this.el);
    }
  },

  /**
   * Destory this component
   */
  destroy: function() {
    this.releaseUi();

    this.onDestroy();

    this.el = this.$el = null;
  },

  /**
   * @abstract
   * @param {HTMLElement} element
   */
  onSetElement: function(element) {}
});

Component.with(Trait.Observable)
         .with(Trait.UiLookupable)
         .with(Trait.LifecycleCallbacks);
