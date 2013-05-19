'use strict';

/**
 * @class Phalanx.Trait.ElSettable
 */
Trait.ElSettable = {
  /**
   * @property {HTMLElement}
   */
  el: null,

  /**
   * @property {jQuery|Zepto}
   */
  $el: null,

  /**
   * @param {HTMLElement|String} element
   */
  setElement: function(element) {
    this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
    this.el = this.$el[0];
    if (this.el && this.el.parentNode) {
      this.onSetElement(this.el);
    }
  },

  /**
   * @abstract
   * @param {HTMLElement} element
   */
  onSetElement: function(element) {}
};
