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
   * If exists element having `data-id` attribute
   *
   */
  id: null,

  /**
   * instance's unique id nubmer
   * @property {Number}
   */
  uid: null,

  /**
   * placeholder of instance parameters
   * @property {Object}
   */
  params: {},

  /**
   * @constructor
   * @param {HTMLElement} el
   */
  constructor: function(el) {
    this.uid = INCREMENT_COMPONENT_UID++;

    this.params = _.clone(this.params);

    this.onCreate.apply(this, arguments);

    this.setElement(el);

    this.initialize.apply(this, arguments);
  },

  /**
   * Set managing domain element
   * @param element
   */
  setElement: function(element) {
    this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
    this.el = this.$el[0];

    if (this.el && this.el.parentNode) {
      this.lookupUi();
      this.onSetElement();

      this.id = parseInt(this.el.getAttribute('data-id'), 10);
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
   */
  onSetElement: function() {}
});

Component.mixin(Trait.Observable)
         .mixin(Trait.UiLookupable)
         .mixin(Trait.LifecycleCallbacks);
