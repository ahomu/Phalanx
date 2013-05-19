/*! Phalanx - v0.0.3 ( 2013-05-19 ) - MIT */
(function(window) {

"use strict";

var Trait = {};

var DEFINE_NOT_WRITABLE   = {writable: false};

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

  _.extend(this.prototype, processed_trait);
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
      this.ui[name]  = this.$ui[name][0];
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
    this._createdComponents = {};
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
    Backbone.View.prototype.setElement.apply(this, arguments);
    if (this.el && this.el.parentNode) {
      this.lookupUi(this.el);
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
      Backbone.View.prototype.delegateEvents.apply(this, [_.extend(componentEvents, this.events)]);
    } else {
      Backbone.View.prototype.delegateEvents.apply(this, arguments);
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
   * destroy
   */
  destroy: function() {
    this.reset();
    this.onDestroy();
  }
});
/**
 * @abstract
 * @class  Phalanx.Layout
 * @extends Backbone.View
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
    this.onCreate.apply(this, arguments);

    Backbone.View.apply(this, arguments);
  }
});

Layout.with(Trait.LifecycleCallbacks);

_.extend(Layout.prototype, Backbone.View.prototype, {
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
   * @see Backbone.View.setElement
   * @param {HTMLElement} element
   * @param {Boolean} delegate
   */
  setElement: function(element, delegate) {
    Backbone.View.prototype.setElement.apply(this, arguments);
    if (this.el && this.el.parentNode) {
      this.onSetElement(this.el);
    }
  },

  /**
   * Assign new View to element in layout.
   * And destroy old View automatically.
   *
   * @param {String} regionName
   * @param {View} newView
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

    // new: View has `lookupUi` method but Layout hasn't that method.
    newView.lookupUi && newView.lookupUi(assignToEl);
    newView.setElement(assignToEl);

    this._assignedMap[regionName] = newView;
  },

  /**
   * @param {String} regionName
   * @returns {View}
   */
  getRegionView: function(regionName) {
    if (!(regionName in this.regions)) {
      throw new Error('Specified region `' + regionName + '` is not declared');
    }
    return this._assignedMap[regionName];
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
   * When the layout is destroyed, View which encloses also destroy all.
   */
  destroy: function() {

    this.destroyRegions();

    this.undelegateEvents();

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
   * @param {String} regionName
   * @param {View} newView
   * @param {View} oldView
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