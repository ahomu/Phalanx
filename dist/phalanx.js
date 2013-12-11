/*! Phalanx - v0.0.5 ( 2013-12-11 ) - MIT */
(function(window) {

"use strict";

var Trait = {};

/**
 * `defineClass` is Helper function, to generate Object like Class with basic oop fetures
 *
 *     // e.g 1
 *     var Klass = Phalanx.defineClass{
 *       constructor: function() {
 *         
 *       },
 *       foo: 'bar',
 *       baz: 'qux'
 *     });
 *
 *     // e.g 2
 *     function NewClass() {
 *       
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
   * Method which can be used instead of the `new` statement
   *
   *     var instance = Klass.create();
   *
   * @method create
   * @return {*}
   */
  Constructor.create = __create;

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
   *                                      .mixin(AsyncCallbackTrait)
   *                                      .mixin(ObservableTrait, {
   *                                        method: 'aliasedMethod'
   *                                      });
   *
   * @method mixin
   * @param {Object} trait
   * @param {Object} [aliases]
   * @return {Klass}
   */
  Constructor.mixin = __mixin;

  /**
   * Call a specific method of the super class
   *
   *     var SuperClass = Klass.of({
   *       onCreate: function() {
   *         alert('Yup!');
   *       }
   *     });
   *     var SubClass = SuperClass.extends({
   *       onCreate: function() {
   *         this.callSuper('onCreate', arguments); // => alert('Yup!')
   *       }
   *     });
   *
   * @method callSuper
   * @param {String} methodName
   * @param {Object|Arguments} args
   * @type {Function}
   */
  Constructor.prototype.callSuper = __callSuper;

  return Constructor;
}

function __mixin(trait, aliases) {
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

function __callSuper(methodName, args) {
  /*jshint validthis:true */
  // TODO: this.callSuper() で連鎖的に先祖のメソッドを呼び出したい
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
   * @property {String}
   */
  eventSplitter: /^(\S+)\s*(.*)$/,

  /**
   *     entitylListeners: {
   *       'change model': 'modelChanged'
   *     }
   *     // this.model.trigger('change') => this.modelChanged()
   *
   * @property {Object.<String, String>}
   */
  entityListeners: {},

  /**
   * Listen to entity events
   */
  listenToEntity: function() {
    var i = 0, events = Object.keys(this.entityListeners),
        event_entity, method;

    while ((event_entity = events[i++])) {
      method = this.entityListeners[event_entity];
      event_entity = event_entity.match(this.eventSplitter);

      if (!this[event_entity[2]]) {
        throw new Error('Entity `' + event_entity[2] + '` is unknown property');
      }
      if (!_.isFunction(this[method])) {
        throw new Error('Method `' + method + '` is not exists this Entity');
      }

      this.listenTo(this[event_entity[2]], event_entity[1], this[method]);
    }
  },

  /**
   * Unlisten to bound model events
   */
  stopListeningEntity: function() {
    var i = 0, entity,
        listeningEntities = _.map(this.entityListeners, _.bind(function(_, _entity) {
          return _entity.match(this.eventSplitter)[2];
        }, this));

    while ((entity = listeningEntities[i++])) {
      this.stopListening(this[entity]);
    }
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
   * In Layout, View, Component...After set initial element & Before event delegation.
   * @abstract
   */
  initialize: function() {},

  /**
   * It is called when new element assigned.
   * called only Layout, View, Component.
   * @abstract
   */
  onSetElement: function() {},

  /**
   * @abstract
   */
  onPause: function() {},

  /**
   * @abstract
   */
  onResume: function() {},

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
   * @property {HTMLElement|jQuery}
   */
  el: null,

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
   */
  lookupUi: function() {
    var name, selector,
        $baseEl = this.el instanceof Backbone.$ ? this.el : Backbone.$(this.el),
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

Router.mixin(Trait.LifecycleCallbacks);

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
      this.lookupUi();
      this.onSetElement();
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
    this.model = this.collection = null;
    this.options = this._processedListeners = null;
  },

  /**
   * Pause events
   */
  pause: function() {
    this.paused = true;
    this.onPause();

    this.destroyComponents();
    this.undelegateEvents();
    this.stopListening();
    this.releaseUi();
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
   */
  onSetElement: function() {},

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

Model.mixin(Trait.LifecycleCallbacks);

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

Collection.mixin(Trait.LifecycleCallbacks);

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

    if (!this.$el) {
      // maybe already destroy
      return;
    }
    assignToEl = this.$el.find(selector)[0];

    if (!selector || !assignToEl) {
      throw new Error('Could not get element of `'+ selector +'` from the region ' + regionName);
    }

    // change
    this.onChange(regionName, newView, oldView);

    // old
    if (oldView) {
      if (oldView.persistent) {
        oldView.pause();
        oldView.$pausingCache = oldView.$el.children();
      } else {
        oldView.destroy();
      }
    }

    this._assignedMap[regionName] = newView;

    // new
    if (newView.persistent && newView.paused) {
      newView.$el.empty().append(newView.$pausingCache);
      newView.$pausingCache = null;
      newView.resume();
    } else {
      newView.setElement(assignToEl);
    }

  },

  /**
   * Copy to some specified attributes
   *
   * @private
   * @param {HTMLElement} fromEl
   * @param {HTMLElement} toEl
   */
  _copyAttrs: function(fromEl, toEl) {
    toEl.setAttribute('id',    fromEl.getAttribute('id')    || '');
    toEl.setAttribute('class', fromEl.getAttribute('class') || '');
    toEl.setAttribute('style', fromEl.getAttribute('style') || '');
  },

  /**
   * @param {String} regionName
   * @return {Boolean}
   */
  isRegionExists: function(regionName) {
    if (!(regionName in this.regions)) {
      throw new Error('Specified region `' + regionName + '` is not declared');
    }
    return !!this.$el.find(this.regions[regionName]).length;
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
    this._assignedMap[regionName] = null;
    view && view.destroy();
  },

  /**
   * @override Phalanx.View.destroy
   */
  destroy: function() {
    var i = 0, regions = Object.keys(this.regions),
        regionName;

    while ((regionName = regions[i++])) {
      this.withdraw(regionName);
    }
    View.prototype.destroy.apply(this, arguments);
  },

  /**
   * @override Phalanx.View.pause
   */
  pause: function() {
    var i = 0, regions = Object.keys(this.regions),
        regionName;

    while ((regionName = regions[i++])) {
      this.getRegionView(regionName) && this.getRegionView(regionName).pause();
    }
    View.prototype.pause.apply(this, arguments);
  },

  /**
   * @override Phalanx.View.resume
   */
  resume: function() {
    var i = 0, regions = Object.keys(this.regions),
        regionName;

    while ((regionName = regions[i++])) {
      this.getRegionView(regionName) && this.getRegionView(regionName).resume();
    }
    View.prototype.resume.apply(this, arguments);
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