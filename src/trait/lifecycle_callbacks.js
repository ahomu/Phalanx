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