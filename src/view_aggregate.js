'use strict';

/**
 * @abstract
 * @class Phalanx.View.Aggregate
 * @extends Phalanx.View
 */
View.Aggregate = View.extend({
  /**
   * @property {String}
   */
  el: 'div',

  /**
   * @property {Object}
   */
  events: {},

  /**
   * @property {Array<Phalanx.View>}
   */
  children: [],

  /**
   * @property {jQuery}
   */
  $children: null,

  /**
   * @property {Function|Null}
   */
  readyDraw: null,

  /**
   *
   */
  onCreate: function() {
    this._origEvents = this.events;
  },

  /**
   * Evaluation of the aggregate target control
   * @param {Phalanx.View} child
   */
  invalidate: function(child) {

    this.children.push(child);

    // イベントの (un)?delegateEvents を自動で行わないフラグをViewに作る？
    // @property {Boolean} manuallyEvents
    child.undelegateEvents();
    this.listenTo(child, 'all', this.proxyEventHandler);

    if (!this._drawer) {
      this.readyDraw = this._drawer;
      setTimeout(this.readyDraw, 4);
    }
  },

  /**
   * AggregateView が childViewのイベントを委譲されてほしい
   *
   * this.listenTo(aggregator, 'oooops', function() {
   *   // this <- child view
   * });
   *
   * @param {String} eventName
   */
  proxyEventHandler: function(eventName) {
    // TODO implement
    console.log(arguments);
    this.trigger(eventName, arguments);
  },

  /**
   *
   */
  delegateEventsFrom: function(ChildView) {
    var keys      = _.keys(ChildView.prototype.events),
        handlers  = _.map(_.values(ChildView.prototype.events), _._getAggregateEventClosure);

    this.events = _.extend(_.clone(this._origEvents), _.object(keys, handlers));

    // reconfigure
    this.delegateEvents();
  },

  /**
   * pick a view from element has `data-cid` and delegate event
   * @param {Function} handler
   * @return {Function}
   * @private
   */
  _getAggregateEventClosure: function(handler) {
    return function(evt) {
      var $childViewEl = $(evt.currentTarget).closest('data-cid'),
          cid          = $childViewEl[0].getAttribute('data-cid'),
          currentChild = _.findWhere(this.children, {cid: cid});

      return handler.apply(currentChild, arguments);
    }
  },

  /**
   * drawing main process
   * @private
   */
  _draw: function() {
    var fragment = document.createDocumentFragment(),
        i = 0, child;

    while ((child = this.children[i++])) {
      fragment.appendChild(child.el);
      child.el.setAttribute('data-cid', child.cid);
    }

    this.el.appendChild(fragment);
    this.$children = this.$el.children();
  },

  /**
   * Handler to guarantee the execution of one-time
   * @private
   */
  _drawer: function() {
    this._draw();
    this.readyDraw = null;
  },

  pause: function() {
    // TODO children are to pause
    View.prototype.pause.apply(this, arguments);
  },

  resume: function() {
    // TODO children are to resume
    View.prototype.resume.apply(this, arguments);
  },

  destroy: function() {
    // TODO children are to destroy
    View.prototype.destroy.apply(this, arguments);
  }

});
