'use strict';

/**
 * @abstract
 * @class
 */
var View = defineClass({
  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    options || (options = {});

    this.onCreate.apply(this, arguments);

    Backbone.View.apply(this, arguments);
  }
});

var PROTO_VIEW = Backbone.View.prototype,

    ATTR_COMPONENT     = 'data-component',
    ATTR_COMPONENT_UID = 'data-component-uid';

_.extend(View.prototype, PROTO_VIEW, {

  /**
   *     events: {
   *       'click .js_event_selector': 'someMethodName'
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
   *     components: {
   *       likeBtn: LikeBtnComponent
   *     }
   *     // <button data-component="likeBtn"></button> => LikeBtnComponent
   *
   * @property {Object}
   */
  components: {},

  /**
   * @private
   * @property {Object}
   */
  _createdComponents: {},

  /**
   * @see Backbone.View.setElement
   * @param {HTMLElement} element
   * @param {Boolean} delegate
   */
  setElement: function(element, delegate) {
    this.onSetElement(element);
    PROTO_VIEW.setElement.apply(this, arguments);
    this.lookupUi();
  },

  /**
   * @see Backbone.View.delegateEvents
   * @param {Object} [events]
   */
  delegateEvents: function(events) {
    var componentEvents = {},
        componentName, protoComponent,
        eventKeys, eventClosures,
        i = 0, keys = Object.keys(this.components), iz = keys.length;

    if (events == null) {
      for (; i<iz; i++) {
        componentName  = keys[i];
        protoComponent = this.components[componentName].prototype;
        eventKeys      = _.keys(protoComponent.events),
        eventClosures  = _.map(protoComponent.events, this._getComponentEventClosure);
        _.extend(componentEvents, _.object(eventKeys, eventClosures));
      }
      PROTO_VIEW.delegateEvents.apply(this, [_.extend(componentEvents, this.events)]);
    } else {
      PROTO_VIEW.delegateEvents.apply(this, arguments);
    }

  },

  /**
   * @private
   * @param {String} methodName
   * @returns {Function}
   */
  _getComponentEventClosure: function(methodName) {
    return function(evt) {
      var component = this.getComponent(evt.target);
      component[methodName].apply(component, arguments);
    };
  },

  /**
   * like singleton...
   *
   * @param {HTMLElement} el
   * @returns {*}
   */
  getComponent: function(el) {
    var componentName, component, uid;

    do {
      componentName = el.getAttribute(ATTR_COMPONENT);
    } while(!componentName && (el = el.parentNode));

    if (!componentName) {
      throw new Error('Component name is not detected from ' + ATTR_COMPONENT);
    }

    uid  = el.getAttribute(ATTR_COMPONENT_UID);

    if (uid && this._createdComponents[uid]) {
      return this._createdComponents[uid];
    } else {
      component = new this.components[componentName](el);
      uid = component.uid;
      el.setAttribute(ATTR_COMPONENT_UID, uid);
      this._createdComponents[uid] = component;
      return component;
    }
  },

  /**
   * From the selector defined by this.ui, caching to explore the elements.
   */
  lookupUi: function() {
    var name, selector, thisUi = {},
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    for (; i<iz; i++) {
      name = keys[i];
      selector = this.ui[name];
      thisUi[name] = this.$el.find(selector);
    }

    this.ui = thisUi;
  },

  /**
   * Release ui elements reference.
   */
  releaseUi: function() {
    var name,
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    for (; i<iz; i++) {
      name = keys[i];
      this.ui[name] = null;
      delete this.ui[name];
    }
  },

  /**
   * Destroy all created componentns.
   */
  destroyComponents: function() {
    var uid, component,
        i = 0, keys = Object.keys(this._createdComponents), iz = keys.length;

    for (; i<iz; i++) {
      uid = keys[i];
      component = this._createdComponents[uid];
      component.destroy();
      this._createdComponents[uid] = null;
      delete this._createdComponents[uid];
    }
  },

  /**
   * Destory and teadown View.
   */
  destroy: function() {

    this.undelegateEvents();

    this.destroyComponents();

    this.releaseUi();

    this.onDestroy();
  },

  /**
   * @abstract
   */
  initialize: function() {},

  /**
   * @abstract
   * @chainable
   * @param {String} html
   * @return {*}
   */
  render: function(html) { this.$el.html(html); return this; },

  /**
   * @abstract
   */
  onCreate: function() {},

  /**
   * @abstract
   * @param {HTMLElement} el
   */
  onSetElement: function(el) {},

  /**
   * @abstract
   */
  onDestroy: function() {}
});
