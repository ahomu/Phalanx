/*! Phalanx - v0.0.4 ( 2013-06-04 ) - MIT */
(function(window) {

"use strict";

var Trait = {};

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
  var Constructor;

  if (typeof constructor_or_members === 'function') {
    Constructor = constructor_or_members;
  } else {
    members = constructor_or_members;
    Constructor = members.hasOwnProperty('constructor') ? members.constructor
                                                        : function() {};
  }

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

  /**
   * Method which can be used instead of the `new` statement
   *
   *     var instance = Klass.create();
   *
   * @method create
   * @return {*}
   */
  Constructor.create = __create;

  /**
   * Call a specific method of the parent class
   *
   *     var SuperClass = Klass.of({
   *       onCreate: function() {
   *         alert('Yup!');
   *       }
   *     });
   *     var SubClass = SuperClass.extends({
   *       onCreate: function() {
   *         this.super('onCreate', arguments); // => alert('Yup!')
   *       }
   *     });
   *
   * @method super
   * @param {String} methodName
   * @param {Object|Arguments} args
   * @type {Function}
   */
  Constructor.prototype.super = __super;

  return Constructor;
}

function __with(trait, aliases) {
  /*jshint validthis:true */
  var i = 0, keys = Object.keys(trait), iz = keys.length,
      prop, processed_trait = {};

  aliases || (aliases = {});

  for (; i<iz; i++) {
    prop = keys[i];
    if (aliases[prop]) {
      processed_trait[aliases[prop]] = trait[prop];
    } else {
      processed_trait[prop] = trait[prop];
    }
  }

  this.prototype = _.extend(processed_trait, this.prototype);
  return this;
}

function __create() {
  /*jshint validthis:true */
  var instance = Object.create(this.prototype);
  this.apply(instance, arguments);
  return instance;
}

function __super(methodName, args) {
  /*jshint validthis:true */
  // TODO: this.super() で連鎖的に先祖のメソッドを呼び出したい
  return this.constructor.__super__[methodName].apply(this, args);
}
/**
 * @class Phalanx.Trait.AsyncCallbacks
 */
Trait.AsyncCallbacks = {

  /**
   * @abstract
   */
  onSuccess: function() {},

  /**
   * @abstract
   */
  onFailure: function() {}
};
/**
 * @class Phalanx.Trait.EntityObserver
 */
Trait.EntityObserver = {

  /**
     * @property {Phalanx.Model|Phalanx.Collection}
   */
  entity: null,

  /**
   *     entitylListeners: {
   *       'change': 'modelChanged'
   *     }
   *     // model.trigger('change') => observer.modelChanged()
   *
   * @property {Object.<String, String>}
   */
  entitylListeners: {},

  /**
   * Listen to entity events
   */
  listenToEntity: function() {
    var i = 0, events = Object.keys(this.entitylListeners), iz = events.length,
        event, method;

    for (; i<iz; i++) {
      event  = events[i];
      method = this.entitylListeners[event];
      if (!_.isFunction(this[method])) {
        throw new Error('Method `' + method + '` is not exists this Entity');
      }
      this.listenTo(this.entity, event, this[method]);
    }
  },

  /**
   * Unlisten to bound model events
   */
  unlistenToEntity: function() {
    this.stopListening(this.entity);
  }
};
/**
 * @class Phalanx.Trait.LifecycleCallbacks
 */
Trait.LifecycleCallbacks = {

  /**
   * It is called the first instance is created.
   * @abstract
   */
  onCreate: function() {},

  /**
   * It is called as a common initialization process. (derived from Backbone)
   * @abstract
   */
  initialize: function() {},

  /**
   * It is called when destroying the instance.
   * @abstract
   */
  onDestroy: function() {}
};
/**
 * @class Phalanx.Trait.Observable
 * @extends Backbone.Events
 */
Trait.Observable = Backbone.Events;
var UI_FIND_PLACEHOLDER = '[data-ui="{name}"]';

/**
 * @class Phalanx.Trait.UiLookupable
 */
Trait.UiLookupable = {
  /**
   *     ui: {
   *       hoge: null
   *     }
   *     // view.ui.hoge => [data-ui="hoge"]
   *
   * @property {Object.<String, Null>}
   */
  ui: {},

  /**
   * @property {Object.<String, jQuery>}
   */
  $ui: {},

  /**
   * From the selector defined by this.ui, caching to explore the elements.
   *
   * @params {HTMLElement|jQuery}
   */
  lookupUi: function(element) {
    var name, selector,
        $baseEl = element instanceof Backbone.$ ? element : Backbone.$(element),
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    this.ui  = {};
    this.$ui = {};

    for (; i<iz; i++) {
      name = keys[i];
      selector = UI_FIND_PLACEHOLDER.replace('{name}', name);
      this.$ui[name] = $baseEl.find(selector);
      this.ui[name]  = this.$ui[name].length ? this.$ui[name][0] : null;
    }
  },

  /**
   * Release ui elements reference.
   */
  releaseUi: function() {
    var name,
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    for (; i<iz; i++) {
      name = keys[i];
      this.$ui[name] = null;
      this.ui[name] = null;
    }
  }
};
/**
 * @abstract
 * @class Phalanx.Router
 * @extends Backbone.Router
 * @mixins Phalanx.Trait.LifecycleCallbacks
 */
var Router = defineClass({
  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    options || (options = {});

    this.onCreate.apply(this, arguments);

    Backbone.Router.apply(this, arguments);
  }
});

