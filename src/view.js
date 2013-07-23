'use strict';

/**
 * @abstract
 * @class Phalanx.View
 * @extends Backbone.View
 * @mixins Phalanx.Trait.Observable
 * @mixins Phalanx.Trait.UiLookupable
 * @mixins Phalanx.Trait.LifecycleCallbacks
 */
var View = defineClass({
  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    // init own object
    this._processedListeners = {};
    this._createdComponents  = {};
    this._processListeners();

    this.onCreate.apply(this, arguments);

    Backbone.View.apply(this, arguments);
  }
});

View.mixin(Trait.UiLookupable)
    .mixin(Trait.LifecycleCallbacks);

var ATTR_COMPONENT     = 'data-component',
    ATTR_COMPONENT_UID = 'data-component-uid';

_.extend(View.prototype, Backbone.View.prototype, {

  /**
   *     events: {
   *       'click .js_event_selector': 'someMethodName'
   *     }
   *     // $('.js_event_selector').click() => someMethod()
   *
   * @property {Object.<String, String|Function>}
   */
  events: {},

  /**
   *     components: {
   *       likeBtn: LikeBtnComponent
   *     }
   *     // <button data-component="likeBtn"></button> => LikeBtnComponent
   *
   * @property {Object.<String, Phalanx.Component>}
   */
  components: {},

  /**
   *     listeners: {
   *       'customEvent likeBtn': 'receiveCustomEvent'
   *     }
   *     // component.trigger('customEvent') => view.receiveCustomEvent()
   *
   * @property {Object.<String, String>}
   */
  listeners: {},

  /**
   * @private
   * @property {Object.<Number, Phalanx.Component>}
   */
  _createdComponents: {},

  /**
   *     _processedListeners: {
   *       'likeBtn': {
   *         'customeEvent': 'receiveCustomEvent'
   *       }
   *     }
   * @private
   * @property {Object.<String, Object<String, String>>}
   */
  _processedListeners: {},

  /**
   * @property {Boolean}
   */
  persistent: false,

  /**
   * @property {Boolean}
   */
  paused: false,

  /**
   * @param {HTMLElement} element
   * @param {Boolean} delegate
   */
  setElement: function(element, delegate) {
    Backbone.View.prototype.setElement.apply(this, arguments);
    if (this.el && this.el.parentNode) {
      this.lookupUi(this.$el);
      this.onSetElement(this.el);
    }
  },

  /**
   * @param {Object} [events]
   */
  delegateEvents: function(events) {
    var componentEvents;

    if (events == null) {
      componentEvents = this._getComponentEvents();
      Backbone.View.prototype.delegateEvents.apply(this, [_.extend(componentEvents, this.events)]);
    } else {
      Backbone.View.prototype.delegateEvents.apply(this, arguments);
    }
  },

  /**
   * @private
   * @return {Object.<String, String>}
   */
  _getComponentEvents: function() {
    var componentEvents = {},
        componentName, protoComponent,
        eventKeys, eventClosures,
        i = 0, keys = Object.keys(this.components), iz = keys.length;

    for (; i<iz; i++) {
      componentName  = keys[i];
      if (this.components[componentName] == null) {
        throw new Error(componentName + ' Class is not exists.');
      }
      protoComponent = this.components[componentName].prototype;
      eventKeys      = _.keys(protoComponent.events),
      eventClosures  = _.map(protoComponent.events, this._getComponentEventClosure);
      _.extend(componentEvents, _.object(eventKeys, eventClosures));
    }

    return componentEvents;
  },

  /**
   * @private
   * @param {String} methodName
   * @return {Function}
   */
  _getComponentEventClosure: function(methodName) {
    return function(evt) {
      var component = this.getComponent(evt.target);
      return component[methodName].apply(component, arguments);
    };
  },

  /**
   * Flywieght component getter.
   *
   * @param {HTMLElement} el
   * @return {Phalanx.Component}
   */
  getComponent: function(el) {
    var componentName, uid;

    do {
      componentName = el.getAttribute(ATTR_COMPONENT);
    } while(!componentName && (el = el.parentNode));

    if (!componentName) {
      throw new Error('Component name is not detected from `' + ATTR_COMPONENT + '`');
    }

    uid  = el.getAttribute(ATTR_COMPONENT_UID);

    if (this._createdComponents[uid]) {
      return this._createdComponents[uid];
    } else {
      return this._newComponent(componentName, el);
    }
  },

  /**
   * @private
   * @param {String} componentName
   * @param {HTMLElement} el
   * @return {Phalanx.Component}
   */
  _newComponent: function(componentName, el) {
    var component, uid;

    component = new this.components[componentName](el);
    uid = component.uid;

    this._listenToComponent(component, componentName);

    el.setAttribute(ATTR_COMPONENT_UID, uid);
    this._createdComponents[uid] = component;
    return component;
  },

  /**
   * @private
   * @param {Phalanx.Component} component
   * @param {String} componentName
   */
  _listenToComponent: function(component, componentName) {
    var listeners, i, events, iz,
        event, method;

    if ((listeners = this._processedListeners[componentName])) {
      i = 0;
      events = Object.keys(listeners);
      iz = events.length;

      for (; i<iz; i++) {
        event  = events[i];
        method = listeners[event];
        if (!_.isFunction(this[method])) {
          throw new Error('Method `' + method + '` is not exists this View');
        }
        this.listenTo(component, event, this[method]);
      }
    }
  },

  /**
   * Converted to processed the `listeners` property.
   * Call at once when view instance created.
   * @private
   */
  _processListeners: function() {
    var i = 0, listeners = Object.keys(this.listeners), iz = listeners.length,
        event_component, methodName, eventMap;

    for (; i<iz; i++) {
      event_component = listeners[i].split(/\s+/);
      methodName      = this.listeners[listeners[i]];
      eventMap        = this._processedListeners[event_component[1]];

      eventMap || (eventMap = this._processedListeners[event_component[1]] = {});
      eventMap[event_component[0]] = methodName;
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
    this.destroyComponents();
    this.undelegateEvents();
    this.stopListening();
    this.releaseUi();

    this.onDestroy();
    this.el = this.$el = null;
  },

  /**
   * Pause events
   */
  pause: function() {
    this.paused = true;
    this.undelegateEvents();
    this.releaseUi();

    this.onPause();
  },

  /**
   * Resume events
   */
  resume: function() {
    this.paused = false;
    this.delegateEvents();
    this.lookupUi();

    this.onResume();
  },

  /**
   * @abstract
   * @param {HTMLElement} element
   */
  onSetElement: function(element) {},

  /**
   * @abstract
   * @chainable
   * @param {String} html
   * @return {*}
   */
  render: function(html) { this.$el.html(html); return this; }
});
