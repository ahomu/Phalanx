'use strict';

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