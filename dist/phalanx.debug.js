/*! Phalanx - v0.0.0 ( 2013-05-09 ) - MIT */
(function(window) {

"use strict";

var DEFINE_NOT_WRITABLE   = {writable: false};
var UNDEFINED_UNIQUE_NAME = '__UNDEFINED__';

/**
 * `defineClass` is Helper function, to generate Object like Class with basic oop fetures
 *
 *     // e.g 1
 *     var Klass = Phalanx.defineClass{
 *       constructor: function() {
 *         console.log('Hello World');
 *       },
 *       foo: 'bar',
 *       baz: 'qux'
 *     });
 *
 *     // e.g 2
 *     function NewClass() {
 *       console.log('This is constructor');
 *     }
 *     Phalanx.defineClass(NewClass, {
 *       hoge: 'fuga',
 *       hige: 'piyo'
 *     };
 *
 * @param {Function|Object} constructor_or_members
 * @param {Object} [members]
 */
function defineClass(constructor_or_members, members) {

  /**
   * Base Class of OOP feature
   *
   * @abstract
   * @class Klass
   * @returns {*}
   */
  var constructor;

  if (arguments.length === 1) {
    members = constructor_or_members;
  } else {
    constructor = constructor_or_members;
  }

  var Constructor = typeof constructor === 'function' ? constructor
                                                      : members.hasOwnProperty('constructor') ? members.constructor
                                                                                              : function() {};

  delete members.constructor;
  _.extend(Constructor.prototype, members);

  /**
   * By inheriting an existing class, you create a new class
   *
   *     var classDefinition = {
   *       // ...
   *     };
   *     var ExtendedClass = SomeClass.extend(classDefinition)
   *
   * @method extend
   * @see Backbone.View.extend
   * @param {Function|Object} constructor_or_child
   * @param {Object} [child]
   * @return {Klass}
   */
  Constructor.extend = Backbone.View.extend;
  Object.defineProperty(Constructor, 'extend', DEFINE_NOT_WRITABLE);

  /**
   * Mixin the trait in the `prototype` of the class.
   * Is a feature that is for a simple mixin, not the exact trait.
   * Not support multiple inheritance like "Squeak Smalltalk".
   *
   *     var classDefinition = {
   *       // ...
   *     };
   *     var ExtendedWithTrait = SomeClass.extend(classDefinition)
   *                                      .with(AsyncCallbackTrait)
   *                                      .with(ObservableTrait, {
   *                                        method: 'aliasedMethod'
   *                                      });
   *
   * @method with
   * @param {Object} trait
   * @param {Object} [aliases]
   * @return {Klass}
   */
  Constructor.with = __with;
  Object.defineProperty(Constructor, 'with', DEFINE_NOT_WRITABLE);

  /**
   * Method which can be used instead of the `new` statement
   *
   *     var instance = Klass.create();
   *
   * @method create
   * @return {*}
   */
  Constructor.create = __create;
  Object.defineProperty(Constructor, 'create', DEFINE_NOT_WRITABLE);

  return Constructor;
}

function __with(trait, aliases) {
  var i = 0, keys = Object.keys(trait), iz = keys.length,
      prop, processed_trait = {};

  aliases || (aliases = {});

  for (; i<iz; i++) {
    prop = keys[i]
    if (aliases[prop]) {
      processed_trait[aliases[prop]] = trait[prop];
    } else {
      processed_trait[prop] = trait[prop];
    }
  }

  _.extend(this.prototype, processed_trait);
  return this;
}

function __create() {
  var instance = Object.create(this.prototype);
  this.apply(instance, arguments);
  return instance;
}


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
    ATTR_COMPONENT_UID = 'data-component-uid',

    INCREMENT_COMPONENT_UID = 0;

_.extend(View.prototype, PROTO_VIEW, {

  /**
   * @property {String}
   */
  name: UNDEFINED_UNIQUE_NAME,

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
   * @param element
   * @param delegate
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
        eventKeys, eventClosures;

    if (events == null) {
      for (componentName in this.components) {
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
    }
  },

  /**
   * like singleton...
   *
   * @param {HTMLElement} el
   * @returns {*}
   */
  getComponent: function(el) {
    var componentName, uid;

    do {
      componentName = el.getAttribute(ATTR_COMPONENT);
    } while(!componentName && (el = el.parentNode));

    if (!componentName) {
      throw new Error('Component name is not detected from ' + ATTR_COMPONENT)
    }

    uid  = el.getAttribute(ATTR_COMPONENT_UID) || INCREMENT_COMPONENT_UID++;

    if (this._createdComponents[uid]) {
      return this._createdComponents[uid];
    } else {
      el.setAttribute(ATTR_COMPONENT_UID, uid);
      return this._createdComponents[uid] = new this.components[componentName](el, uid);
    }
  },

  /**
   * From the selector defined by this.ui, caching to explore the elements.
   */
  lookupUi: function() {
    var name, selector, thisUi = {};

    for (name in this.ui) {
      selector = this.ui[name];
      thisUi[name] = this.$el.find(selector);
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
   * Destroy all created componentns.
   */
  destroyComponents: function() {
    var uid, component;
    for (uid in this._createdComponents) {
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

_.extend(Model.prototype, Backbone.Model.prototype, {
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

var Collection = defineClass({
  /**
   * @constructor
   * @param {Object} attributes
   * @param {Object} options
   */
  constructor: function(attributes, options) {
    options || (options = {});

    this.onCreate.apply(this, arguments);

    Backbone.Collection.apply(this, arguments);
  }
});

_.extend(Collection.prototype, Backbone.Collection.prototype, {
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
var Layout = defineClass({
  /**
   * @property {Object}
   */
  regions: {},

  /**
   * Correspondence table of the region name and assigned View.
   *
   *     laput.assign(regionName, Phalanx.View);
   *     // layout._assignedMap => { regionName: Phalanx.View }
   *
   * @private
   * @property {Object}
   */
  _assignedMap: {},

  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    options || (options = {});

    if (options.regions) {
      _.extend(this.regions, options.regions)
    }

    this.onCreate.apply(this, arguments);

    this.initialize.apply(this, arguments);
  },

  /**
   * Assign new View to element in layout.
   * And destroy old View automatically.
   *
   * @param {String} regionName
   * @param {View} newView
   */
  assign: function(regionName, newView) {
    var selector, oldView;

    selector = this.regions[regionName];
    oldView  = this.getRegionView(regionName);

    if (!selector) {
      throw new Error('Could not get a selector from the region ' + regionName);
    }

    // change
    this.onChange(regionName, newView, oldView);

    // old
    oldView && oldView.destroy();

    // new
    newView.setElement($(selector)[0]);

    this._assignedMap[regionName] = newView;
  },

  /**
   * @param {String} regionName
   * @returns {View}
   */
  getRegionView: function(regionName) {
    if (!regionName in this.regions) {
      throw new Error('Undefined region `' + regionName + '` is specified');
    }
    return this._assignedMap[regionName] || null;
  },

  /**
   * @param {String} regionName
   * @return {View}
   */
  withdraw: function(regionName) {
    var view;

    view = this.getRegionView(regionName);
    view.destroy();
    this._assignedMap[regionName] = null;

    return view;
  },

  /**
   * When the layout is destroyed, View which encloses also destroy all.
   */
  destroy: function() {
    this.onDestroy();

    var i = 0, regions = Object.keys(this.regions),
        iz = this.regions.length, regionName;

    for (; i<iz; i++) {
      regionName = regions[i]
      this.withdraw(regionName);
    }
  },

  /**
   * @abstract
   * @param {String} regionName
   * @param {View} newView
   * @param {View} oldView
   */
  onChange: function(regionName, newView, oldView) {},

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
      thisUi[name] = this.$el.find(selector);
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

var Phalanx = {

  defineClass: defineClass,

  Model      : Model,
  View       : View,
  Collection : Collection,
  Layout     : Layout,
  Component  : Component
};

// for RequireJS
if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
  window.define(function() {
    return Phalanx;
  });
}
// for Node.js & browserify
else if (typeof module == 'object' && module &&
  typeof exports == 'object' && exports &&
  module.exports == exports
  ) {
  module.exports = Phalanx;
}
// for Browser
else {
  window.Phalanx = Phalanx;
}

})(this);