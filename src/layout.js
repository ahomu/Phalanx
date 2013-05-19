'use strict';

/**
 * @abstract
 * @class  Phalanx.Layout
 * @mixins Phalanx.Trait.Observable
 * @mixins Phalanx.Trait.ElSettable
 * @mixins Phalanx.Trait.LifecycleCallbacks
 */
var Layout = defineClass({
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
   * @property {Object.<String, Phalanx.View>}
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

    // init own object
    this._assignedMap = {};
    this.onCreate.apply(this, arguments);

    if (this.el) {
      this.setElement(this.el);
    } else {
      this.setElement('<div />');
    }

    this.initialize.apply(this, arguments);
  },

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
    newView.lookupUi && newView.lookupUi(assignToEl);
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
   * When the layout is destroyed, View which encloses also destroy all.
   */
  destroy: function() {
    var i = 0, regions = Object.keys(this.regions),
        iz = this.regions.length, regionName;

    for (; i<iz; i++) {
      regionName = regions[i];
      this.withdraw(regionName);
    }

    this.onDestroy();

    this.el = this.$el = null;
  },

  /**
   * @abstract
   * @param {String} regionName
   * @param {View} newView
   * @param {View} oldView
   */
  onChange: function(regionName, newView, oldView) {}

});

Layout.with(Trait.Observable)
      .with(Trait.ElSettable)
      .with(Trait.LifecycleCallbacks);