Router.with(Trait.LifecycleCallbacks);

_.extend(Router.prototype, Backbone.Router.prototype, {
  /**
   * destroy
   */
  destroy: function() {
    this.onDestroy();
  }
});

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

View.with(Trait.UiLookupable)
    .with(Trait.LifecycleCallbacks);

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
        event_component, methodName;

    for (; i<iz; i++) {
      event_component = listeners[i].split(/\s+/);
      methodName      = this.listeners[listeners[i]];
      (this._processedListeners[event_component[1]] = {})[event_component[0]] = methodName;
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
      this.stopListening(component);
      component.destroy();
      this._createdComponents[uid] = null;
      delete this._createdComponents[uid];
    }
  },

  /**
   * Destory and teadown View.
   */
  destroy: function() {

    this.destroyRegions && this.destroyRegions();

    this.destroyComponents();

    this.undelegateEvents();

    this.releaseUi();

    this.onDestroy();

    this.el = this.$el = null;
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

/**
 * @abstract
 * @class Phalanx.Collection
 * @extends Backbone.Collection
 * @mixins Phalanx.Trait.LifecycleCallbacks
 */
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

Collection.with(Trait.LifecycleCallbacks);

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
/**
 * @abstract
 * @class Phalanx.Layout
 * @extends Phalanx.View
 * @mixins Phalanx.Trait.Observable
 * @mixins Phalanx.Trait.LifecycleCallbacks
 */
var Layout = defineClass({
  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    // init own object
    this._assignedMap = {};

    View.apply(this, arguments);
  }
});

_.extend(Layout.prototype, View.prototype, {
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
   * @property {Object.<String, String>}
   */
  regions: {},

  /**
   * Correspondence table of the region name and assigned View.
   *
   *     laput.assign(regionName, Phalanx.View);
   *     // layout._assignedMap => { regionName: Phalanx.View }
   *
   * @private
   * @property {Object.<String, Phalanx.View>}
   */
  _assignedMap: {},

  /**
   * Assign new View to element in layout.
   * And destroy old View automatically.
   *
   * @param {String} regionName
   * @param {Phalanx.View} newView
   */
  assign: function(regionName, newView) {
    var selector, oldView, assignToEl;

    selector = this.regions[regionName];
    oldView  = this.getRegionView(regionName);
    assignToEl = this.$el.find(selector)[0];

    if (!selector || !assignToEl) {
      throw new Error('Could not get element of `'+ selector +'` from the region ' + regionName);
    }

    // change
    this.onChange(regionName, newView, oldView);

    // old
    oldView && oldView.destroy();

    // new
    newView.setElement(assignToEl);

    this._assignedMap[regionName] = newView;
  },

  /**
   * @param {String} regionName
   * @returns {Phalanx.View}
   */
  getRegionView: function(regionName) {
    if (!(regionName in this.regions)) {
      throw new Error('Specified region `' + regionName + '` is not declared');
    }
    return this._assignedMap[regionName];
  },

  /**
   * @param {String} regionName
   */
  withdraw: function(regionName) {
    var view = this.getRegionView(regionName);
    view.destroy();
    this._assignedMap[regionName] = null;
  },

  /**
   * Destroy all regions assigned views.
   */
  destroyRegions: function() {
    var i = 0, regions = Object.keys(this.regions),
        iz = this.regions.length, regionName;

    for (; i<iz; i++) {
      regionName = regions[i];
      this.withdraw(regionName);
    }
  },

  /**
   * @abstract
   * @param {String} regionName
   * @param {Phalanx.View} newView
   * @param {Phalanx.View} oldView
   */
  onChange: function(regionName, newView, oldView) {}
});
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
   * @constructor
   * @param {HTMLElement} el
   */
  constructor: function(el) {
    this.uid = INCREMENT_COMPONENT_UID++;

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
      this.lookupUi(this.$el);
      this.onSetElement(this.el);

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
   * @param {HTMLElement} element
   */
  onSetElement: function(element) {}
});

Component.with(Trait.Observable)
         .with(Trait.UiLookupable)
         .with(Trait.LifecycleCallbacks);

/**
 * @class Phalanx
 */
var Phalanx = {

  defineClass: defineClass,

  Router     : Router,
  Model      : Model,
  Collection : Collection,

  View       : View,
  Layout     : Layout,
  Component  : Component,
  Trait      : Trait
};

// for RequireJS
if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  window.define(function() {
    return Phalanx;
  });
}
// for Node.js & browserify
else if (typeof module === 'object' && module &&
  typeof exports === 'object' && exports &&
  module.exports === exports
  ) {
  module.exports = Phalanx;
}
// for Browser
else {
  window.Phalanx = Phalanx;
}

})(this);