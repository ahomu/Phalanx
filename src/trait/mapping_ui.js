'use strict';

/**
 * @class Phalanx.Trait.MappingUI
 */
Trait.MappingUI = {

  /**
   *     ui: {
   *       partOf: '.js_ui_selector'
   *     }
   *     // view.ui.partOf => element.js_ui_selector
   *
   * @property {Object}
   */
  ui: {},

  /**
   * From the selector defined by this.ui, caching to explore the elements.
   */
  lookupUi: function() {
    var name, selector, thisUi = {},
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    for (; i<iz; i++) {
      name = keys[i];
      selector = this.ui[name];
      thisUi[name] = this.$el.find(selector);
    }

    this.ui = thisUi;
  },

  /**
   * Release ui elements reference.
   */
  releaseUi: function() {
    var name,
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    for (; i<iz; i++) {
      name = keys[i];
      this.ui[name] = null;
      delete this.ui[name];
    }
  }

};