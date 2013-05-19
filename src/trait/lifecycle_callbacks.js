'use strict';

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