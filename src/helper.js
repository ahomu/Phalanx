'use strict';

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

