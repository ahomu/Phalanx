'use strict';

/**
 * @abstract
 * @class Phalanx.View
 * @extends Backbone.View
 * @mixins Phalanx.Trait.MappingUI
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

View.with(Trait.MappingUI);

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
   * @private
   * @property {Object.<Number, Phalanx.Component>}
   */
  _createdComponents: {},

  /**
   * @see Backbone.View.setElement
   * @param {HTMLElement} element
   * @param {Boolean} delegate
   */
  setElement: function(element, delegate) {
    PROTO_VIEW.setElement.apply(this, arguments);
    if (this.el && this.el.parentNode) {
      this.lookupUi();
      this.onSetElement(this.el);
    }
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
   * TODO 要素からのcomponent取得と、componentの生成はメソッドを分割したほうが良い
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
