'use strict';

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