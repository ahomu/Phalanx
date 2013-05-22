'use strict';

var UI_FIND_PLACEHOLDER = '[data-ui="{name}"]';

/**
 * @class Phalanx.Trait.UiLookupable
 */
Trait.UiLookupable = {
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
   *
   * @params {HTMLElement|jQuery}
   */
  lookupUi: function(element) {
    var name, selector,
        $baseEl = element instanceof Backbone.$ ? element : Backbone.$(element),
        i = 0, keys = Object.keys(this.ui), iz = keys.length;

    this.ui  = {};
    this.$ui = {};

    for (; i<iz; i++) {
      name = keys[i];
      selector = UI_FIND_PLACEHOLDER.replace('{name}', name);
      this.$ui[name] = $baseEl.find(selector);
      this.ui[name]  = this.$ui[name].length ? this.$ui[name][0] : null;
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
      this.ui[name] = null;
    }
  }
};