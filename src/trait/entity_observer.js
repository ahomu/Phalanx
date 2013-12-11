'use strict';

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