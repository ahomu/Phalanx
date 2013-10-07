'use strict';

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
   * Method which can be used instead of the `new` statement
   *
   *     var instance = Klass.create();
   *
   * @method create
   * @return {*}
   */
  Constructor.create = __create;

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