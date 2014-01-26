'use strict';

/**
 * @abstract
 * @class Phalanx.Layout.Colleciton
 * @extends Phalanx.Layout
 */
Layout.Collection = Layout.extend({
  /**
   * @property {Collection}
   */
  collection: null,

  /**
   * @property {Phalanx.View}
   */
  itemView: View,

  /**
   * @properyt {Phalanx.View.Aggregate}
   */
  aggregateView: View.Aggregate,

  /**
   * @param {String} regionName
   * @param {Array|Collection} collection
   * @param {String} [modelProp]
   */
  assignItemViews: function(regionName, collection, modelProp) {
    var aggregator = new this.aggregateView(),
        i = 0, item, options;

    modelProp || (modelProp = 'model')

    // collection
    this._stopListeningCollection();
    if (_.isArray(collection)) {
      this.collection = new Phalanx.Collection(collection);
    } else {
      this.collection = collection
    }
    this._listenToCollection();

    // assign
    this.assign(regionName, aggregator);

    // events
    aggregator.delegateEventsFrom(this.itemView);

    // invalidates
    while ((item = collection[i++])) {
      options = {};
      options[modelProp] = item;
      aggregator.invalidate(new this.itemView(options).render());
    }
  },

  /**
   * @private
   */
  _listenToCollection: function() {
    // TODO Consider the resume and pause
    this.listenTo(this.collection, 'sort',  this._onSort);
    this.listenTo(this.collection, 'reset', this._onReset);
  },

  /**
   * @private
   */
  _stopListeningCollection: function() {
    // TODO Consider the resume and pause
    this.stopListening(this.collection, 'sort',  this._onSort);
    this.stopListening(this.collection, 'reset', this._onReset);
  },

  /**
   * @abstract
   */
  onSort: null,

  /**
   *
   * @private
   */
  _onSort: function() {
    // TODO sort automatically children of aggregateview
    if (_.isFunction(this.onSort)) {
      this.onSort.apply(this, arguments);
    }
  },

  /**
   * @abstract
   */
  onReset: null,

  /**
   * @private
   */
  _onReset: function() {
    // TODO rebuild automatically children of aggregateview
    if (_.isFunction(this.onReset)) {
      this.onReset.apply(this, arguments);
    }
  }
});
