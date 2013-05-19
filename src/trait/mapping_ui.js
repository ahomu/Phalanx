'use strict';

var UI_FIND_PLACEHOLDER = '[data-ui="{name}"]';

/**
 * @class Phalanx.Trait.MappingUI
 */
Trait.MappingUI = {

  /**
   *     ui: {
   *       hoge: null
   *     }
   *     // view.ui.hoge => [data-ui="hoge"]
   *
   * @property {Object.<String, Null>}
   */
  ui: {},

  /**
   * @property {Object.<String, jQuery>}
   */
  $ui: {},

  /**
   * From the selector defined by this.ui, caching to explore the elements.
   */
  lookupUi: function() {
    var name, selector,
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    this.ui = {};
    this.$ui = {};

    for (; i<iz; i++) {
      name = keys[i];
      selector = UI_FIND_PLACEHOLDER.replace('{name}', name);
      this.$ui[name] = this.$el.find(selector);
      this.ui[name]  = this.$ui[name][0];
    }
  },

  /**
   * Release ui elements reference.
   */
  releaseUi: function() {
    var name,
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    for (; i<iz; i++) {
      name = keys[i];
      this.$ui[name] = null;
      delete this.$ui[name];
      this.ui[name] = null;
      delete this.ui[name];
    }
  }
};