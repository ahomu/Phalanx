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
    var selector, oldView, assignToEl, replaceToEl;

    selector = this.regions[regionName];
    oldView  = this.getRegionView(regionName);
    assignToEl = this.$el.find(selector)[0];

    if (!selector || !assignToEl) {
      throw new Error('Could not get element of `'+ selector +'` from the region ' + regionName);
    }

    // change
    this.onChange(regionName, newView, oldView);

    // old
    if (oldView) {
      if (oldView.persistent) {
        // create new element
        replaceToEl = document.createElement(assignToEl.tagName);
        this._copyAttrs(assignToEl, replaceToEl);

        // replace new element & keeping old element (oldView has refrence of old element)
        assignToEl.parentNode.replaceChild(replaceToEl, assignToEl);
        assignToEl = replaceToEl;
        oldView.pause();
      } else {
        oldView.destroy();
      }
    }

    // new
    if (newView.persistent && newView.paused) {
      this._copyAttrs(assignToEl, newView.el);

      $(assignToEl).replaceWith(newView.$el);
      newView.resume();
    } else {
      newView.setElement(assignToEl);
    }

    this._assignedMap[regionName] = newView;
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
    view.destroy();
    this._assignedMap[regionName] = null;
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
   * @param {Phalanx.View} newView
   * @param {Phalanx.View} oldView
   */
  onChange: function(regionName, newView, oldView) {}
});