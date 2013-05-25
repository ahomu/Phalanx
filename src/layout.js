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

    // new
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
   * @abstract
   * @param {String} regionName
   * @param {View} newView
   * @param {View} oldView
   */
  onChange: function(regionName, newView, oldView) {}
});