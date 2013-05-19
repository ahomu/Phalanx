'use strict';

/**
 * @abstract
 * @class Phalanx.Layout
 * @mixins Bakcbone.Events
 */
var Layout = defineClass({
  /**
   * @property {HTMLElement}
   */
  el: null,

  /**
   * @property {jQuery|Zepto}
   */
  $el: null,

  /**
   * @property {Object}
   */
  regions: {},

  /**
   * @property {Object}
   */
  options: {},

  /**
   * Correspondence table of the region name and assigned View.
   *
   *     laput.assign(regionName, Phalanx.View);
   *     // layout._assignedMap => { regionName: Phalanx.View }
   *
   * @private
   * @property {Object}
   */
  _assignedMap: {},

  /**
   * @constructor
   * @param {Object} options
   */
  constructor: function(options) {
    options || (options = {});

    if (options.el) {
      this.el = options.el;
    }

    if (options.regions) {
      _.extend(this.regions, options.regions);
    }

    if (this.el) {
      this.setElement(this.el);
    } else {
      this.setElement('<div />');
    }

    this.onCreate.apply(this, arguments);

    this.initialize.apply(this, arguments);
  },

  /**
   * @param {HTMLElement} element
   */
  setElement: function(element) {
    this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
    this.el = this.$el[0];
  },

  /**
   * Assign new View to element in layout.
   * And destroy old View automatically.
   *
   * @param {String} regionName
   * @param {View} newView
   */
  assign: function(regionName, newView) {
    var selector, oldView;

    selector = this.regions[regionName];
    oldView  = this.getRegionView(regionName);

    if (!selector) {
      throw new Error('Could not get a selector from the region ' + regionName);
    }

    // change
    this.onChange(regionName, newView, oldView);

    // old
    oldView && oldView.destroy();

    // new
    newView.setElement(this.$el.find(selector)[0]);

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
   * When the layout is destroyed, View which encloses also destroy all.
   */
  destroy: function() {
    this.onDestroy();

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
  onChange: function(regionName, newView, oldView) {},

  /**
   * @abstract
   */
  initialize: function() {},

  /**
   * @abstract
   */
  onCreate: function() {},

  /**
   * @abstract
   */
  onDestroy: function() {}

}).with(Backbone.Events);